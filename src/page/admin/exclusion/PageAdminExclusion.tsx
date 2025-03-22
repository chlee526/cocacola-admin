import { useEffect, useMemo, useState } from 'react';

import { AsideLayout, BoardDefault } from '@chlee526/ui-kit-react';
import { useQueryClient } from '@tanstack/react-query';
import { useErrorBoundary } from 'react-error-boundary';

import {
    columns,
    DeleteExclusionRequestModel,
    ExclusionBoardDataModel,
    UpdateExclusionRequestModel,
    useAddExclusion,
    useDeleteExclusion,
    useGetExclusion,
    useGetparticularExclusion,
    useSearhParameterStore,
    useUpdateExclusion,
} from '@/entity/exclusion';
import { FeatureExclusionFunction, FeatureExclusionSaveEdit } from '@/feature/exclusion';
import { useAlert } from '@/shared/store';
import { Loader } from '@/shared/ui';

import Grid from '@mui/material/Grid2';

const MENU_NAME = 'exclusion';

const PageAdminExclusion = () => {
    const [selectedItem, setSelectedItem] = useState<ExclusionBoardDataModel>(null);
    const [checkedItems, setCheckedItems] = useState<readonly number[]>([]);
    const [isAsideOpen, setIsAsideOpen] = useState(true);
    const [loading, setLoading] = useState(false);

    const queryClient = useQueryClient();
    const addMutation = useAddExclusion();
    const deleteMutation = useDeleteExclusion();
    const updateMutation = useUpdateExclusion();
    const { showBoundary } = useErrorBoundary();
    const { showAlert } = useAlert();

    const particularKeywordQuery = useGetparticularExclusion(Number(selectedItem?.seq));
    const { getSearchParameter, updateSearchParameter } = useSearhParameterStore();
    const { data, isError, error, isFetching } = useGetExclusion(getSearchParameter);

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

    const handleAside = (state: boolean) => {
        setIsAsideOpen(state);
    };

    const updateEvent = async (param: UpdateExclusionRequestModel) => {
        try {
            await updateMutation.mutateAsync(param);

            setCheckedItems([]);
        } catch (ERROR) {
            console.error('update failed:', ERROR);
        }
    };

    const deleteEvent = async (param: DeleteExclusionRequestModel) => {
        try {
            await deleteMutation.mutateAsync(param);

            // aside 동기화
            if (param.seq.includes(selectedItem?.seq as number)) {
                setSelectedItem(null);
            }

            // 체크아이템 초기화
            setCheckedItems([]);
        } catch (ERROR) {
            console.error('Delete failed:', ERROR);
        }
    };

    useEffect(() => {
        setLoading(
            addMutation.isPending ||
                deleteMutation.isPending ||
                updateMutation.isPending ||
                isFetching ||
                particularKeywordQuery.isFetching,
        );
    }, [
        deleteMutation.isPending,
        updateMutation.isPending,
        isFetching,
        addMutation.isPending,
        particularKeywordQuery.isFetching,
    ]);

    useEffect(() => {
        if (isError) {
            showBoundary(error);
        }
    }, [error, isError, showBoundary]);

    useEffect(() => {
        if (data && selectedItem) {
            const updatedItem = data.list.find(item => item && item.seq === selectedItem.seq);
            if (updatedItem) {
                setSelectedItem(structuredClone(updatedItem));
            }
        }
    }, [data]);

    useEffect(() => {
        if (selectedItem) {
            particularKeywordQuery.refetch();
        }
    }, [selectedItem]);

    useEffect(() => {
        const { isError: particularError, data: particularKeywordData } = particularKeywordQuery;

        const originData = boardDatas.list.find(item => item?.seq === particularKeywordData?.seq);

        if (particularError) {
            showAlert('키워드 정보가 존재하지 않아 목록을 다시 불러옵니다.', 'info');
            setSelectedItem(null);
            queryClient.invalidateQueries({ queryKey: ['EXCLUSION_LIST'] });
            return;
        }

        if (particularKeywordData && originData) {
            const isChanged = Object.keys(originData).some(key => {
                const origin = JSON.stringify(originData[key as keyof ExclusionBoardDataModel] || '');
                const particular = JSON.stringify(particularKeywordData[key as keyof ExclusionBoardDataModel] || '');

                return origin !== particular;
            });

            if (isChanged) {
                showAlert('제외 키워드 정보가 업데이트 되어 목록을 다시 불러옵니다.', 'info');
                queryClient.invalidateQueries({ queryKey: ['EXCLUSION_LIST'] });
                setSelectedItem(structuredClone(particularKeywordData));
            }
        }
    }, [particularKeywordQuery.data]);

    return (
        <>
            <Loader open={loading} sx={{ zIndex: 7 }} />
            <Grid component="main" container sx={{ width: '100%' }}>
                <Grid className="ui-box" size={12}>
                    <FeatureExclusionFunction
                        checkedItems={[checkedItems, setCheckedItems]}
                        deleteEvent={deleteEvent}
                        updateEvent={updateEvent}
                        setSelectedItem={setSelectedItem}
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
                isOpen={isAsideOpen}
                handleOpen={handleAside}
                initState={{ 'min-width': '406px', 'max-width': 'unset' }}
            >
                <FeatureExclusionSaveEdit
                    updateEvent={updateEvent}
                    deleteEvent={deleteEvent}
                    selectedItem={[selectedItem, setSelectedItem]}
                />
            </AsideLayout>
        </>
    );
};

export { PageAdminExclusion };
