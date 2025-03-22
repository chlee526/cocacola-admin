import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';

import {
    KeywordModel,
    OptionModel,
    PostExKeywordRequestModel,
    PutKeywordRequestModel,
    useKeywordStore,
    usePostOptionMutation,
    usePutKeywordMutation,
} from '@/entity/keyword';
import { useDeleteKeywordMutation, usePostExKeywordMutation } from '@/entity/keyword/hook/useKeyword';

import { useKeywordCommon } from './useKeywordCommon';
import { KeywordBoardModel, SaveOptionFormValues } from '../model/model';

const useEditHandler = (isExKeyword?: boolean) => {
    const [inputData, setInputData] = useState('');
    const [addOptionData, setAddOptionData] = useState<SaveOptionFormValues | null>(null);
    const [selectOption, setSelectOption] = useState<OptionModel | null>(null);

    /** 외부 상태 및 훅 */
    const { getCategoryList, getSelectedKeyword, setSelectedKeyword } = useKeywordStore();
    const { getFindParentNames } = useKeywordCommon();

    /** API 관련 */
    const addKeyword = usePostExKeywordMutation();
    const updateKeyword = usePutKeywordMutation(isExKeyword);
    const deleteKeyword = useDeleteKeywordMutation(isExKeyword);
    const addOption = usePostOptionMutation();

    const selectedKeyword = getSelectedKeyword();
    const categoryList = getCategoryList();

    /** 카테고리 경로 생성 */
    const categoryNames = useMemo(() => {
        const names = getFindParentNames(categoryList, selectedKeyword?.pseq as number);
        return names.join(' > ');
    }, [categoryList, selectedKeyword?.pseq, getFindParentNames]);

    /** 제외 키워드 추가 버튼 유효성 검사 */
    const isAddExKeywordValid = useMemo(() => {
        return !inputData.trim().length || !selectOption;
    }, [selectOption, inputData]);

    /** 옵션 선택 핸들러 */
    const handleSelectOption = useCallback((option: OptionModel) => {
        setSelectOption({ ...option });
    }, []);

    /** 키워드 상태 변경 핸들러 */
    const handleKeywordState = useCallback(
        (params: PutKeywordRequestModel) => {
            updateKeyword.mutateAsync(params);
        },
        [updateKeyword],
    );

    /** 제외 키워드 추가 핸들러 */
    const handleAddExKeyword = useCallback(async () => {
        if (!inputData || !selectOption || !selectedKeyword) return;

        // 제외 키워드 파라미터 생성
        const param = inputData
            .split('\n')
            .filter(Boolean)
            .map(keyword => ({
                keyword,
                keywordType: 2,
                opSeq: selectOption.seq,
                state: 'Y',
                pseq: selectedKeyword.seq,
            }));

        try {
            const response = await addKeyword.mutateAsync(param as PostExKeywordRequestModel[]);
            const newKeywords = structuredClone(response) as OptionModel[];

            if (!selectedKeyword.children) return;

            const exKeywords = structuredClone(selectedKeyword.children) as KeywordBoardModel[];
            const updatedKeyword = {
                ...selectedKeyword,
                children: [...newKeywords, ...exKeywords],
            };

            setSelectedKeyword(updatedKeyword as KeywordBoardModel);
            setInputData('');
        } catch (error) {
            console.error('제외 키워드 추가 실패:', error);
        }
    }, [inputData, selectOption]);

    /** 키워드 삭제 핸들러 */
    const handleDeleteKeyword = useCallback(
        async (seq: number) => {
            if (!selectedKeyword) return;

            try {
                await deleteKeyword.mutateAsync({ seq: [seq] });

                if (isExKeyword && selectedKeyword.children) {
                    const filteredKeywords = structuredClone(selectedKeyword.children)?.filter(
                        (item: KeywordModel) => item.seq !== seq,
                    );

                    const updatedKeyword = {
                        ...selectedKeyword,
                        children: filteredKeywords,
                    };
                    setSelectedKeyword(updatedKeyword as KeywordBoardModel);
                } else {
                    setSelectedKeyword(null);
                }
            } catch (error) {
                console.error('키워드 삭제 실패:', error);
            }
        },
        [setSelectedKeyword, deleteKeyword, selectedKeyword, isExKeyword],
    );

    /** 입력값 변경 핸들러 */
    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const pattern = /['"]/g;
        const filtered = e.target.value.replace(pattern, '');
        setInputData(filtered);
    };

    /** 제외키워드 옵션 등록 */
    useEffect(() => {
        if (!addOptionData) return;
        const { op, ...rest } = addOptionData;
        const param = {
            ...rest,
            op: op.value,
            leftLength: op.leftLength,
            rightLength: op.rightLength,
            state: 'Y',
            sgSeqs: [],
        };
        addOption.mutateAsync(param).finally(() => setAddOptionData(null));
    }, [addOptionData]);

    return {
        // 상태
        inputData,
        selectOption,
        categoryNames,
        selectedKeyword,
        isAddExKeywordValid,

        // 핸들러
        handleInputChange,
        handleKeywordState,
        handleAddExKeyword,
        handleDeleteKeyword,
        handleSelectOption,
        setSelectedKeyword,
        setSelectOption,
        setAddOptionData,
    };
};

export { useEditHandler };
