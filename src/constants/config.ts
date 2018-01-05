interface ServerConfig {
    apiPrefix: string;
}

export const server: ServerConfig = Object.create(null);
server.apiPrefix = '/api/v1';

export const openPages = ['/login'];

export const name = '通晓管理后台';
export const logo = '/logo.png';