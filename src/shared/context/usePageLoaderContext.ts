import { createContext, useContext } from 'react';

import { PageLoaderModel } from '../ui';

const pageLoaderInitState: PageLoaderModel = {
    showPageLoader: () => {},
    isOpen: false,
    loaderStack: [],
    resetPageLoader: () => {},
};

const PageLoaderStateContext = createContext<PageLoaderModel>(pageLoaderInitState);

const usePageLoaderContext = () => {
    const state = useContext(PageLoaderStateContext);

    return state;
};

export { PageLoaderStateContext, usePageLoaderContext, pageLoaderInitState };
