import { createContext } from 'react';

import { ListContextModel } from '@/entity/site';

const SiteListContext = createContext<ListContextModel>({
    listType: 'ALL',
    data: undefined,
    selectedItems: new Set(),
    handleToggle: () => {},
    filters: null,
    setFilters: () => {},
});

export { SiteListContext };
