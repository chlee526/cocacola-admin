// 공통 ==========================
interface ResponseModel {
    result: {
        code: string;
        message: string;
        total: number;
        data: unknown;
    };
}

// GET==========================
interface BoardDataModel<T> {
    total: number;
    page: number;
    list: T[];
}

type ExclusionBoardDataModel = {
    seq: number;
    exclusionKeyword: string;
    op: {
        value: number;
        leftLength: number;
        rightLength: number;
    };
    filterType: number;
    specialCheck: number;
    state: string;
    regDate: string;
    mseq: number;
    mname: string;
} | null;

interface GetExclusionRequestModel {
    searchType: number;
    searchKeyword: string;
    op: number[];
    filterType: number[];
    sort: string[];
    state: string[];
    page: number;
    rowLimit: number;
}

interface GetExclusionResponseModel {
    result: {
        code: string;
        message: string;
        total: number;
        data: {
            /**
             * 시퀀스 번호
             */
            seq: number;
            /**
             * 제외 키워드
             */
            exclusionKeyword: string;
            /**
             * 옵션 종류 설정
             * `(일반:1,구문:2,인접:3)`
             */
            op: number;
            /**
             * 인접 길이(왼쪽)
             */
            leftLength: number;
            /**
             * 인접 길이(오른쪽)
             */
            rightLength: number;
            /**
             * 필터링 구분
             * `(1:제목+내용, 2:제목,3내용, 4:게시판 명, 5:URL)`
             */
            filterType: number;
            /**
             * 특수문자 사용 여부
             */
            specialCheck: number;
            /**
             * 상태
             */
            state: string;
            /**
             * 최종 작성일시
             */
            regDate: string;
            /**
             * 최종 작성자 시퀀스
             */
            mseq: number;
            /**
             * 최종 작성자 이름
             */
            mname: string;
        }[];
    };
}

/**
 * seq조회
 */
interface GetExclusionSeqResponseModel {
    result: {
        code: string;
        message: string;
        total: number;
        data: {
            /**
             * 시퀀스 번호
             */
            seq: number;
            /**
             * 제외 키워드
             */
            exclusionKeyword: string;
            /**
             * 옵션 종류 설정
             * `(일반:1,구문:2,인접:3)`
             */
            op: number;
            /**
             * 인접 길이(왼쪽)
             */
            leftLength: number;
            /**
             * 인접 길이(오른쪽)
             */
            rightLength: number;
            /**
             * 필터링 구분
             * `(1:제목+내용, 2:제목,3내용, 4:게시판 명, 5:URL)`
             */
            filterType: number;
            /**
             * 특수문자 사용 여부
             */
            specialCheck: number;
            /**
             * 상태
             */
            state: string;
            /**
             * 최종 작성일시
             */
            regDate: string;
            /**
             * 최종 작성자 시퀀스
             */
            mseq: number;
            /**
             * 최종 작성자 이름
             */
            mname: string;
        };
    };
}

// PUT==========================
interface UpdateExclusionRequestModel {
    seq: number[];
    exclusionKeyword?: string;
    op?: number;
    leftLength?: number;
    rightLength?: number;
    filterType?: number;
    specialCheck?: number;
    state: string;
}

// POST==========================
interface AddExclusionRequestModel {
    exclusionKeyword: string;
    op: number;
    leftLength: number;
    rightLength: number;
    filterType: number;
    specialCheck: number;
    state: string;
}

// DELETE==========================
interface DeleteExclusionRequestModel {
    seq: number[];
}

export type {
    ResponseModel,
    BoardDataModel,
    ExclusionBoardDataModel,
    GetExclusionRequestModel,
    GetExclusionResponseModel,
    GetExclusionSeqResponseModel,
    UpdateExclusionRequestModel,
    AddExclusionRequestModel,
    DeleteExclusionRequestModel,
};
