import { create } from 'zustand';

import { GetReceiverRequestModel } from '../model/model';

const initSearchParam = {
    searchType: 1,
    searchKeyword: '',
    sort: ['regDate,desc'],
    state: [],
    page: 1,
    rowLimit: 100,
};

interface SearchParameterStoreModel {
    searhParameter: GetReceiverRequestModel;
    setSearchParameter: (params: GetReceiverRequestModel) => void;
}

const searchParameterStore = create<SearchParameterStoreModel>((set, get) => ({
    searhParameter: { ...initSearchParam },
    setSearchParameter: (params: GetReceiverRequestModel) => {
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
