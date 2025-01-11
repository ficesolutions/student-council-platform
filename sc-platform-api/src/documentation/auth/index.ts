import { Register } from './register';
import { Login } from './login';
import { Refresh } from './refresh';
import { Logout } from './logout';
import { RepeatEmailVerification } from './repeatEmailVerification';
import { VerifyEmail } from './verifyEmail';

export const AuthDocumentation = {
  REGISTER: Register,
  LOGIN: Login,
  REFRESH: Refresh,
  LOGOUT: Logout,
  REPEAT_EMAIL_VERIFICATION: RepeatEmailVerification,
  VERIFY_EMAIL: VerifyEmail,
};
