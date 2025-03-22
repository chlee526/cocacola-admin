import { useEffect, useMemo } from 'react';

import { BoardDefault } from '@chlee526/ui-kit-react';
import { useErrorBoundary } from 'react-error-boundary';

import { BoardColumns } from '@/entity/history';
import { useGetHistoryListQuery, useSearhParameterStore } from '@/entity/history/hook/useHistory';
import { FeatureHistoryFunction } from '@/feature/history';

import Grid from '@mui/material/Grid2';

const MENU_NAME = 'history';

const PageAdminHistory = () => {
    /**
     * GET권한 외에 필요없음.
     * GET은 별도 체크 하지 않아, 권한체크 제외
     */
    // const methods = useMenuAuthContext();

    // 에러 바운더리
    const { showBoundary } = useErrorBoundary();

    // 개인화 및 검색 조건
    const { getSearchParameter, updateSearchParameter } = useSearhParameterStore();

    // 게시판 데이터
    const { data, isError, error } = useGetHistoryListQuery(getSearchParameter);
    const boardDatas = useMemo(() => {
        if (data) {
            return data;
        }
        return {
            total: 0,
            page: 1,
            list: [],
        };
    }, [data]);

    useEffect(() => {
        if (isError) {
            showBoundary(error);
        }
    }, [error, isError, showBoundary]);

    return (
        <Grid component="main" container sx={{ width: '100%' }}>
            <Grid className="ui-box" size={24}>
                <Grid>
                    <FeatureHistoryFunction searchParameter={[getSearchParameter, updateSearchParameter]} />
                    <BoardDefault
                        columns={BoardColumns}
                        boardDatas={boardDatas}
                        searchParameter={[getSearchParameter, updateSearchParameter]}
                        menuName={MENU_NAME}
                        useDelete={false}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export { PageAdminHistory };
