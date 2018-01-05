import { apiPrefix } from './config';
import * as qs from 'querystring';

const EnumRoleType = {
    ADMIN: 'admin',
    DEFAULT: 'guest',
    DEVELOPER: 'developer',
};

interface UserInfo {
    id: string;
    birthday: number;
    tel: string;
    description: string;
    icon: string;
    nickname: string;
    permissions: {
        role: string;
        visit?: string[];
    };
}

const userPermission = {
    DEFAULT: {
        visit: ['1', '2', '21', '7', '5', '51', '52', '53'],
        role: EnumRoleType.DEFAULT,
    },
    ADMIN: {
        role: EnumRoleType.ADMIN,
    },
    DEVELOPER: {
        role: EnumRoleType.DEVELOPER,
    },
};

const adminUsers = [
    {
        id: '0',
        username: 'admin',
        password: '1',
        permissions: userPermission.ADMIN,
    }, {
        id: '0',
        username: 'guest',
        password: '1',
        permissions: userPermission.DEFAULT,
    }, {
        id: '2',
        username: '13021185830',
        password: '123456',
        permissions: userPermission.DEVELOPER,
    },
];

export default {
    [`POST ${apiPrefix}/user/login`](req, res) {
        const { username, password } = req.body;
        const user = adminUsers.filter(item => item.username === username);
        if (user.length > 0 && user[0].password === password) {
            const expires_in = 60 * 60 * 6; // 6hour
            res.cookie('token', JSON.stringify({
                access_token: user[0].id,
                expires_in: expires_in,
                expires_time: Math.round(Date.now() / 1000) + expires_in // 6hour
            }), {
                    maxAge: 900000,
                    httpOnly: true
                });
            res.json({ status: 200, message: 'OK' });
        } else {
            res.status(200).send({ status: 1, message: '用户名与密码不匹配' });
        }
    },
    [`GET ${apiPrefix}/user/logout`](req, res) {
        res.clearCookie('token');
        res.json({ status: 200 });
    },
    [`GET ${apiPrefix}/user/account/userinfo`](req, res) {
        const cookie = req.headers.cookie as string || '';
        const cookies = qs.parse(cookie.replace(/\s/g, ''), ';');
        let success = false;
        const user: UserInfo = Object.create(null);
        if (!cookies.token) {
            res.status(401).end();
            return;
        }
        const token = JSON.parse(cookies.token);
        if (token) {
            success = token.expires_time * 1000 > Date.now();
        }
        if (success) {
            const userItem = adminUsers.filter(_ => _.id === token.access_token);
            if (userItem.length > 0) {
                user.permissions = userItem[0].permissions;
                user.nickname = userItem[0].username;
                user.id = userItem[0].id;
            }
        }
        res.json({
            status: 200,
            item: user
        });
    }
} as MockConfig;
