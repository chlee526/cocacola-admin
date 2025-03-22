import { useEffect, useMemo, useState } from 'react';

import { SearchChipType, useMenuAuthContext, WidgetSearchBar } from '@chlee526/ui-kit-react';

import { useDeleteMember, useMemberPageStore, useUpdateMember } from '@/entity/member';
import { CuiFunction } from '@/shared/ui';

import { BoardFunctionPropsModel } from '../model/model';

import {
    Button,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Popover,
    Stack,
} from '@mui/material';

const BoardFunction = ({
    checkedItems,
    setCheckedItems,
    setSelectedItem,
    setIsAsideOpen,
}: BoardFunctionPropsModel) => {
    const methods = useMenuAuthContext();
    const { setSearchParam, getSearchParam } = useMemberPageStore();
    const [searchInput, setSearchInput] = useState<SearchChipType>({ searchKeyword: '' });

    // 일괄설정 popover관련
    const [anchorElement, setAnchorElement] = useState<HTMLButtonElement | null>(null);
    const isPopoverOpen = useMemo(() => Boolean(anchorElement), [anchorElement]);

    // 사용자 수정 mutation
    const updateMemberMutation = useUpdateMember();
    const deleteMemberMutation = useDeleteMember();

    /**
     * 사용자 등록 버튼 클릭
     */
    const handleAside = () => {
        setIsAsideOpen(true);
        setSelectedItem(null);
    };

    // 일괄 설정 핸들러
    const handleMultiState = async (state: 'Y' | 'N' | 'D') => {
        if (state === 'D') {
            const param = {
                seq: checkedItems as number[],
            };
            deleteMemberMutation.mutateAsync(param).then(() => {
                setAnchorElement(null);
                setCheckedItems([]);
                setSelectedItem(null);
            });
        } else {
            const params = checkedItems.map(item => {
                return {
                    seq: item,
                    state,
                };
            });
            updateMemberMutation.mutateAsync(params).then(() => {
                setAnchorElement(null);
                setCheckedItems([]);
                setSelectedItem(null);
            });
        }
    };

    const popoverList = () => {
        const list = [];
        if (methods) {
            if (methods.includes('DELETE')) {
                list.push(
                    {
                        primary: '사용',
                        click: () => handleMultiState('Y'),
                    },
                    {
                        primary: '정지',
                        click: () => handleMultiState('N'),
                    },
                    {
                        primary: '삭제',
                        click: () => handleMultiState('D'),
                    },
                );
            } else if (methods.includes('PUT')) {
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
        }
        return list;
    };

    // 감섹 파라미터 업데이트
    useEffect(() => {
        const param = getSearchParam;
        setSearchParam({ ...param, searchKeyword: searchInput?.searchKeyword });
    }, [searchInput]);

    return (
        <CuiFunction>
            <Stack direction="row" gap={1}>
                {methods?.includes('PUT') && (
                    <>
                        <Button
                            variant="contained"
                            size="small"
                            color="white"
                            onClick={handleAside}
                        >
                            사용자 등록
                        </Button>
                        <Button
                            variant="contained"
                            size="small"
                            color="white"
                            onClick={event => setAnchorElement(event.currentTarget)}
                            disabled={!checkedItems?.length}
                        >
                            일괄설정 ({checkedItems?.length}개)
                        </Button>
                    </>
                )}
            </Stack>

            <Popover
                id="settingButton"
                anchorEl={anchorElement}
                open={isPopoverOpen}
                onClose={() => setAnchorElement(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <List sx={{ p: 0, width: '67px' }}>
                    {popoverList().map(item => {
                        return (
                            <ListItem onClick={item.click} key={item.primary} disablePadding>
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
                id="memberList_searchBar"
                size="small"
                inputProps={{
                    value: [null, () => {}],
                    placeholder: '이름, 아이디, 연락처, 이메일 검색',
                    sx: { width: '400px' },
                }}
                value={[searchInput, setSearchInput]}
            />
        </CuiFunction>
    );
};

export { BoardFunction };
