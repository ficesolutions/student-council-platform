import {
  ApiBadRequestResponse, ApiBody,
  ApiBodyOptions, ApiCookieAuth, ApiForbiddenResponse,
  ApiOkResponse, ApiOperation, ApiParam,
  ApiParamOptions, ApiQuery,
  ApiQueryOptions,
  ApiResponseOptions, ApiTooManyRequestsResponse, ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  NestInterceptor,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { DefaultForbiddenResponse } from './default/forbidden.response';
import { DefaultUnauthorizedResponse } from './default/unauthorized.response';
import { UserWithRefreshToken } from '../security/jwt/refresh/refresh.strategy';

export class ApiDocumentationParams {
  isAuth?: boolean;
  ok?:  ApiResponseOptions | true;
  badRequest?: ApiResponseOptions;
  tooManyRequests?: ApiResponseOptions;
  forbidden?: ApiResponseOptions | true;
  unauthorized?: ApiResponseOptions | true;
  body?: ApiBodyOptions;
  params?: ApiParamOptions[];
  queries?: ApiQueryOptions[];
}

export class ApiEndpointParams {
  summary: string;
  guards?: any | any[];
  interceptors?: NestInterceptor | NestInterceptor[];
  documentation? : ApiDocumentationParams;
}

function addDocumentationDecorators (summary: string, description: string, documentation?: ApiDocumentationParams) {
  const responseTypes = [
    { key: 'ok', decorator: ApiOkResponse, default: {} },
    { key: 'badRequest', decorator: ApiBadRequestResponse },
    { key: 'forbidden', decorator: ApiForbiddenResponse, default: DefaultForbiddenResponse },
    { key: 'unauthorized', decorator: ApiUnauthorizedResponse, default: DefaultUnauthorizedResponse },
    { key: 'tooManyRequests', decorator: ApiTooManyRequestsResponse },
  ];

  const decorators = [
    ApiOperation({ summary, description }),
    ...(documentation?.isAuth ? [ApiCookieAuth()] : []),
  ];

  decorators.push(
    ...responseTypes
      .filter((responseType) => documentation?.[responseType.key])
      .map((responseType) => {
        const response = documentation[responseType.key];
        return responseType.decorator(response !== true ? response : responseType.default);
      })
  );

  if (documentation?.params) {
    decorators.push(
      ...documentation.params.map((query) => ApiParam(query))
    );
  }

  if (documentation?.queries) {
    decorators.push(
      ...documentation.queries.map((query) => ApiQuery(query))
    );
  }

  if (documentation?.body) {
    decorators.push(ApiBody(documentation.body));
  }

  return decorators;
}

export function ApiEndpoint ({
  summary,
  guards,
  interceptors,
  documentation,
}: ApiEndpointParams) {
  let description = '';

  if (guards) {
    description += `<b>Guards: ${typeof guards === 'function' ? guards.name : guards.map((g) => g.name).join(', ')}</b>`;
    guards = typeof guards === 'function' ? [guards] : guards;
  }

  const decorators = addDocumentationDecorators(summary, description, documentation);

  if (guards) {
    decorators.push(UseGuards(...guards));
  }

  if (interceptors) {
    interceptors = Array.isArray(interceptors) ? interceptors : [interceptors];
    decorators.push((UseInterceptors(...interceptors)));
  }

  return applyDecorators(...decorators);
}

export const GetUser = createParamDecorator(
  (field: keyof Omit<UserWithRefreshToken, 'password'> = null, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return field ? request.user?.[field] : request.user;
  });
