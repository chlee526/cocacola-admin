import { useMemo } from 'react';

import { usePersonalizationStore } from '@chlee526/ui-kit-react';

import { GetAuthRequestModel } from '@/entity/auth';

import { searchParameterStore } from '../store/searchParameter';

// store
const useSearhParameterStore = () => {
    const { searhParameter, setSearchParameter } = searchParameterStore();
    const rowLimit =
        usePersonalizationStore().getPersonalizationDataList('history')?.rowLimit || 100;

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

export { useSearhParameterStore };
