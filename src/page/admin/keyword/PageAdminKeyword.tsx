import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';

import { BoardColumnsModel, BoardDefault } from '@chlee526/ui-kit-react';

import { KeywordBoardColumns, useGetKeywordQuery, useKeywordStore, useSearchParameterStore } from '@/entity/keyword';
import { FeatureKeywordBoardFunction, FeatureKeywordSaveEdit, KeywordBoardModel, useEditHandler } from '@/feature/keyword';
import { AsideLayout, Loader } from '@/shared/ui';
import { WidgetKeywordCategoryList } from '@/widget/keyword/categoryList';

import { KeywordBoardStyle } from './PageAdminKeyword.style';

import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';

const MENU_NAME = 'keyword';

const PageAdminKeyword = () => {
    const [isAsideOpen, setIsAsideOpen] = useState(true);
    const [checkedItems, setCheckedItems] = useState<readonly number[]>([]);
    const [boardColumns, setBoardColumns] = useState<BoardColumnsModel[]>(KeywordBoardColumns);

    // 스토어
    const { getSearchParameter, updateSearchParameter } = useSearchParameterStore();
    const { getCategoryList, getSelectedKeyword, setSelectedKeyword, getSelectedCategory } = useKeywordStore();

    // 데이터 쿼리
    const { data, isLoading, isFetching } = useGetKeywordQuery(getSearchParameter);

    // 상태 값
    const categoryList = getCategoryList();
    const selectedKeyword = getSelectedKeyword();
    const selectedCategory = getSelectedCategory();

    const getBoardData = useMemo(() => {
        if (!data) {
            return { total: 0, page: 1, list: [] };
        }
        return data;
    }, [data]);

    const { handleKeywordState } = useEditHandler();

    /** 선택한 카테고리의 자식 뎁스 유무에 따라 카테고리 컬럼 disabled 처리 */
    useEffect(() => {
        const defaultColumns = [...boardColumns];
        if (!selectedCategory?.children || !selectedCategory?.children.length) {
            defaultColumns[0].disabled = true;
            setBoardColumns(defaultColumns);
        } else {
            defaultColumns[0].disabled = false;
            setBoardColumns(defaultColumns);
        }
    }, [selectedCategory, boardColumns]);

    return (
        <>
            <Loader open={isLoading || isFetching} />
            <Grid component="main" container sx={{ width: '100%' }}>
                <Grid className="ui-box" size={3} sx={{ position: 'relative' }}>
                    <WidgetKeywordCategoryList />
                </Grid>
                <Grid className="ui-box" size={9} css={KeywordBoardStyle}>
                    <FeatureKeywordBoardFunction
                        checkedItems={checkedItems}
                        setCheckedItems={setCheckedItems}
                        setIsAsideOpen={setIsAsideOpen}
                    />
                    {!categoryList?.length && (
                        <Box sx={{ pt: '20px', px: 1, color: '#999999' }}>
                            <p>* 카테고리 등록 후에 키워드 조회/등록이 가능합니다.</p>
                        </Box>
                    )}
                    <BoardDefault
                        selectedItem={[selectedKeyword, setSelectedKeyword as Dispatch<SetStateAction<KeywordBoardModel>>]}
                        checkedItems={[checkedItems, setCheckedItems]}
                        columns={boardColumns}
                        boardDatas={getBoardData}
                        updateEvent={handleKeywordState}
                        searchParameter={[getSearchParameter, updateSearchParameter]}
                        useDelete={false}
                        menuName={MENU_NAME}
                    />
                </Grid>
            </Grid>
            <AsideLayout
                menuName="keyword"
                isOpen={!categoryList?.length ? false : isAsideOpen}
                handleOpen={setIsAsideOpen}
                initState={{ 'min-width': '406px', 'max-width': '460px' }}
            >
                <FeatureKeywordSaveEdit />
            </AsideLayout>
        </>
    );
};

export { PageAdminKeyword };
