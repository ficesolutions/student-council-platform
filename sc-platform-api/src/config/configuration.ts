export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  frontUrl: process.env.FRONT_URL,
  security: {
    access: {
      secret: process.env.ACCESS_SECRET || '',
      ttl: process.env.ACCESS_TTL || '',
    },
    refresh: {
      secret: process.env.REFRESH_SECRET || '',
      ttl: process.env.REFRESH_TTL || '',
    },
    sessions: process.env.SESSIONS,
  },
});
