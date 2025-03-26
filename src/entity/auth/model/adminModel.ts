// GET==========================
interface BoardDataModel<T> {
    total: number;
    page: number;
    list: T;
}

type AuthBoardDataModel = {
    seq: number;
    authName: string;
    state: string;
    regDate: string;
    mSeq: number;
    mName: string;
    menuAuthList?: [];
} | null;

interface GetAuthRequestModel {
    searchKeyword: string;
    sort: string[];
    state: string[];
    page: number;
    rowLimit: number;
}

interface GetAuthResponseDataModel {
    auth: AuthBoardDataModel[];
}
interface GetAuthResponseModel {
    result: {
        code: string;
        message: string;
        total: number;
        data: GetAuthResponseDataModel;
    };
}

interface PostAuthRequestMseqModel {
    menuSeq: number;
    level: number;
}
interface PostAuthRequestModel {
    authSeq?: number;
    authName: string;
    authMenuList: PostAuthRequestMseqModel[];
}

interface PutAuthRequestModel {
    authSeq: number;
    authName: string;
    authState: 'Y' | 'N';
    authMenuList: PostAuthRequestMseqModel[];
}
interface PutAuthMultiRequestModel {
    authSeq?: number;
    authState?: 'Y' | 'N';
}
interface DeleteAuthRequestModel {
    seq: number[];
}

export type {
    BoardDataModel,
    AuthBoardDataModel,
    GetAuthRequestModel,
    GetAuthResponseDataModel,
    GetAuthResponseModel,
    PostAuthRequestMseqModel,
    PostAuthRequestModel,
    DeleteAuthRequestModel,
    PutAuthRequestModel,
    PutAuthMultiRequestModel,
};
