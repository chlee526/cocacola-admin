import { SiteListModel, SiteLanguageType } from '@/entity/site';

const getLanguage = (data: SiteListModel[]): SiteLanguageType[] | null => {
    const languages = [
        ...new Map(data.map(item => [item.lang, { code: item.lang, name: item.country }])).values(),
    ];
    // const result = [{ code: '', name: '전체' }];

    return [...languages];
};

export { getLanguage };
