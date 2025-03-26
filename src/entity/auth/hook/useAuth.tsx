import { useMemo } from 'react';

import { usePersonalizationStore } from '@chlee526/ui-kit-react';
import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query';

import { deleteAuthAsync, getAuthAsync, getAuthListAsync, postAuthAsync, putAuthAsync, putMultiAuthAsync } from '../api/adminApi';
import {
    BoardDataModel,
    GetAuthRequestModel,
    AuthBoardDataModel,
    GetAuthResponseDataModel,
    PostAuthRequestModel,
    DeleteAuthRequestModel,
    PutAuthRequestModel,
    PutAuthMultiRequestModel,
} from '../model/adminModel';
import { searchParameterStore } from '../store/searchParameter';

const getParseList = (list: GetAuthResponseDataModel[]) => {
    return list.map((item) => item.auth);
};

// store
const useSearhParameterStore = () => {
    const { searhParameter, setSearchParameter } = searchParameterStore();
    const rowLimit = usePersonalizationStore().getPersonalizationDataList('history')?.rowLimit || 100;

    const getSearchParameter: GetAuthRequestModel = useMemo(() => {
        return {
            ...searhParameter,
            rowLimit,
        };
    }, [searhParameter, rowLimit]);

    const updateSearchParameter = (param: GetAuthRequestModel) => {
        setSearchParameter(param);
    };

    return {
        getSearchParameter,
        updateSearchParameter,
    };
};

// 목록
const useGetAuthListQuery = (params: GetAuthRequestModel): UseQueryResult<BoardDataModel<AuthBoardDataModel[]>, Error> => {
    return useQuery({
        queryKey: ['AUTH_LIST', params],
        queryFn: async () => {
            try {
                const response = await getAuthListAsync(params);
                const { result } = response.data;
                const resultData = Array.isArray(result.data) ? result.data : [result.data];
                return {
                    total: result.total,
                    list: getParseList(resultData),
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
const useGetAuthMutation = () => {
    return useMutation({
        mutationFn: async (seq: number) => {
            try {
                const response = await getAuthAsync(24);
                const { result } = response.data;
                return Array.isArray(result.data.auth) ? result.data.auth[0] : result.data.auth;
            } catch (error) {
                console.error('쿼리 에러 발생', error);
                throw error;
            }
        },
    });
};

// 추가
const usePostAuthMutation = () => {
    // const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (param: PostAuthRequestModel) => postAuthAsync(param),
        // onSuccess: () => {
        //     queryClient.invalidateQueries({ queryKey: ['AUTH_LIST'] });
        // },
        // onError: err => {
        //     console.error('가입 에러', err);
        //     // showAlert('등록에 실패했습니다.');
        // },
    });
};

// 수정
const usePutAuthMutation = () => {
    return useMutation({
        mutationFn: async (param: PutAuthRequestModel) => putAuthAsync(param),
    });
};
const usePutMultiAuthMutation = () => {
    return useMutation({
        mutationFn: async (param: PutAuthMultiRequestModel[]) => putMultiAuthAsync(param),
    });
};

// 삭제
const useDeleteAuthMutation = () => {
    return useMutation({
        mutationFn: async (param: DeleteAuthRequestModel) => deleteAuthAsync(param),
    });
};

export {
    useSearhParameterStore,
    useGetAuthListQuery,
    useGetAuthMutation,
    usePostAuthMutation,
    usePutAuthMutation,
    usePutMultiAuthMutation,
    useDeleteAuthMutation,
};
