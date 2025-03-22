import { useEffect, useMemo, useState } from 'react';

import {
    InputBoxDefaultProps,
    SearchChipType,
    SelectBoxListType,
    useMenuAuthContext,
    WidgetSearchBar,
} from '@chlee526/ui-kit-react';

import {
    DeleteExclusionRequestModel,
    ExclusionBoardDataModel,
    GetExclusionRequestModel,
    UpdateExclusionRequestModel,
} from '@/entity/exclusion';
import { WhiteButton } from '@/feature/replace/ui/ReplaceFunction.style';
import { EXCLUSION_SEARCH_TYPE } from '@/shared/config/common';
import { CuiFunction } from '@/shared/ui';

import { List, ListItem, ListItemButton, ListItemText, Popover, Stack } from '@mui/material';

interface OwnProps {
    updateEvent: (param: UpdateExclusionRequestModel) => void;
    deleteEvent: (param: DeleteExclusionRequestModel) => void;
    checkedItems: [readonly number[], React.Dispatch<React.SetStateAction<readonly number[]>>];
    openAside: () => void;
    setSelectedItem: (selectedItem: ExclusionBoardDataModel | null) => void;
    searchParameter: [GetExclusionRequestModel, (param: GetExclusionRequestModel) => void];
}

const Function = ({
    updateEvent,
    deleteEvent,
    checkedItems: ownCheckecItems,
    openAside,
    setSelectedItem,
    searchParameter: ownSearchParam,
}: OwnProps) => {
    // 권한
    const methods = useMenuAuthContext();

    // 일괄설정 popover관련
    const [anchorElement, setanchorElement] = useState<HTMLButtonElement | null>(null);
    const isPopoverOpen = useMemo(() => Boolean(anchorElement), [anchorElement]);

    const togglePopover = (element: HTMLButtonElement | null) => {
        setanchorElement(element);
    };
    const [checkedItems] = ownCheckecItems;
    const [searchParameter, setSearchParameter] = ownSearchParam;

    const [keyword, setKeyword] = useState<SearchChipType>({
        searchType: 1,
        searchKeyword: '',
    });

    useEffect(() => {
        if (setSearchParameter)
            setSearchParameter({
                ...searchParameter,
                searchType: keyword.searchType as number,
                searchKeyword: keyword.searchKeyword,
            });

        setSelectedItem(null);
    }, [keyword]);

    /**
     * 키워드 등록 버튼 클릭
     */
    const handleAside = () => {
        openAside();
        setSelectedItem(null);
    };

    const handleMultiDelete = async () => {
        const params = { seq: checkedItems };

        deleteEvent(params as DeleteExclusionRequestModel);

        togglePopover(null);
    };

    const handleMultiState = async (state: 'Y' | 'N') => {
        const params = {
            seq: checkedItems,
            state,
        };

        updateEvent(params as UpdateExclusionRequestModel);

        togglePopover(null);
    };

    const popoverList = () => {
        const list = [];

        if (methods) {
            if (methods.includes('PUT')) {
                list.push(
                    {
                        primary: '사용',
                        click: () => handleMultiState('Y'),
                    },
                    {
                        primary: '정지',
                        click: () => handleMultiState('N'),
                    },
                );
            }

            if (methods.includes('DELETE')) {
                list.push({
                    primary: '삭제',
                    click: () => handleMultiDelete(),
                });
            }
        }

        return list;
    };

    return (
        <CuiFunction>
            <Stack direction="row" gap={1}>
                {methods && methods.includes('POST') && (
                    <WhiteButton variant="contained" size="small" onClick={handleAside}>
                        키워드 등록
                    </WhiteButton>
                )}
                {methods && (methods.includes('DELETE') || methods.includes('PUT')) && (
                    <WhiteButton
                        aria-describedby="settingButton"
                        variant="contained"
                        size="small"
                        disabled={checkedItems.length < 1}
                        onClick={event => togglePopover(event.currentTarget)}
                    >
                        일괄설정 ({checkedItems.length}개)
                    </WhiteButton>
                )}
            </Stack>
            <Stack direction="row">
                <Popover
                    id="settingButton"
                    anchorEl={anchorElement}
                    open={isPopoverOpen}
                    onClose={() => togglePopover(null)}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <List sx={{ p: 0, width: '67px' }}>
                        {popoverList().map(item => {
                            return (
                                <ListItem key={item.primary} disablePadding onClick={item.click}>
                                    <ListItemButton sx={{ p: 1 }}>
                                        <ListItemText
                                            primary={item.primary}
                                            sx={{ textAlign: 'center' }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </Popover>
                <WidgetSearchBar
                    value={[keyword, setKeyword]}
                    size="small"
                    typeList={EXCLUSION_SEARCH_TYPE as SelectBoxListType[]}
                    inputProps={
                        {
                            sx: {
                                width: '300px',
                            },
                        } as InputBoxDefaultProps
                    }
                />
            </Stack>
        </CuiFunction>
    );
};

export { Function };
