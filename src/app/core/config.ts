interface Config {
  [key: string]: string;
  auth: 'session' | 'token';
}

export const config: Config = {
  apiUrl: 'http://localhost:8080/api',
  authUrl: 'http://localhost:8080/auth',
  auth: 'session'
};
