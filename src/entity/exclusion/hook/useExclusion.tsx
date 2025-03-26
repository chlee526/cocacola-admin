import { useMemo } from 'react';

import { usePersonalizationStore } from '@chlee526/ui-kit-react';
import { useMutation, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { useErrorBoundary } from 'react-error-boundary';

import { useAlert } from '@/shared/store';

import {
    addExclusionAsync,
    deleteExclusionAsync,
    getExclusionAsync,
    getExclusionSeqAsync,
    putExclusionAsync,
} from '../api/exclusionApi';
import {
    AddExclusionRequestModel,
    BoardDataModel,
    DeleteExclusionRequestModel,
    ExclusionBoardDataModel,
    GetExclusionRequestModel,
    UpdateExclusionRequestModel,
} from '../model/model';
import { searchParameterStore } from '../store/searchParameter';

const QUERY_KEY = 'EXCLUSION_LIST';

// Add=====================
const useAddExclusion = () => {
    const queryClient = useQueryClient();
    const { showBoundary } = useErrorBoundary();
    const { showAlert } = useAlert();

    return useMutation({
        mutationFn: async (param: AddExclusionRequestModel[]) => {
            const mutations = param.map((data) => addExclusionAsync(data));
            return Promise.allSettled(mutations);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
        },
        onError: (error) => {
            if (error.message) {
                showAlert('등록을 실패했습니다.');
            } else {
                showBoundary(error);
            }
        },
    });
};

// Get=====================
const useGetExclusion = (params: GetExclusionRequestModel): UseQueryResult<BoardDataModel<ExclusionBoardDataModel>, Error> =>
    useQuery({
        queryKey: [QUERY_KEY, params],
        queryFn: async () => {
            try {
                const response = await getExclusionAsync(params);

                const { result } = response.data;

                // response data parsing
                const list = result.data.map((data) => {
                    const item: ExclusionBoardDataModel = {
                        ...data,
                        op: {
                            value: data.op,
                            leftLength: data.leftLength,
                            rightLength: data.rightLength,
                        },
                    };

                    return item;
                });

                return {
                    total: result.total,
                    list: [...list],
                    page: params.page,
                };
            } catch (error) {
                console.error('쿼리 에러 발생', error);
                throw error;
            }
        },
    });

// Get Seq=====================
const useGetparticularExclusion = (seq: number): UseQueryResult<ExclusionBoardDataModel, Error> =>
    useQuery({
        queryKey: ['PARTICULAR_EXCLUSION'],
        queryFn: async () =>
            getExclusionSeqAsync(30)
                .then((response) => {
                    const { result } = response.data;

                    return {
                        ...result.data,
                        op: {
                            value: result.data.op,
                            leftLength: result.data.leftLength,
                            rightLength: result.data.rightLength,
                        },
                    };
                })
                .catch((error) => {
                    console.error('특정 제외 키워드 조회 에러', error);
                    throw error;
                }),
        enabled: seq >= 0,
    });

// Update=====================
const useUpdateExclusion = () => {
    const queryClient = useQueryClient();
    const { showBoundary } = useErrorBoundary();
    const { showAlert } = useAlert();

    return useMutation({
        mutationFn: async (params: UpdateExclusionRequestModel) => putExclusionAsync(params),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
        },
        onError: (error) => {
            if (error.message) {
                showAlert('수정을 실패했습니다.');
            } else {
                showBoundary(error);
            }
        },
    });
};

// Delete=====================
const useDeleteExclusion = () => {
    const queryClient = useQueryClient();
    const { showBoundary } = useErrorBoundary();
    const { showAlert } = useAlert();

    return useMutation({
        mutationFn: async (param: DeleteExclusionRequestModel) => deleteExclusionAsync(param),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
        },
        onError: (error) => {
            if (error.message) {
                showAlert('삭제를 실패했습니다.');
            } else {
                showBoundary(error);
            }
        },
    });
};

// store
const useSearhParameterStore = () => {
    const { searhParameter, setSearchParameter } = searchParameterStore();
    const rowLimit = usePersonalizationStore().getPersonalizationDataList('exclusion')?.rowLimit || 100;

    const getSearchParameter: GetExclusionRequestModel = useMemo(() => {
        return {
            ...searhParameter,
            rowLimit,
        };
    }, [searhParameter, rowLimit]);

    const updateSearchParameter = (param: GetExclusionRequestModel) => {
        setSearchParameter(param);
    };

    return {
        getSearchParameter,
        updateSearchParameter,
    };
};

export {
    useAddExclusion,
    useGetExclusion,
    useGetparticularExclusion,
    useUpdateExclusion,
    useDeleteExclusion,
    useSearhParameterStore,
};
