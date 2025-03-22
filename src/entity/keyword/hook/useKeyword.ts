import { useMutation, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';

import { KeywordBoardModel } from '@/feature/keyword';
import { useAlert } from '@/shared/store';

import { deleteKeywordAsync, getKeywordAsync, postExKeywordAsync, postKeywordAsync, putKeywordAsync } from '../api/api';
import {
    BoardDataModel,
    DeleteKeywordRequestModel,
    GetKeywordRequestModel,
    KeywordModel,
    PostExKeywordRequestModel,
    PostKeywordRequestModel,
    PutKeywordRequestModel,
} from '../model/model';
import { getKeywordStore, useKeywordStore } from '../store/keyword';
import { useSearchParameterStore } from '../store/searchParameter';

// 키워드&제외키워드 조회
const useGetKeywordQuery = (params: GetKeywordRequestModel): UseQueryResult<BoardDataModel<KeywordBoardModel>, Error> => {
    const { selectedCategory } = getKeywordStore();

    return useQuery({
        queryKey: ['KEYWORD_LIST', params],
        queryFn: async () => {
            try {
                const response = await getKeywordAsync(params);

                const { result } = response.data;
                const newResult = result.data?.map(item => {
                    return {
                        ...item,
                        category: selectedCategory?.name || '',
                        children: item.children
                            ? item?.children.map(child => ({
                                  ...child,
                              }))
                            : [],
                    };
                });

                return {
                    total: result.total,
                    list: structuredClone(newResult),
                    page: params.page,
                };
            } catch (error) {
                console.error('쿼리 에러 발생', error);
                throw error;
            }
        },
        enabled: !!selectedCategory,
    });
};

// 키워드&제외키워드 등록
const usePostKeywordMutation = () => {
    const queryClient = useQueryClient();
    const { showAlert } = useAlert();

    return useMutation({
        mutationFn: async (param: PostKeywordRequestModel) => postKeywordAsync(param),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['KEYWORD_LIST'] });
            showAlert('키워드 등록을 성공했습니다.', 'success');
        },
        onError: err => {
            console.error('키워드 등록 에러', err);
            showAlert('키워드 등록을 실패했습니다.', 'error');
        },
    });
};

// 제외키워드 등록
const usePostExKeywordMutation = () => {
    const queryClient = useQueryClient();
    const { getSearchParameter } = useSearchParameterStore();
    const { showAlert } = useAlert();
    return useMutation({
        mutationFn: async (param: PostExKeywordRequestModel[]) => {
            try {
                const response = await postExKeywordAsync(param);
                const { data } = response;
                return data.result.data;
            } catch (error) {
                return error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['KEYWORD_LIST', getSearchParameter] });
            showAlert('제외 키워드 등록을 성공했습니다.', 'success');
        },
        onError: err => {
            console.error('키워드 등록 에러', err);
            showAlert('제외 키워드 등록을 실패했습니다.', 'error');
        },
    });
};

// 키워드&제외키워드 수정
const usePutKeywordMutation = (isExKeyword?: boolean) => {
    const queryClient = useQueryClient();
    const { showAlert } = useAlert();
    const { getSelectedKeyword, setSelectedKeyword } = useKeywordStore();
    const { getSearchParameter } = useSearchParameterStore();
    const selectedKeyword = getSelectedKeyword();

    return useMutation({
        mutationFn: async (param: PutKeywordRequestModel) => putKeywordAsync(param),
        onSuccess: (_res, param) => {
            queryClient.invalidateQueries({ queryKey: ['KEYWORD_LIST', getSearchParameter] });
            if (isExKeyword) {
                showAlert('제외 키워드 수정을 성공했습니다.', 'success');

                if (selectedKeyword) {
                    const exKeywordList = structuredClone(selectedKeyword.children);

                    exKeywordList?.forEach((item: KeywordModel) => {
                        if (item.seq === param.seq[0]) {
                            Object.assign(item, { state: param.state });
                        }
                    });

                    const updatedSelect = { ...selectedKeyword, children: exKeywordList };
                    setSelectedKeyword(updatedSelect as KeywordBoardModel);
                }
            } else {
                showAlert('키워드 수정을 성공했습니다.', 'success');
                if (selectedKeyword) {
                    const exKeywordList = structuredClone(selectedKeyword?.children);
                    exKeywordList?.forEach((item: KeywordModel) => {
                        if (param.state === 'Y') {
                            Object.assign(item, { state: 'Y' });
                        } else {
                            Object.assign(item, { state: 'N' });
                        }
                    });

                    const updatedSelect = Object.assign(selectedKeyword, { state: param.state }, { children: exKeywordList });
                    setSelectedKeyword(updatedSelect as KeywordBoardModel);
                }
            }
        },
        onError: err => {
            console.error('키워드 수정 에러', err);
            if (isExKeyword) {
                showAlert('제외 키워드 수정을 실패했습니다.', 'error');
            } else {
                showAlert('키워드 수정을 실패했습니다.', 'error');
            }
        },
    });
};

// 키워드&제외키워드 삭제
const useDeleteKeywordMutation = (isExKeyword?: boolean) => {
    const queryClient = useQueryClient();
    const { showAlert } = useAlert();
    const { getSearchParameter } = useSearchParameterStore();

    return useMutation({
        mutationFn: async (param: DeleteKeywordRequestModel) => deleteKeywordAsync(param),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['KEYWORD_LIST', getSearchParameter] });
            if (isExKeyword) {
                showAlert('제외 키워드 삭제를 성공했습니다.', 'success');
            } else {
                showAlert('키워드 삭제를 성공했습니다.', 'success');
            }
        },
        onError: err => {
            console.error('키워드 삭제 에러', err);
            if (isExKeyword) {
                showAlert('제외 키워드 삭제를 실패했습니다.', 'error');
            } else {
                showAlert('키워드 삭제를 실패했습니다.', 'error');
            }
        },
    });
};

export { useGetKeywordQuery, usePostKeywordMutation, usePutKeywordMutation, useDeleteKeywordMutation, usePostExKeywordMutation };
