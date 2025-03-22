import { createContext } from 'react';

import { SitePageContextModel } from '../model/siteModel';

const SitePageContext = createContext<SitePageContextModel>({
    allSiteSelected: new Set(),
    setAllSiteSelected: () => {},
    selSiteSelected: new Set(),
    setSelSiteSelected: () => {},
    languageList: null,
    setlanguageList: () => {},
    selGrp: null,
    setSelGrp: () => {},
    allGrpList: null,
    setAllGrpList: () => {},
});

export { SitePageContext };
