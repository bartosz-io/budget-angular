interface Config {
  [key: string]: string;
  auth: 'session' | 'token';
}

// Session auth needs to use the same origin anyway
export const config: Config = {
  apiUrl: '/api',
  adminUrl: '/admin',
  authUrl: '/auth',
  auth: 'session'
};
