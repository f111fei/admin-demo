import * as request from './request';
import { server } from 'constants/config';
import { UserInfo, Menu } from 'interfaces';

const { apiPrefix } = server;

export async function login(parms: { username: string, password: string }) {
    const result = await request.post(`${apiPrefix}/user/login`, {
        body: parms
    });
    if (result.status !== 200) {
        throw new Error(result.message);
    }
}

export async function logout() {
    const result = await request.get(`${apiPrefix}/user/logout`);
    if (result.status !== 200) {
        throw new Error(result.message);
    }
}

export async function query() {
    const result = await request.get(`${apiPrefix}/user/account/userinfo`);
    if (result.item) {
        return result.item as UserInfo;
    } else {
        throw new Error(`获取用户信息失败`);
    }
}

export async function queryMenus() {
    const result = await request.get(`${apiPrefix}/menus`);
    if (result.item) {
        return result.item as Menu[];
    } else {
        throw new Error(`获取目录失败`);
    }
}