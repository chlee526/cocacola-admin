import { useEffect, useMemo, useState } from 'react';

import { AsideLayout, BoardDefault } from '@chlee526/ui-kit-react';
import { useQueryClient } from '@tanstack/react-query';
import { useErrorBoundary } from 'react-error-boundary';

import {
    AuthBoardDataModel,
    BoardColumns,
    DeleteAuthRequestModel,
    PutAuthMultiRequestModel,
    useDeleteAuthMutation,
    useGetAuthListQuery,
    useSearhParameterStore,
} from '@/entity/auth';
import { usePutMultiAuthMutation } from '@/entity/auth/hook/useAuth';
import { useGetAllMenuQuery } from '@/entity/menu/hook/useMenu';
import { allMenuStore } from '@/entity/menu/store/menu';
import { FeatureAuthFunction, FeatureAuthSaveEdit } from '@/feature/auth';
import { useAlert } from '@/shared/store';

import Grid from '@mui/material/Grid2';

const MENU_NAME = 'history';

const PageAdminAuth = () => {
    /**
     * GET권한 외에 필요없음.
     * GET은 별도 체크 하지 않아, 권한체크 제외
     */
    // const methods = useMenuAuthContext();
    const queryClient = useQueryClient();
    const { showAlert } = useAlert();

    // 전체 메뉴 목록(컨텐츠 진입 전 로드)
    const { data: allMenuData, isLoading: isAllMenuLoading } = useGetAllMenuQuery();
    const { setAllMenuList } = allMenuStore();
    useEffect(() => {
        if (allMenuData) setAllMenuList(allMenuData);
    }, [allMenuData]);

    // 에러 바운더리
    const { showBoundary } = useErrorBoundary();

    // 개인화 및 검색 조건
    const { getSearchParameter, updateSearchParameter } = useSearhParameterStore();

    // 게시판 데이터
    const { data, isError, error } = useGetAuthListQuery(getSearchParameter);
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
    const [selectedItem, setSelectedItem] = useState<AuthBoardDataModel>(null);
    const [checkedItems, setCheckedItems] = useState<readonly number[]>([]);
    const [isAsideOpen, setIsAsideOpen] = useState(true);

    // 게시판 데이터 갱신에 의한 selectedItem, checkedItems 갱신
    useEffect(() => {
        if (boardDatas.list.length > 0) {
            // selectedItem 업데이트
            if (selectedItem) {
                const updatedItem = boardDatas.list.find(item => item && item.seq === selectedItem.seq);
                if (!updatedItem) {
                    setSelectedItem(null);
                }
            }

            // checkedItems 업데이트
            const updatedCheckedItems = checkedItems.filter(seq => boardDatas.list.some(item => item && item.seq === seq));
            if (updatedCheckedItems.length !== checkedItems.length) {
                setCheckedItems(updatedCheckedItems);
            }
        } else {
            // 리스트가 비어있으면 모두 초기화
            setSelectedItem(null);
            setCheckedItems([]);
        }
    }, [boardDatas]);

    // 게시판 - 수정 요청(멀티 - state만 수정)
    const { mutateAsync: putMultiMutateAsync } = usePutMultiAuthMutation();
    const updateEvent = async (value: PutAuthMultiRequestModel[]) => {
        const transItems = value.map(item => {
            return {
                authSeq: item.authSeq || item?.seq,
                authState: item.authState || item?.state,
            };
        });
        try {
            await putMultiMutateAsync(transItems);
            queryClient.invalidateQueries({ queryKey: ['AUTH_LIST'] });
            showAlert(
                `${transItems.length > 1 ? `${transItems.length}개 ` : ''}권한의 사용여부가 "${transItems[0].authState === 'Y' ? '사용' : '정지'}"(으)로 변경 되었습니다.`,
                'success',
            );
        } catch (e) {
            showAlert('권한 삭제에 실패 했습니다.', 'error');
        }
    };

    // 게시판 - 삭제 요청
    const { mutateAsync: deleteMutateAsync } = useDeleteAuthMutation();
    const deleteEvent = async (value: DeleteAuthRequestModel) => {
        try {
            await deleteMutateAsync(value);
            queryClient.invalidateQueries({ queryKey: ['AUTH_LIST'] });
            showAlert(`${value.seq.length > 1 ? `${value.seq.length}개의 ` : ''}권한이 삭제 되었습니다.`, 'success');
        } catch (e) {
            showAlert('권한 삭제에 실패 했습니다.', 'error');
        }
    };

    // 에러 처리
    useEffect(() => {
        if (isError) {
            showBoundary(error);
        }
    }, [error, isError, showBoundary]);

    if (isAllMenuLoading) return <div>로딩중</div>;

    return (
        <>
            <Grid component="main" container sx={{ width: '100%' }}>
                <Grid className="ui-box" size={24}>
                    <Grid>
                        <FeatureAuthFunction
                            setSelectedItem={setSelectedItem}
                            checkedItems={[checkedItems, setCheckedItems]}
                            openAside={() => setIsAsideOpen(true)}
                            updateEvent={updateEvent}
                            deleteEvent={deleteEvent}
                            searchParameter={[getSearchParameter, updateSearchParameter]}
                        />
                        <BoardDefault
                            selectedItem={[selectedItem, setSelectedItem]}
                            checkedItems={[checkedItems, setCheckedItems]}
                            columns={BoardColumns}
                            boardDatas={boardDatas}
                            updateEvent={updateEvent}
                            deleteEvent={deleteEvent}
                            searchParameter={[getSearchParameter, updateSearchParameter]}
                            menuName={MENU_NAME}
                            // useDelete={false}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <AsideLayout
                menuName="member"
                initState={{ 'min-width': '510px', 'max-width': '800px' }}
                isOpen={isAsideOpen}
                handleOpen={setIsAsideOpen}
            >
                <FeatureAuthSaveEdit selectedItem={[selectedItem, setSelectedItem]} updateEvent={updateEvent} />
            </AsideLayout>
        </>
    );
};

export { PageAdminAuth };
