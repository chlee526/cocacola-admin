import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query';

import { BoardDataModel } from '@/entity/auth';

import {
    deleteReceiverAsync,
    getReceiverAsync,
    getReceiverDuplicateAsync,
    getReceiverListAsync,
    postReceiverAsync,
    postReceiverExcelAsync,
    putReceiverAsync,
} from '../api/api';
import {
    DeleteReceiverRequestModel,
    GetReceiverDuplicateRequestModel,
    GetReceiverRequestModel,
    PostReceiverRequestModel,
    PutReceiverRequestModel,
    ReceiverBoardDataModel,
} from '../model/model';

// 목록
const useGetReceiverListQuery = (
    params: GetReceiverRequestModel,
): UseQueryResult<BoardDataModel<ReceiverBoardDataModel[]>, Error> => {
    return useQuery({
        queryKey: ['RECEIVER_LIST', params],
        queryFn: async () => {
            try {
                const response = await getReceiverListAsync(params);
                const { result } = response.data;
                return {
                    total: result.total,
                    list: result.data,
                    page: params.page,
                };
            } catch (error) {
                console.error('쿼리 에러 발생', error);
                throw error;
            }
        },
        refetchOnWindowFocus: false,
    });
};

// 특정 권한 조회
const useGetReceiverMutation = () => {
    return useMutation({
        mutationFn: async (params: number) => {
            try {
                const response = await getReceiverAsync(58);
                const { result } = response.data;
                return result.data as ReceiverBoardDataModel;
            } catch (error) {
                console.error('쿼리 에러 발생', error);
                throw error;
            }
        },
    });
};

// 추가
const usePostReceiverMutation = () => {
    return useMutation({
        mutationFn: async (param: PostReceiverRequestModel) => postReceiverAsync(param),
    });
};

// 수정
const usePutReceiverMutation = () => {
    return useMutation({
        mutationFn: async (param: PutReceiverRequestModel) => putReceiverAsync(param),
    });
};

// 삭제
const useDeleteReceiverMutation = () => {
    return useMutation({
        mutationFn: async (param: DeleteReceiverRequestModel) => deleteReceiverAsync(param),
    });
};

// 중복검사
const useGetReceiverDuplicateMutation = () => {
    return useMutation({
        mutationFn: async (param: GetReceiverDuplicateRequestModel) => getReceiverDuplicateAsync(param),
    });
};

// 엑셀등록
const usePostReceiverExcelMutation = () => {
    return useMutation({
        mutationFn: async (param: PostReceiverRequestModel[]) => postReceiverExcelAsync(param),
    });
};

export {
    useGetReceiverListQuery,
    useGetReceiverMutation,
    usePostReceiverMutation,
    usePutReceiverMutation,
    useDeleteReceiverMutation,
    useGetReceiverDuplicateMutation,
    usePostReceiverExcelMutation,
};
