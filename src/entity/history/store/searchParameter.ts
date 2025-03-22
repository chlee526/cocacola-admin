import { create } from 'zustand';

import { GetHistoryRequestModel } from '../model/historyModel';

const initSearchParam = {
    searchType: 1,
    searchKeyword: '',
    sort: ['regDate,desc'],
    state: [],
    page: 1,
    rowLimit: 100,
};

interface SearchParameterStoreModel {
    searhParameter: GetHistoryRequestModel;
    setSearchParameter: (params: GetHistoryRequestModel) => void;
}

const searchParameterStore = create<SearchParameterStoreModel>((set, get) => ({
    searhParameter: { ...initSearchParam },
    setSearchParameter: (params: GetHistoryRequestModel) => {
        const previous = get().searhParameter;
        set(() => ({
            searhParameter: {
                ...previous,
                ...params,
            },
        }));
    },
}));

export { searchParameterStore };
