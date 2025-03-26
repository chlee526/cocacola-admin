import { useQuery, UseQueryResult, useMutation, useQueryClient } from '@tanstack/react-query';

import { useAlert } from '@/shared/store';

import {
    deleteMembersAsync,
    duplicateIdAsync,
    getMembersAsync,
    getParticularMemberAsync,
    joinMembersAsync,
    updateMembersAsync,
} from '../api/api';
import {
    BoardDataModel,
    DeleteMembersRequestModel,
    DuplicateIdRequestModel,
    GetMembersRequestModel,
    JoinMembersRequestModel,
    MemberItem,
    UpdateMembersRequestModel,
} from '../model/model';

// 전체 사용자 조회
const useGetMemberList = (searchParam: GetMembersRequestModel): UseQueryResult<BoardDataModel, Error> => {
    return useQuery({
        queryKey: ['MEMBER_LIST', searchParam],

        queryFn: () =>
            getMembersAsync(searchParam).then((response) => {
                const { result } = response.data;
                const updatedList = result.data?.map((item) => {
                    return Object.fromEntries(
                        Object.entries(item as MemberItem).map(([key, value]) => [key, value === null ? '' : value]),
                    );
                });
                return {
                    total: result.total,
                    list: structuredClone(updatedList),
                    page: searchParam.page,
                };
            }),
    });
};

// 특정 사용자 조회
const useGetParticularMember = (memberSeq: number) => {
    // const param = { memberSeq };
    const param = { memberSeq: 116 }; // mockup 데이터
    const { showAlert } = useAlert();

    return useQuery({
        queryKey: ['PARTICULAR_MEMBER'],

        queryFn: async () =>
            getParticularMemberAsync(param)
                .then((res) => {
                    const { result } = res.data;
                    return result.data;
                })
                .catch((err) => {
                    console.error('특정 사용자 조회 에러', err);
                    if (err.response.data.code !== 'M002') {
                        showAlert('특정 사용자 조회에 실패했습니다.');
                        throw err;
                    }
                }),

        enabled: false,
    });
};

/** 사용자 등록 */
const useJoinMember = () => {
    const queryClient = useQueryClient();
    const { showAlert } = useAlert();

    return useMutation({
        mutationFn: async (param: JoinMembersRequestModel) => joinMembersAsync(param),
        onSuccess: (data) => {
            console.log('가입 성공', data);
            queryClient.invalidateQueries({ queryKey: ['MEMBER_LIST'] });
        },
        onError: (err) => {
            console.error('가입 에러', err);
            showAlert('가입에 실패했습니다.');
        },
    });
};

/** 사용자 수정 */
const useUpdateMember = () => {
    const queryClient = useQueryClient();
    const { showAlert } = useAlert();

    return useMutation({
        mutationFn: async (params: UpdateMembersRequestModel[]) => {
            const mutations = params.map((param) => updateMembersAsync(param));
            return Promise.allSettled(mutations);
        },
        onSuccess: (data) => {
            console.log('수정 성공', data);
            queryClient.invalidateQueries({ queryKey: ['MEMBER_LIST'] });
        },
        onError: (err) => {
            console.error('수정 에러', err);
            showAlert('수정 실패했습니다.');
        },
    });
};

/** 사용자 삭제 */
const useDeleteMember = () => {
    const queryClient = useQueryClient();
    const { showAlert } = useAlert();

    return useMutation({
        mutationFn: async (param: DeleteMembersRequestModel) => deleteMembersAsync(param),
        onSuccess: (data) => {
            console.log('삭제 성공', data);
            queryClient.invalidateQueries({ queryKey: ['MEMBER_LIST'] });
        },
        onError: (err) => {
            console.error('삭제 에러', err);
            showAlert('삭제 실패했습니다.');
        },
    });
};

/** 아이디 중복체크 */
const useDuplicateId = (param: DuplicateIdRequestModel) => {
    return useQuery({
        queryKey: ['DUPLICATE_ID'],
        queryFn: () => duplicateIdAsync(param),
        enabled: false,
        retry: false,
    });
};

export { useGetMemberList, useGetParticularMember, useJoinMember, useUpdateMember, useDeleteMember, useDuplicateId };
