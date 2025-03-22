import { useEffect, useMemo, useState } from 'react';

import { AsideLayout, BoardColumnsModel, BoardDefault } from '@chlee526/ui-kit-react';
import { useQueryClient } from '@tanstack/react-query';

import { useAuthStore } from '@/entity/auth';
import {
    MembersModel,
    useGetMemberList,
    useGetParticularMember,
    useJoinMember,
    useMemberPageStore,
    useUpdateMember,
} from '@/entity/member';
import { FeatureMemberBoardFunction, FeatureMemberSaveEdit } from '@/feature/member';
import { useAlert } from '@/shared/store';
import { Loader } from '@/shared/ui';
import { dateToString } from '@/shared/util';

import Grid from '@mui/material/Grid2';

const PageAdminMember = () => {
    const [isAsideOpen, setIsAsideOpen] = useState(true);
    const [selectedItem, setSelectedItem] = useState<MembersModel>(null);
    const [checkedItems, setCheckedItems] = useState<readonly number[]>([]);
    const [loading, setLoading] = useState(false);

    const { getAuthList } = useAuthStore();
    const { getBoardData, getSearchParam, setBoardData, setSearchParam } = useMemberPageStore();

    const memberListQuery = useGetMemberList(getSearchParam);
    const particularMemberQuery = useGetParticularMember(Number(selectedItem?.seq));
    const joinMemberMutation = useJoinMember();
    const updateMemberMutation = useUpdateMember();
    const queryClient = useQueryClient();
    const { showAlert } = useAlert();

    // 컬럼 정보
    const columns: BoardColumnsModel[] = useMemo(() => {
        let result: BoardColumnsModel[] = [];
        if (getAuthList()?.length) {
            result = [
                {
                    id: 'authName',
                    label: '권한명',
                    width: '160px',
                    useSort: true,
                    useColumns: true,
                    filter: {
                        key: 'authFilter',
                        options: getAuthList(),
                    },
                    align: 'center',
                },
                {
                    id: 'id',
                    label: '아이디',
                    width: '180px',
                    useSort: true,
                    useColumns: true,
                    align: 'center',
                },
                {
                    id: 'name',
                    label: '이름',
                    width: '160px',
                    useSort: true,
                    useColumns: true,
                    align: 'center',
                },
                {
                    id: 'dept',
                    label: '부서',
                    width: '160px',
                    useSort: true,
                    useColumns: true,
                    align: 'center',
                },
                {
                    id: 'phone',
                    label: '연락처',
                    width: '160px',
                    useSort: false,
                    useColumns: true,
                    align: 'center',
                },
                {
                    id: 'email',
                    label: 'E-Mail',
                    width: '180px',
                    useSort: false,
                    useColumns: true,
                    align: 'center',
                },
                {
                    id: 'regDate',
                    label: '등록일',
                    width: '180px',
                    format: value => dateToString(String(value), 'YYYY-MM-DD hh:mm:ss'),
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
        }

        return result;
    }, [getAuthList]);

    const updateEvent = (param: { seq: number[]; state: string }) => {
        const newParm = {
            seq: param.seq[0],
            state: param.state,
        };
        updateMemberMutation.mutateAsync([newParm]).then(() => setSelectedItem(null));
    };

    /** 사용자 목록 Fetch */
    useEffect(() => {
        const memberList = memberListQuery.data;
        if (memberList) {
            setBoardData(memberList);
        }
    }, [memberListQuery.isFetching]);

    // 로더 감지
    useEffect(() => {
        setLoading(joinMemberMutation.isPending || updateMemberMutation.isPending || memberListQuery.isFetching);
    }, [joinMemberMutation.isPending, updateMemberMutation.isPending, memberListQuery.isFetching, getAuthList]);

    useEffect(() => {
        const { isError, data: particularMemberData } = particularMemberQuery; // 특정 사용자 조회 api

        const boardMemberData = getBoardData().list.find(item => item?.seq === particularMemberData?.seq); // 목록 데이터의 사용자 정보

        if (isError) {
            showAlert('사용자 정보가 존재하지 않아 목록을 다시 불러옵니다.', 'info');
            setSelectedItem(null);
            queryClient.invalidateQueries({ queryKey: ['MEMBER_LIST'] });
        }

        if (particularMemberData && boardMemberData) {
            const isChanged = Object.keys(boardMemberData).some(key => {
                const boardValue = String(boardMemberData[key as keyof MembersModel] || '');
                const particularValue = String(particularMemberData[key as keyof MembersModel] || '');
                return boardValue !== particularValue;
            });

            if (isChanged) {
                showAlert('사용자 정보가 업데이트 되어 목록을 다시 불러옵니다.', 'info');
                setSelectedItem(structuredClone(particularMemberData));
                queryClient.invalidateQueries({ queryKey: ['MEMBER_LIST'] });
            }

            // 캐싱 데이터 제거
            queryClient.removeQueries({ queryKey: ['PARTICULAR_MEMBER'] });
        }
    }, [particularMemberQuery.isFetching]);

    useEffect(() => {
        // 선택 아이템이 있을 경우 특정 사용자 조회 api 요청
        if (selectedItem) {
            particularMemberQuery.refetch();
        }
    }, [selectedItem]);

    return (
        <>
            <Loader open={loading} sx={{ zIndex: 7 }} />
            <Grid component="main" container sx={{ width: '100%' }}>
                <Grid className="ui-box" size={12}>
                    <FeatureMemberBoardFunction
                        checkedItems={checkedItems}
                        setCheckedItems={setCheckedItems}
                        setSelectedItem={setSelectedItem}
                        setIsAsideOpen={setIsAsideOpen}
                    />

                    <BoardDefault
                        columns={columns}
                        boardDatas={getBoardData()}
                        searchParameter={[getSearchParam, setSearchParam]}
                        selectedItem={[selectedItem, setSelectedItem]}
                        checkedItems={[checkedItems, setCheckedItems]}
                        updateEvent={updateEvent}
                        useDelete={false}
                        menuName="member"
                    />
                </Grid>
            </Grid>

            <AsideLayout
                menuName="member"
                initState={{ 'min-width': '510px', 'max-width': '800px' }}
                isOpen={isAsideOpen}
                handleOpen={setIsAsideOpen}
            >
                <FeatureMemberSaveEdit selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
            </AsideLayout>
        </>
    );
};

export { PageAdminMember };
