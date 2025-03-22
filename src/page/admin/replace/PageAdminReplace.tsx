import { useEffect, useMemo, useState } from 'react';

import { BoardDefault, BoardColumnsModel } from '@chlee526/ui-kit-react';
import { useErrorBoundary } from 'react-error-boundary';

import {
    AddReplaceRequestModel,
    DeleteReplaceRequestModel,
    ReplaceBoardDataModel,
    UpdateReplaceRequestModel,
} from '@/entity/replace';
import {
    useAddReplace,
    useDeleteReplace,
    useGetReplaceListQuery,
    useSearhParameterStore,
    useUpdateReplace,
} from '@/entity/replace/hook/useReplace';
import { FeatureReplaceFunction, FeatureReplaceSaveEdit } from '@/feature/replace';
import { AsideLayout, Loader } from '@/shared/ui';
import { dateToString } from '@/shared/util';

import Grid from '@mui/material/Grid2';

const MENU_NAME = 'replace';

const PageAdminReplace = () => {
    const { showBoundary } = useErrorBoundary();

    const addMutation = useAddReplace();
    const deleteMutation = useDeleteReplace();
    const updateMutation = useUpdateReplace();

    const [selectedItem, setSelectedItem] = useState<ReplaceBoardDataModel>(null);
    const [checkedItems, setCheckedItems] = useState<readonly number[]>([]);
    const [isAsideOpen, setIsAsideOpen] = useState(true);
    const [loading, setLoading] = useState(false);

    const { getSearchParameter, updateSearchParameter } = useSearhParameterStore();
    const { data, isError, error, isFetching } = useGetReplaceListQuery(getSearchParameter);

    const boardDatas = useMemo(() => {
        if (data) {
            return data;
        }
        return {
            total: 0,
            list: [],
            page: 1,
        };
    }, [data]);

    // 컬럼 정보
    const columns: readonly BoardColumnsModel[] = [
        {
            id: 'findKeyword',
            label: '찾을 키워드',
            width: '280px',
            useSort: true,
            useColumns: true,
            align: 'center',
        },
        {
            id: 'replaceKeyword',
            label: '치환 키워드',
            width: '280px',
            useSort: true,
            useColumns: true,
            align: 'center',
        },
        {
            id: 'regDate',
            label: '최종 작성일시',
            width: '280px',
            useSort: true,
            format: value => dateToString(String(value), 'YYYY-MM-DD hh:mm:ss'),
            useColumns: true,
            align: 'center',
        },
        {
            id: 'mname',
            label: '최종 작성자',
            width: '180px',
            useSort: true,
            useColumns: true,

            align: 'center',
        },
        {
            id: 'state',
            label: '사용',
            width: '50px',
            useSort: false,
            useColumns: true,
            filter: {
                key: 'state',
                options: [
                    { code: 'Y', name: '사용' },
                    { code: 'N', name: '미사용' },
                ],
            },
            align: 'center',
        },
    ];

    const handleAside = (state: boolean) => {
        setIsAsideOpen(state);
    };

    const addEvent = async (param: AddReplaceRequestModel[]) => {
        try {
            await addMutation.mutateAsync(param);

            // 성공 시 true 반환
            return true;
        } catch (ERROR) {
            // 실패 시 false 반환
            console.error('add failed:', ERROR);
            return false;
        }
    };

    const updateEvent = async (param: UpdateReplaceRequestModel[]) => {
        try {
            await updateMutation.mutateAsync(param);

            // aside 동기화
            const index = param.findIndex(({ seq }) => seq === selectedItem?.seq);
            if (selectedItem && index > -1) {
                setSelectedItem({
                    ...selectedItem,
                    ...param[index],
                });
            }

            // 성공 시 true 반환
            return true;
        } catch (ERROR) {
            // 실패 시 false 반환
            console.error('update failed:', ERROR);
            return false;
        }
    };

    const deleteEvent = async (param: DeleteReplaceRequestModel) => {
        try {
            await deleteMutation.mutateAsync(param);

            // aside 동기화
            if (param.seq.includes(selectedItem?.seq as number)) {
                setSelectedItem(null);
            }

            // 성공 시 true 반환
            return true;
        } catch (ERROR) {
            // 실패 시 false 반환
            console.error('Delete failed:', ERROR);
            return false;
        }
    };

    useEffect(() => {
        setLoading(addMutation.isPending || deleteMutation.isPending || updateMutation.isPending || isFetching);
    }, [deleteMutation.isPending, updateMutation.isPending, isFetching, addMutation.isPending]);

    useEffect(() => {
        if (isError) {
            showBoundary(error);
        }
    }, [error, isError, showBoundary]);

    return (
        <>
            <Loader open={loading} sx={{ zIndex: 7 }} />
            <Grid component="main" container sx={{ width: '100%' }}>
                <Grid className="ui-box" size={12}>
                    <FeatureReplaceFunction
                        updateEvent={updateEvent}
                        deleteEvent={deleteEvent}
                        setSelectedItem={setSelectedItem}
                        checkedItems={[checkedItems, setCheckedItems]}
                        openAside={() => handleAside(true)}
                        searchParameter={[getSearchParameter, updateSearchParameter]}
                    />
                    <BoardDefault
                        selectedItem={[selectedItem, setSelectedItem]}
                        checkedItems={[checkedItems, setCheckedItems]}
                        columns={columns}
                        boardDatas={boardDatas}
                        updateEvent={updateEvent}
                        deleteEvent={deleteEvent}
                        searchParameter={[getSearchParameter, updateSearchParameter]}
                        menuName={MENU_NAME}
                    />
                </Grid>
            </Grid>
            <AsideLayout
                menuName={MENU_NAME}
                initState={{ 'min-width': '510px', 'max-width': '800px' }}
                isOpen={isAsideOpen}
                handleOpen={handleAside}
            >
                <FeatureReplaceSaveEdit
                    addEvent={addEvent}
                    updateEvent={updateEvent}
                    deleteEvent={deleteEvent}
                    selectedItem={[selectedItem, setSelectedItem]}
                />
            </AsideLayout>
        </>
    );
};

export { PageAdminReplace };
