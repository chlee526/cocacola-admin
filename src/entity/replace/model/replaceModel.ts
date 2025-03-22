// GET==========================
type ReplaceBoardDataModel = {
    seq: number;
    findKeyword: string;
    replaceKeyword: string;
    state: string;
    regDate: string;
    mname: string;
    mseq: string;
} | null;

interface GetReplaceRequestModel {
    searchType: number;
    searchKeyword: string;
    sort: string[];
    state: string[];
    page: number;
    rowLimit: number;
}

interface GetReplaceResponseModel {
    result: {
        code: string;
        message: string;
        total: number;
        data: ReplaceBoardDataModel[];
    };
}

interface BoardDataModel {
    total: number;
    page: number;
    list: ReplaceBoardDataModel[];
}

// POST==========================
interface AddReplaceRequestModel {
    findKeyword: string;
    replaceKeyword: string;
    state: string;
}
interface AddReplaceResponseModel {
    result: {
        code: string;
        message: string;
        total: number;
        data: unknown;
    };
}

// PUT==========================
interface UpdateReplaceRequestModel {
    seq: number;
    findKeyword?: string;
    replaceKeyword?: string;
    state: string;
}
interface UpdateReplaceResponseModel {
    result: {
        code: string;
        message: string;
        total: number;
        data: unknown;
    };
}

// DELETE==========================
interface DeleteReplaceRequestModel {
    seq: number[];
}
interface DeleteReplaceResponseModel {
    result: {
        code: string;
        message: string;
        total: number;
        data: unknown;
    };
}

export type {
    ReplaceBoardDataModel,
    AddReplaceRequestModel,
    GetReplaceRequestModel,
    UpdateReplaceRequestModel,
    DeleteReplaceRequestModel,
    AddReplaceResponseModel,
    GetReplaceResponseModel,
    UpdateReplaceResponseModel,
    DeleteReplaceResponseModel,
    BoardDataModel,
};
