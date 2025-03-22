interface UserModel {
    memberSeq: number;
    memberId: string;
    memberName: string;
}

type MethodType = 'GET' | 'PUT' | 'POST' | 'DELETE';
interface AuthModel {
    authMenuMappingSeq: number;
    authLevel?: number;
    methods: MethodType[];
    menuDto: {
        menuSeq: number;
        mseq: number;
        mname: string;
        name: string;
        pseq: number;
        depth: number;
        url: string;
        regDate: string;
        comment: string | null;
        child: AuthModel[];
    };
}

interface MenuModel {
    name: string;
    url: string;
    child?: MenuModel[];
}

interface AuthStoreModel {
    isLogin: boolean;
    user: UserModel | null;
    authMenu: MenuModel[] | null;
    authMethods: Record<string, MethodType[]>;
    authList: { code: string; name: string }[];
    updateLogin: (data: boolean) => void;
    updateUser: (data: UserModel | null) => void;
    updateAuthMenu: (data: MenuModel[] | null) => void;
    updateAuthMethods: (data: Record<string, MethodType[]>) => void;
    updateAuthList: (data: { code: string; name: string }[]) => void;
}

interface PostLoginRequestModel {
    id: string;
    pw: string;
}

interface PostLoginResponseModel {
    accessToken: string;
    memberId: string;
    memberName: string;
    memberSeq: number;
    refreshToken: string;
}

interface GetMyAuthResponseModel {
    auth: {
        seq: number;
        authName: string;
        state: string;
        regDate: string;
        mseq: number;
        mname: string;
        menuAuthList: AuthModel[];
    };
}

export type {
    UserModel,
    MenuModel,
    MethodType,
    AuthModel,
    AuthStoreModel,
    PostLoginRequestModel,
    PostLoginResponseModel,
    GetMyAuthResponseModel,
};
