// to-do 타입 선언
export interface PathKeyInterface {
    [key: string]: string;
}

export interface RoutesInterface {
    name: string;
    url: string;
    child?: RoutesInterface[];
}

const PATH_KEY: PathKeyInterface = {
    ROOT: '/view/admin/replace',
    LOGIN: '/login',
    ERROR: '/error',
    /** 관리자 */
    ADMIN: '/view/admin',
    MEMBERS: '/view/admin/members',
    REPLACE: '/view/admin/replace',
    SITE: '/view/admin/site',
    AUTH: '/view/admin/auth',
    EXCLUSION: '/view/admin/exclusion',
    HISTORY: '/view/admin/history',
    RECEIVER: '/view/admin/receiver',
    KEYWORD: '/view/admin/keyword',
} as const;

export { PATH_KEY };
