import { useEffect, useMemo } from 'react';

import { TreeViewDataModel } from '@chlee526/ui-kit-react';

import {
    DeleteCategoryRequestModel,
    PostCategoryRequestModel,
    PutCategoryRequestModel,
    useDeleteCategoryMutation,
    useGetCategoryQuery,
    useKeywordStore,
    usePostCategoryMutation,
    usePutCategoryMutation,
    useSearchParameterStore,
} from '@/entity/keyword';

const useCategoryHandler = () => {
    /** 외부 상태 */
    const { getCategoryList, getSelectedCategory, setSelectedCategory, setCategoryList, setSelectedKeyword } = useKeywordStore();
    const { getSearchParameter, updateSearchParameter } = useSearchParameterStore();

    /** API 관련 */
    const { data: categoryData, isLoading, isFetching } = useGetCategoryQuery();
    const addCategoryMutation = usePostCategoryMutation();
    const updateCategoryMutation = usePutCategoryMutation();
    const deleteCategoryMutation = useDeleteCategoryMutation();

    const selectedCategory = getSelectedCategory();
    const categoryList = getCategoryList();

    /** 로딩 상태 메모이제이션 */
    const isLoaderOpen = useMemo(() => isLoading || isFetching, [isFetching, isLoading]);

    /**
     * 특정 노드와 모든 하위 노드의 시퀀스를 찾는 함수
     * @param {TreeViewDataModel[]} treeData - 트리 구조 데이터
     * @param {number} targetSeq - 찾고자 하는 대상 시퀀스
     * @returns {number[]} 대상 노드와 모든 하위 노드의 시퀀스 배열
     */
    const findAllChildrenSeq = (treeData: TreeViewDataModel[], targetSeq: number): number[] => {
        const result: number[] = [];

        const findAndCollect = (items: TreeViewDataModel[]): boolean => {
            return items.some(item => {
                if (item.seq === targetSeq) {
                    const collectSeqs = (node: TreeViewDataModel) => {
                        node.children?.forEach(child => {
                            result.push(child.seq);
                            collectSeqs(child);
                        });
                    };
                    collectSeqs(item);
                    return true;
                }
                return item.children?.length ? findAndCollect(item.children) : false;
            });
        };

        findAndCollect(treeData);
        return [targetSeq, ...result].filter(item => item);
    };

    /**
     * 카테고리 추가 핸들러
     * @param {Omit<TreeViewDataModel, 'seq'>} item - 추가할 카테고리 정보
     */
    const handleAdd = async (item: Omit<TreeViewDataModel, 'seq'>) => {
        const { name, ...rest } = item;
        const isRootCategory = item.pseq === 0;

        const param = {
            ...rest,
            keyword: name,
            ...(isRootCategory && { keywordType: 0 }),
        };
        await addCategoryMutation.mutateAsync(param as PostCategoryRequestModel);
    };

    /**
     * 카테고리 업데이트 핸들러
     * @param {TreeViewDataModel} item - 업데이트할 카테고리 정보
     * @param {boolean} isStateChange - 상태 변경 여부
     */
    const handleUpdate = async (item: TreeViewDataModel, isStateChange?: boolean) => {
        const allChildSeqArr = findAllChildrenSeq(structuredClone(categoryList), item.seq);
        const param = {
            seq: isStateChange ? allChildSeqArr : [item.seq],
            ...(isStateChange ? { state: item.state } : { keyword: item.name }),
        } as PutCategoryRequestModel;

        await updateCategoryMutation.mutateAsync(param);
    };

    /**
     * 카테고리 삭제 핸들러
     * @param {TreeViewDataModel} item - 삭제할 카테고리 정보
     */
    const handleDelete = async (item: TreeViewDataModel) => {
        const allChildSeqArr = findAllChildrenSeq(structuredClone(categoryList), item.seq);
        const param = { seq: allChildSeqArr } as DeleteCategoryRequestModel;
        await deleteCategoryMutation.mutateAsync(param);
    };

    /** 선택된 카테고리 변경 시 검색 파라미터 업데이트 */
    useEffect(() => {
        const allChildSeqArr = findAllChildrenSeq(structuredClone(categoryList), selectedCategory?.seq as number);

        setSelectedKeyword(null);

        updateSearchParameter({ ...getSearchParameter, seq: allChildSeqArr as number[] });
    }, [selectedCategory, categoryList]);

    /** 카테고리 목록 업데이트 */
    useEffect(() => {
        if (categoryData) {
            setCategoryList(structuredClone(categoryData));
        }
    }, [categoryData]);

    return {
        categoryList,
        isLoaderOpen,
        selectedCategory,
        setSelectedCategory,
        handleAdd,
        handleUpdate,
        handleDelete,
    };
};

export { useCategoryHandler };
