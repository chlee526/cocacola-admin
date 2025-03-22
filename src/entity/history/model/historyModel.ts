// GET==========================
interface BoardDataModel<T> {
    total: number;
    page: number;
    list: T;
}

type HistoryBoardDataModel = {
    seq: number;
    sysName: string;
    authName: string;
    ip: string;
    comment?: string | null;
    regDate: string;
    mid: string;
    mname: string;
} | null;

interface GetHistoryRequestModel {
    searchType: number;
    searchKeyword: string;
    sort: string[];
    state: string[];
    page: number;
    rowLimit: number;
}

interface GetHistoryResponseModel {
    result: {
        code: string;
        message: string;
        total: number;
        data: HistoryBoardDataModel[];
    };
}

export type {
    BoardDataModel,
    HistoryBoardDataModel,
    GetHistoryRequestModel,
    GetHistoryResponseModel,
};
