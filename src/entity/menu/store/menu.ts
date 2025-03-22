import { create } from 'zustand';

import { MenuType } from '../model/model';

interface AllMenuStoreModel {
    allMenuList: MenuType[];
    setAllMenuList: (params: MenuType[]) => void;
}

const allMenuStore = create<AllMenuStoreModel>(set => ({
    allMenuList: [],
    setAllMenuList: params => {
        set({ allMenuList: params });
    },
}));

export { allMenuStore };
