import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';

import { TreeViewDataModel } from '@chlee526/ui-kit-react';

import {
    OptionModel,
    PostKeywordRequestModel,
    useGetOptionListQuery,
    useKeywordStore,
    usePostKeywordMutation,
    usePostOptionMutation,
} from '@/entity/keyword';

import { useKeywordCommon } from './useKeywordCommon';
import { SaveOptionFormValues } from '../model/model';

/**
 * 입력 데이터 인터페이스
 */
interface InputData {
    keyword: string;
    exclusion: string;
    [key: string]: string;
}

/**
 * 옵션 리스트 인터페이스
 */
interface OptionListData {
    keyword: OptionModel[];
    exclusion: OptionModel[];
    [key: string]: OptionModel[];
}

/**
 * 선택된 옵션 인터페이스
 */
interface SelectedOption {
    keyword: OptionModel | null;
    exclusion: OptionModel | null;
    [key: string]: OptionModel | null;
}

const useSaveHandler = () => {
    const [isUse, setIsUse] = useState(true);
    const [inputData, setInputData] = useState<InputData>({ keyword: '', exclusion: '' });
    const [categoryValue, setCategoryValue] = useState<string | number | null>('');
    const [categoryOptions, setCategoryOptions] = useState<TreeViewDataModel[]>([]);
    const [optionList, setOptionList] = useState<OptionListData>({ keyword: [], exclusion: [] });
    const [addOptionData, setAddOptionData] = useState<SaveOptionFormValues | null>(null);
    const [selectOption, setSelectOption] = useState<SelectedOption>({ keyword: null, exclusion: null });

    /** 외부 상태 및 훅 */
    const { getSelectedKeyword, getSelectedCategory } = useKeywordStore();
    const { getFilterValue } = useKeywordCommon();

    /** API 관련 */
    const optionListQuery = useGetOptionListQuery();
    const addOption = usePostOptionMutation();
    const addKeyword = usePostKeywordMutation();

    const selectedKeyword = getSelectedKeyword();
    const selectedCategory = getSelectedCategory();

    /** 카테고리 SelectBox 유효성 검사 */
    const isSelectBoxValid = useMemo(() => {
        const hasNoOptions = !categoryOptions?.length;
        const hasNoChildren = !selectedCategory?.children?.length;
        return hasNoOptions || hasNoChildren;
    }, [selectedCategory, categoryOptions]);

    /** 저장 버튼 유효성 검사 */
    const isSubmitValid = useMemo(() => {
        const hasNoCategory = selectedCategory?.children?.length && !categoryValue;
        const hasNoKeyword = !inputData.keyword.trim().length;
        const hasNoKeywordOption = !selectOption.keyword;
        const hasNoExKeyword = inputData.exclusion.trim().length && !selectOption.exclusion;

        return hasNoCategory || hasNoKeyword || hasNoKeywordOption || hasNoExKeyword;
    }, [selectedCategory, categoryValue, inputData, selectOption]);

    /** 옵션 클릭 핸들러 */
    const handleOptionClick = useCallback((item: OptionModel) => {
        const type = item.keywordType === 1 ? 'keyword' : 'exclusion';
        setSelectOption(prev => ({ ...prev, [type]: structuredClone(item) }));
    }, []);

    /** 폼 초기화 */
    const resetForm = useCallback(() => {
        setCategoryValue('');
        setInputData({ keyword: '', exclusion: '' });
        setSelectOption({ keyword: null, exclusion: null });
    }, []);

    /** 입력값 변경 핸들러 */
    const handleInputChange = useCallback((type: string, value: string) => {
        const pattern = /['"]/g;
        const filtered = value.replace(pattern, '');
        setInputData(prev => ({ ...prev, [type]: filtered }));
    }, []);

    /** 키워드 등록 */
    const handleSubmit = useCallback(() => {
        const category = !selectedCategory?.children?.length ? selectedCategory?.seq : categoryValue;

        // 제외 키워드 리스트 생성
        const exKeywordList = inputData.exclusion
            .split('\n')
            .filter(Boolean)
            .map(keyword => ({
                keyword,
                keywordType: 2,
                opSeq: selectOption.exclusion?.seq,
                state: 'Y',
            }));

        // 요청 파라미터 생성
        const param = {
            state: isUse ? 'Y' : 'N',
            keywordType: 1,
            keyword: inputData.keyword.split('\n').filter(Boolean),
            opSeq: selectOption.keyword?.seq,
            exKeyowrdAddList: inputData.exclusion.trim() ? exKeywordList : [],
            pSeq: category,
        };

        addKeyword.mutateAsync(param as PostKeywordRequestModel).then(resetForm);
    }, [categoryValue, inputData, selectOption, isUse, selectedCategory, addKeyword]);

    /** 옵션 목록 업데이트 */
    useEffect(() => {
        if (!optionListQuery.data) return;

        const result = optionListQuery.data;
        const keywordOption = result.filter(item => item.keywordType === 1);
        const exclusionOption = result.filter(item => item.keywordType === 2);

        setOptionList({
            keyword: structuredClone(keywordOption),
            exclusion: structuredClone(exclusionOption),
        });
    }, [optionListQuery.isFetching]);

    /** 옵션 등록 */
    useEffect(() => {
        if (!addOptionData) return;

        const { op, ...rest } = addOptionData;
        const param = {
            ...rest,
            op: op.value,
            leftLength: op.leftLength,
            rightLength: op.rightLength,
            state: 'Y',
            ...(addOptionData.keywordType === 2 && { sgSeqs: [] }),
        };

        addOption.mutateAsync(param).finally(() => setAddOptionData(null));
    }, [addOptionData]);

    /** 카테고리 변경시 카테고리 옵션 값 초기화 */
    useLayoutEffect(() => {
        setCategoryValue('');
    }, [selectedCategory]);

    /** 카테고리 옵션 목록 업데이트 */
    useEffect(() => {
        const result = selectedCategory?.children?.filter(item => !item.children?.length) || [];
        setCategoryOptions(result);
    }, [selectedCategory]);

    return {
        // 상태
        isUse,
        inputData,
        categoryValue,
        categoryOptions,
        optionList,
        selectOption,
        selectedKeyword,
        selectedCategory,
        isSelectBoxValid,
        isSubmitValid,

        // 핸들러
        setIsUse,
        setCategoryValue,
        handleInputChange,
        handleOptionClick,
        handleSubmit,
        resetForm,
        setAddOptionData,
        getFilterValue,
    };
};

export { useSaveHandler };
