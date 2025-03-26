import { useState, useMemo, useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useSearhParameterStore } from '@/entity/auth';
import {
    useGetReceiverListQuery,
    ReceiverBoardDataModel,
    PutReceiverRequestModel,
    usePutReceiverMutation,
    DeleteReceiverRequestModel,
} from '@/entity/receiver';
import { useDeleteReceiverMutation } from '@/entity/receiver/hook/useReceiver';
import { useAlert } from '@/shared/store';

const useController = () => {
    const { showAlert } = useAlert();
    const [isAsideOpen, setIsAsideOpen] = useState(true);
    const { getSearchParameter, updateSearchParameter } = useSearhParameterStore();

    // 선택 아이템
    const [selectedItem, setSelectedItem] = useState<ReceiverBoardDataModel>(null);

    // 체크 아이템
    const [checkedItems, setCheckedItems] = useState<readonly number[]>([]);

    // 게시판 데이터
    const { data: boardDataResult, error: boardDataError } = useGetReceiverListQuery(getSearchParameter);
    const boardData = useMemo(() => {
        if (boardDataResult) {
            return boardDataResult;
        }
        return {
            total: 0,
            page: 1,
            list: [],
        };
    }, [boardDataResult]);

    // 게시판 데이터 갱신에 의한 selectedItem, checkedItems 갱신
    useEffect(() => {
        if (boardData.list.length > 0) {
            // selectedItem 업데이트
            if (selectedItem) {
                const updatedItem = boardData.list.find((item) => item && item.seq === selectedItem.seq);
                if (!updatedItem) {
                    setSelectedItem(null);
                }
            }

            // checkedItems 업데이트
            const updatedCheckedItems = checkedItems.filter((seq) => boardData.list.some((item) => item && item.seq === seq));
            if (updatedCheckedItems.length !== checkedItems.length) {
                setCheckedItems(updatedCheckedItems);
            }
        } else {
            // 리스트가 비어있으면 모두 초기화
            setSelectedItem(null);
            setCheckedItems([]);
        }
    }, [boardData]);

    // 게시판 - 수정 요청
    const queryClient = useQueryClient();
    const { mutateAsync: putMutateAsync } = usePutReceiverMutation();
    const updateEvent = async (value: PutReceiverRequestModel[]) => {
        const transItems = value.reduce<{ seq: number[]; state: string }>(
            (acc, item) => {
                acc.seq.push(item.seq as number);
                acc.state = item.state;
                return acc;
            },
            { seq: [], state: '' },
        );
        try {
            await putMutateAsync(transItems);
            queryClient.invalidateQueries({ queryKey: ['RECEIVER_LIST'] });
            showAlert(
                `${transItems.seq.length > 1 ? `${transItems.seq.length}개 ` : ''}정보 수신자의 사용여부가 "${transItems.state === 'Y' ? '사용' : '정지'}"(으)로 변경 되었습니다.`,
                'success',
            );
        } catch (e) {
            showAlert('사용여부 변경에 실패 했습니다.', 'error');
        }
    };

    // 게시판 - 삭제 요청
    const { mutateAsync: deleteMutateAsync } = useDeleteReceiverMutation();
    const deleteEvent = async (value: DeleteReceiverRequestModel) => {
        try {
            await deleteMutateAsync(value);
            queryClient.invalidateQueries({ queryKey: ['RECEIVER_LIST'] });
            showAlert(`${value.seq.length > 1 ? `${value.seq.length}개의 ` : ''}정보 수신자가 삭제 되었습니다.`, 'success');
        } catch (e) {
            showAlert('정보 수신자 삭제에 실패 했습니다.', 'error');
        }
    };

    return {
        // ASIDE 상태
        isAsideOpen,
        setIsAsideOpen,

        // 검색 조건
        getSearchParameter,
        updateSearchParameter,

        // 게시판 데이터
        boardData,
        boardDataError,

        // 선택 아이템
        selectedItem,
        setSelectedItem,

        // 체크 아이템
        checkedItems,
        setCheckedItems,

        // 업데이트/삭제 이벤트 핸들러
        updateEvent,
        deleteEvent,
    };
};

export { useController };
