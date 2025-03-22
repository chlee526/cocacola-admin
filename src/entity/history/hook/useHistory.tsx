import { useMemo } from 'react';

import { usePersonalizationStore } from '@chlee526/ui-kit-react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { getHistoryAsync } from '../api/historyApi';
import {
    BoardDataModel,
    GetHistoryRequestModel,
    HistoryBoardDataModel,
} from '../model/historyModel';
import { searchParameterStore } from '../store/searchParameter';

// read
const useGetHistoryListQuery = (
    params: GetHistoryRequestModel,
): UseQueryResult<BoardDataModel<HistoryBoardDataModel[]>, Error> =>
    useQuery({
        queryKey: ['REPLACE_LIST', params],
        queryFn: async () => {
            try {
                const response = await getHistoryAsync(params);

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

// store
const useSearhParameterStore = () => {
    const { searhParameter, setSearchParameter } = searchParameterStore();
    const rowLimit =
        usePersonalizationStore().getPersonalizationDataList('history')?.rowLimit || 100;

    const getSearchParameter: GetHistoryRequestModel = useMemo(() => {
        return {
            ...searhParameter,
            rowLimit,
        };
    }, [searhParameter, rowLimit]);

    const updateSearchParameter = (param: GetHistoryRequestModel) => {
        setSearchParameter(param);
    };

    return {
        getSearchParameter,
        updateSearchParameter,
    };
};

export { useGetHistoryListQuery, useSearhParameterStore };
