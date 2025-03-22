import { useEffect, useState } from 'react';

import {
    SearchChipType,
    WidgetSearchBar,
    InputBoxDefaultProps,
    SelectBoxListType,
} from '@chlee526/ui-kit-react';

import { GetHistoryRequestModel } from '@/entity/history/model/historyModel';
import { COMMON_HISTORY_FILTER } from '@/shared/config/common';
import { CuiFunction } from '@/shared/ui';

import { Stack } from '@mui/material';

interface OwnProps {
    searchParameter: [GetHistoryRequestModel, (param: GetHistoryRequestModel) => void];
    // updateEvent: ({ searchType, searchKeyword }: SearchChipType) => void;
}

const Function = ({ searchParameter: ownSearchParam }: OwnProps) => {
    const [searchParameter, setSearchParameter] = ownSearchParam;
    console.log('function  >>  ', searchParameter);
    const [keyword, setKeyword] = useState<SearchChipType>({
        searchType: 1,
        searchKeyword: '',
    });
    useEffect(() => {
        // if (updateEvent) updateEvent(keyword as SearchChipType);
        if (setSearchParameter)
            setSearchParameter({
                ...searchParameter,
                searchType: keyword.searchType as number,
                searchKeyword: keyword.searchKeyword,
            });
    }, [keyword]);

    return (
        <CuiFunction>
            <Stack direction="row" sx={{ marginLeft: 'auto' }}>
                <WidgetSearchBar
                    value={[keyword, setKeyword]}
                    size="small"
                    typeList={COMMON_HISTORY_FILTER as SelectBoxListType[]}
                    inputProps={
                        {
                            sx: {
                                width: '500px',
                            },
                        } as InputBoxDefaultProps
                    }
                />
            </Stack>
        </CuiFunction>
    );
};

export { Function };
