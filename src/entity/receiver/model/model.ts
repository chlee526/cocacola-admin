// GET==========================
interface BoardDataModel<T> {
    total: number;
    page: number;
    list: T;
}

// 게시판 데이터
type ReceiverBoardDataModel = {
    seq: number;
    mseq: number;
    dept: string;
    email: string;
    mname: string;
    position: string;
    regDate: string;
    rname: string;
    state: 'Y' | 'N';
} | null;

// GET - 목록 조회 API
interface GetReceiverRequestModel {
    searchKeyword: string;
    sort: string[];
    state: string[];
    page: number;
    rowLimit: number;
}
interface GetReceiverSeqRequestModel {
    seq: number;
}
interface GetReceiverResponseModel {
    result: {
        code: string;
        message: string;
        total: number;
        data: ReceiverBoardDataModel | ReceiverBoardDataModel[];
    };
}

// POST - 등록 API
interface PostReceiverRequestModel {
    position?: string;
    dept: string;
    email: string;
    emailChk?: boolean;
    emailDuplicate?: boolean;
    state: 'Y' | 'N';
    rname: string;
}

// PUT - 수정 API
interface PutReceiverRequestModel {
    seq: number | number[];
    position?: string;
    dept?: string;
    email?: string;
    emailChk?: boolean;
    emailDuplicate?: boolean;
    state: string;
    rname?: string;
}

// DELETE - 삭제 API
interface DeleteReceiverRequestModel {
    seq: number[];
}

// DELETE - 삭제 API
interface GetReceiverDuplicateRequestModel {
    email: string;
}

export type {
    BoardDataModel,
    ReceiverBoardDataModel,
    GetReceiverSeqRequestModel,
    GetReceiverRequestModel,
    GetReceiverResponseModel,
    PostReceiverRequestModel,
    DeleteReceiverRequestModel,
    PutReceiverRequestModel,
    GetReceiverDuplicateRequestModel,
};
