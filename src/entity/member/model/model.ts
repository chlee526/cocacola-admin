// 사용자 모델
type MembersModel = {
    seq: number;
    authSeq: number;
    authName: string;
    id: string;
    pw: string;
    name: string;
    phone: string | null;
    email: string | null;
    position: string | null;
    dept: string | null;
    state: string;
    regDate: string;
    comment: string | null;
} | null;

interface MemberItem {
    [key: string]: string | number | null;
}

// 전체 사용자 조회
interface GetMembersRequestModel {
    searchKeyword: string;
    authFilter: number[] | string;
    page: number;
    rowLimit: number;
    sort: string[];
    state: string[];
}
interface GetMembersResponseModel {
    result: {
        code: string;
        message: string;
        total: number;
        data: MembersModel[];
    };
}

// 특정 사용자 조회
interface GetParticularMemberRequestModel {
    memberSeq: number;
}
interface GetParticularMemberResponseModel {
    result: {
        code: string;
        message: string;
        total: number;
        data: MembersModel;
    };
}

// 사용자 가입
type JoinMembersRequestModel = Omit<
    MembersModel,
    'seq' | 'authName' | 'state' | 'regDate' | 'comment'
>;

// 사용자 수정
type UpdateMembersRequestModel = Omit<MembersModel, 'id' | 'authName' | 'regDate'>;

// 사용자 삭제
interface DeleteMembersRequestModel {
    seq: number[];
}

// 중복 아이디 체크
interface DuplicateIdRequestModel {
    memberId: string;
}

// 게시판 데이터 모델
interface BoardDataModel {
    total: number;
    page: number;
    list: MembersModel[];
}

// 사용자 관리 페이지 스토어
interface MemberPageStoreModel {
    boardData: BoardDataModel;
    searchParam: GetMembersRequestModel;
    updateBoardData: (data: BoardDataModel) => void;
    updateSearchParam: (data: GetMembersRequestModel) => void;
}

export type {
    MembersModel,
    MemberItem,
    GetMembersRequestModel,
    GetMembersResponseModel,
    GetParticularMemberRequestModel,
    GetParticularMemberResponseModel,
    UpdateMembersRequestModel,
    JoinMembersRequestModel,
    DeleteMembersRequestModel,
    DuplicateIdRequestModel,
    BoardDataModel,
    MemberPageStoreModel,
};
