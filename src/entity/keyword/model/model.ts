// 카테고리 데이터
interface CategoryModel {
    seq: number;
    keywordType: number;
    keyword: string;
    state: string;
    pseq: number;
    children: CategoryModel[];
}

// 키워드 데이터
interface KeywordModel {
    seq: number;
    keywordType: number;
    keyword: string;
    optionName: string;
    opSeq: number;
    state: string;
    op: number;
    leftLength: number;
    rightLength: number;
    filterType: number;
    specialCheck: number;
    sgSeqs: number[];
    regDate: string;
    mname: string;
    pseq: number;
    children: Omit<KeywordModel, 'sgSeqs'>[];
}

// 제외 키워드 등록 요청용
interface ExKeywordModel {
    keywordType: number;
    keyword: string;
    opSeq: number;
    state: string;
}

// 옵션 데이터
interface OptionModel {
    seq: number;
    keywordType: number; // 1: 키워드, 2: 제외키워드
    name: string;
    op: number;
    opSeq: number;
    leftLength: number;
    rightLength: number;
    filterType: number;
    specialCheck: number;
    sgSeqs?: number[];
    state: string;
    regDate: string;
    mseq: number;
    mname: string;
}

interface BoardDataModel<T> {
    total: number;
    page: number;
    list: T[];
}

// type KeywordBoardModel = {
//     seq: number;
//     keywordType: number;
//     keyword: string;
//     optionName: string;
//     opSeq: number;
//     state: string;
//     op: number;
//     leftLength: number;
//     rightLength: number;
//     filterType: number;
//     specialCheck: number;
//     sgSeqs?: number[];
//     regDate: string;
//     mname: string;
//     pseq: number;
//     category: string;
//     children: KeywordModel[];
// } | null;

// type FormValues = {
//     keywordType: number;
//     optionName: string;
//     op: {
//         value: number;
//         leftLength: number;
//         rightLength: number;
//     };
//     filterType: number;
//     specialCheck: number;
//     sgSeqs?: number[];
// };

// GET - 카테고리 조회 API
interface GetCategoryResponseModel {
    result: {
        code: string;
        message: string;
        total: number;
        data: CategoryModel[];
    };
}

// GET - 키워드&제외키워드 조회 API
interface GetKeywordRequestModel {
    seq: number[] | string;
    searchType: number;
    searchKeyword: string;
    op: number[] | string;
    filterType: number[] | string;
    sgSeqs: number[] | string;
    state: string[];
    page: number;
    rowLimit: number;
    sort: string[];
}

interface GetKeywordResponseModel {
    result: {
        code: string;
        message: string;
        total: number;
        data: KeywordModel[];
    };
}

// POST - 키워드&제외키워드 등록 API
interface PostKeywordRequestModel {
    keywordType: number;
    keyword: string[];
    opSeq: number;
    state: string;
    exKeyowrdAddList: ExKeywordModel[];
    pSeq: number;
}

// POST - 제외키워드 등록 API
interface PostExKeywordRequestModel extends ExKeywordModel {
    pseq: number;
}

interface PostExKeywordResponseModel {
    result: {
        code: string;
        message: string;
        total: number;
        data: OptionModel[];
    };
}

// PUT - 키워드&제외키워드 수정 API
interface PutKeywordRequestModel {
    seq: number[];
    state: string;
}

// DELETE - 키워드&제외키워드 삭제 API
interface DeleteKeywordRequestModel {
    seq: number[];
}

// GET - 키워드&제외 키워드 옵션 조회 API
interface GetOptionListResponseModel {
    result: {
        code: string;
        message: string;
        total: number;
        data: OptionModel[];
    };
}

// POST - 키워드&제외 키워드 옵션 등록 API
interface PostOptionRequestModel {
    keywordType: number;
    optionName: string;
    op: number;
    leftLength: number;
    rightLength: number;
    filterType: number;
    specialCheck: number;
    sgSeqs?: number[];
    state: string;
}

// POST - 카테고리 등록 API
interface PostCategoryRequestModel {
    keywordType: number;
    keyword: string;
    state: string;
    pseq: number;
}

// PUT - 카테고리 수정 API
interface PutCategoryRequestModel {
    keyword?: string;
    state?: string;
    seq: number[];
}

// DELETE - 카테고리 삭제 API
interface DeleteCategoryRequestModel {
    seq: number[];
}

export type {
    CategoryModel,
    KeywordModel,
    BoardDataModel,
    // KeywordBoardModel,
    OptionModel,
    GetCategoryResponseModel,
    GetKeywordRequestModel,
    GetKeywordResponseModel,
    GetOptionListResponseModel,
    PostCategoryRequestModel,
    PostKeywordRequestModel,
    PostExKeywordRequestModel,
    PostExKeywordResponseModel,
    PutCategoryRequestModel,
    PutKeywordRequestModel,
    PostOptionRequestModel,
    DeleteCategoryRequestModel,
    DeleteKeywordRequestModel,
    // FormValues,
};
