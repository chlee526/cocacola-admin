import { useEffect, useMemo, useState } from 'react';

import { SearchChipType, WidgetSearchBar, InputBoxDefaultProps, useMenuAuthContext } from '@chlee526/ui-kit-react';

import { CuiFunction } from '@/shared/ui';

import { BoardFunctionProps } from '../model/type';

import { Button, List, ListItem, ListItemButton, ListItemText, Popover, Stack } from '@mui/material';

// interface OwnProps {
//     searchParameter: [GetAuthRequestModel, (param: GetAuthRequestModel) => void];
//     // updateEvent: ({ searchType, searchKeyword }: SearchChipType) => void;
// }

const Function = ({
    updateEvent,
    deleteEvent,
    checkedItems: ownPropCheckedItems,
    openAside,
    searchParameter: ownSearchParam,
}: BoardFunctionProps) => {
    // 권한
    const methods = useMenuAuthContext();

    const [checkedItems] = ownPropCheckedItems;
    const [searchParameter, setSearchParameter] = ownSearchParam;
    const [keyword, setKeyword] = useState<SearchChipType>({
        searchKeyword: '',
    });
    useEffect(() => {
        if (setSearchParameter)
            setSearchParameter({
                ...searchParameter,
                searchKeyword: keyword.searchKeyword,
            });
    }, [keyword]);

    // Store 권한 목록 리패칭
    // const aaa = useQueryClient();
    // const handleTmp = () => {
    //     aaa.invalidateQueries({ queryKey: ['AUTH_LIST'] });
    //     console.log('click');
    // };

    //
    const [popOverElement, setPopOverElement] = useState<HTMLButtonElement | null>(null);
    const isPopOverOpen = useMemo(() => !!popOverElement, [popOverElement]);
    const handleMultiState = async (state: 'Y' | 'N') => {
        const result = checkedItems.map(item => {
            return {
                authSeq: item,
                authState: state,
            };
        });
        if (updateEvent) updateEvent(result);
    };
    const handleMultiDelete = async () => {
        if (deleteEvent) deleteEvent({ seq: [...checkedItems] });
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
                    <Button variant="contained" size="small" color="white" onClick={openAside}>
                        권한 등록
                    </Button>
                )}
                {methods && (methods.includes('DELETE') || methods.includes('PUT')) && (
                    <>
                        <Button
                            variant="contained"
                            size="small"
                            color="white"
                            disabled={checkedItems.length === 0}
                            onClick={e => setPopOverElement(e.currentTarget)}
                        >
                            일괄설정 ({checkedItems.length || 0}개)
                        </Button>
                        <Popover
                            id="settingButton"
                            anchorEl={popOverElement}
                            open={isPopOverOpen}
                            onClose={() => setPopOverElement(null)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            <List sx={{ p: 0, width: '67px' }} dense>
                                {popoverList().map(item => {
                                    return (
                                        <ListItem
                                            key={item.primary}
                                            disablePadding
                                            onClick={() => {
                                                item.click();
                                                setPopOverElement(null);
                                            }}
                                        >
                                            <ListItemButton sx={{ p: 1 }}>
                                                <ListItemText primary={item.primary} sx={{ textAlign: 'center' }} />
                                            </ListItemButton>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </Popover>
                    </>
                )}
            </Stack>
            <Stack direction="row" sx={{ marginLeft: 'auto' }}>
                <WidgetSearchBar
                    value={[keyword, setKeyword]}
                    size="small"
                    inputProps={
                        {
                            sx: {
                                width: '400px',
                            },
                        } as InputBoxDefaultProps
                    }
                />
            </Stack>
        </CuiFunction>
    );
};

export { Function };
