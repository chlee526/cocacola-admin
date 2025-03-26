import { AsideLayout, BoardDefault } from '@chlee526/ui-kit-react';

import { ConfigBoardColumns } from '@/entity/receiver';
import { FeatureReceiverFunction, FeatureReceiverSaveEdit } from '@/feature/receiver';
import { useController } from '@/feature/receiver/hook/useController';
import { Loader } from '@/shared/ui';

import Grid from '@mui/material/Grid2';

const MENU_NAME = 'receiver';

const PageAdminReceiver = () => {
    const {
        // ASIDE 상태
        isAsideOpen,
        setIsAsideOpen,

        // 검색 조건
        getSearchParameter,
        updateSearchParameter,

        // 게시판 데이터
        boardData,
        // boardDataError,

        // 선택 아이템
        selectedItem,
        setSelectedItem,

        // 체크 아이템
        checkedItems,
        setCheckedItems,

        // 업데이트/삭제 이벤트 핸들러
        updateEvent,
        deleteEvent,
    } = useController();

    return (
        <>
            <Loader open={false} sx={{ zIndex: 7 }} />
            <Grid component="main" container sx={{ width: '100%' }}>
                <Grid className="ui-box" size={12}>
                    <FeatureReceiverFunction
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
                        columns={ConfigBoardColumns}
                        boardDatas={boardData}
                        updateEvent={(val: { seq: number[]; state: string }) => {
                            updateEvent([{ seq: val.seq[0], state: val.state }]);
                        }}
                        deleteEvent={deleteEvent}
                        searchParameter={[getSearchParameter, updateSearchParameter]}
                        menuName={MENU_NAME}
                        useDelete={false}
                    />
                </Grid>
            </Grid>

            <AsideLayout
                menuName="member"
                initState={{ 'min-width': '510px', 'max-width': '800px' }}
                isOpen={isAsideOpen}
                handleOpen={setIsAsideOpen}
            >
                <FeatureReceiverSaveEdit selectedItem={[selectedItem, setSelectedItem]} updateEvent={updateEvent} />
            </AsideLayout>
        </>
    );
};

export { PageAdminReceiver };
