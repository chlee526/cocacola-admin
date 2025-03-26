import { useMemo } from 'react';

import { usePersonalizationStore } from '@chlee526/ui-kit-react';
import { useMutation, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';

import { useAlert } from '@/shared/store';

import { addReplaceAsync, deleteReplaceAsync, getReplacAsync, updateReplaceAsync } from '../api/replaceApi';
import {
    AddReplaceRequestModel,
    BoardDataModel,
    DeleteReplaceRequestModel,
    GetReplaceRequestModel,
    UpdateReplaceRequestModel,
} from '../model/replaceModel';
import { searchParameterStore } from '../store/searchParameter';

// add mutation
const useAddReplace = () => {
    const queryClient = useQueryClient();
    const { showAlert } = useAlert();

    return useMutation({
        mutationFn: async (param: AddReplaceRequestModel[]) => {
            const mutations = param.map((data) => addReplaceAsync(data));
            return Promise.allSettled(mutations);
        },
        onSuccess: (data) => {
            console.log('등록 성공', data);

            // 가장 마지막 쿼리만 호출
            queryClient.invalidateQueries({ queryKey: ['REPLACE_LIST'] });
        },
        onError: (err) => {
            console.error('등록 에러', err);
            showAlert('등록을 실패했습니다.');
        },
    });
};

// read
const useGetReplaceListQuery = (params: GetReplaceRequestModel): UseQueryResult<BoardDataModel, Error> =>
    useQuery({
        queryKey: ['REPLACE_LIST', params],
        queryFn: async () => {
            try {
                const response = await getReplacAsync(params);

                const { result } = response.data;

                return {
                    total: result.total,
                    list: [...result.data],
                    page: params.page,
                };
            } catch (error) {
                console.error('쿼리 에러 발생', error);
                throw error;
            }
        },
    });

// update
const useUpdateReplace = () => {
    const queryClient = useQueryClient();
    const { showAlert } = useAlert();

    return useMutation({
        mutationFn: async (params: UpdateReplaceRequestModel[]) => {
            const mutations = params.map((data) => updateReplaceAsync(data));
            return Promise.allSettled(mutations);
        },
        onSuccess: (data) => {
            console.log('수정 성공', data);

            // 가장 마지막 쿼리만 호출
            queryClient.invalidateQueries({ queryKey: ['REPLACE_LIST'] });
        },
        onError: (err) => {
            console.error('수정 에러', err);
            showAlert('수정을 실패했습니다.', 'error');
        },
    });
};

// delete
const useDeleteReplace = () => {
    const queryClient = useQueryClient();
    const { showAlert } = useAlert();

    return useMutation({
        mutationFn: async (param: DeleteReplaceRequestModel) => deleteReplaceAsync(param),
        onSuccess: (data) => {
            console.log('삭제 성공', data);

            // 가장 마지막 쿼리만 호출
            queryClient.invalidateQueries({ queryKey: ['REPLACE_LIST'] });
        },
        onError: (err) => {
            console.error('삭제에러', err);
            showAlert('삭제를 실패했습니다.');
        },
    });
};

// store
const useSearhParameterStore = () => {
    const { searhParameter, setSearchParameter } = searchParameterStore();
    const rowLimit = usePersonalizationStore().getPersonalizationDataList('replace')?.rowLimit || 100;

    const getSearchParameter: GetReplaceRequestModel = useMemo(() => {
        return {
            ...searhParameter,
            rowLimit,
        };
    }, [searhParameter, rowLimit]);

    const updateSearchParameter = (param: GetReplaceRequestModel) => {
        setSearchParameter(param);
    };

    return {
        getSearchParameter,
        updateSearchParameter,
    };
};

export { useGetReplaceListQuery, useAddReplace, useUpdateReplace, useDeleteReplace, useSearhParameterStore };
