import { useCallback, useEffect, useMemo, useState } from 'react';

import { SearchChipType, useMenuAuthContext, WidgetSearchBar } from '@chlee526/ui-kit-react';

import {
    DeleteKeywordRequestModel,
    GetKeywordRequestModel,
    useKeywordStore,
    usePutKeywordMutation,
    useSearchParameterStore,
} from '@/entity/keyword';
import { useDeleteKeywordMutation } from '@/entity/keyword/hook/useKeyword';
import { CuiFunction } from '@/shared/ui';

import { BoardFunctionProps } from '../model/model';

import { Button, List, ListItem, ListItemButton, ListItemText, Popover, Stack } from '@mui/material';

/** 검색 타입 목록 */
const SEARCH_TYPE_LIST = [
    { name: '키워드', seq: 1 },
    { name: '제외 키워드', seq: 2 },
    { name: '최종 수정자', seq: 3 },
];

const BoardFunction = ({ checkedItems, setCheckedItems, setIsAsideOpen }: BoardFunctionProps) => {
    const methods = useMenuAuthContext();
    const [anchorElement, setAnchorElement] = useState<HTMLButtonElement | null>(null);
    const [searchInput, setSearchInput] = useState<SearchChipType>({ searchKeyword: '', searchType: '' });

    const { getCategoryList, setSelectedKeyword } = useKeywordStore();
    const { getSearchParameter, updateSearchParameter } = useSearchParameterStore();

    const updateKeyword = usePutKeywordMutation();
    const deleteKeyword = useDeleteKeywordMutation();

    const categoryList = getCategoryList();
    const isPopoverOpen = useMemo(() => Boolean(anchorElement), [anchorElement]);

    /**
     * 작업 성공 후 상태 초기화
     */
    const successProcess = useCallback(() => {
        setAnchorElement(null);
        setCheckedItems([]);
    }, []);

    /**
     * 키워드 등록 사이드바 열기
     */
    const handleAside = () => {
        setIsAsideOpen(true);
        setSelectedKeyword(null);
    };

    /**
     * 선택된 키워드 일괄 삭제
     */
    const handleMultiDelete = async () => {
        const params: DeleteKeywordRequestModel = { seq: checkedItems as number[] };

        await deleteKeyword.mutateAsync(params);
        successProcess();
        setSelectedKeyword(null);
    };

    /**
     * 선택된 키워드 상태 일괄 변경
     * @param {string} state - 변경할 상태 ('Y' | 'N')
     */
    const handleMultiState = async (state: 'Y' | 'N') => {
        const param = {
            state,
            seq: [...checkedItems],
        };

        await updateKeyword.mutateAsync(param);
        successProcess();
    };

    /**
     * 권한에 따른 팝오버 메뉴 목록 생성
     */
    const popoverList = () => {
        if (!methods) return [];

        const baseList = [
            { primary: '사용', click: () => handleMultiState('Y') },
            { primary: '정지', click: () => handleMultiState('N') },
        ];

        if (methods.includes('DELETE')) {
            return [...baseList, { primary: '삭제', click: handleMultiDelete }];
        }

        return methods.includes('PUT') ? baseList : [];
    };

    // 검색 파라미터 업데이트
    useEffect(() => {
        const updatedParm = {
            ...getSearchParameter,
            searchType: searchInput.searchType,
            searchKeyword: searchInput.searchKeyword,
        };
        updateSearchParameter(updatedParm as GetKeywordRequestModel);
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
                            disabled={!categoryList?.length}
                        >
                            키워드 등록
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
                                    <ListItemText primary={item.primary} sx={{ textAlign: 'center' }} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Popover>

            <WidgetSearchBar
                id="keyword_searchBar"
                size="small"
                inputProps={{
                    value: [null, () => {}],
                    placeholder: '키워드, 제외 키워드 검색',
                    sx: { width: '300px' },
                }}
                value={[searchInput, setSearchInput]}
                typeList={SEARCH_TYPE_LIST}
            />
        </CuiFunction>
    );
};

export { BoardFunction };
