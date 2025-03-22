import { TreeViewDataModel } from '@chlee526/ui-kit-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useAlert } from '@/shared/store';

import { deleteCategoryAsync, getCategoryAsync, postCategoryAsync, putCategoryAsync } from '../api/api';
import { CategoryModel, DeleteCategoryRequestModel, PostCategoryRequestModel, PutCategoryRequestModel } from '../model/model';

// 카테고리 조회
const useGetCategoryQuery = () => {
    return useQuery({
        queryKey: ['CATEGORY_LIST'],
        queryFn: async () => {
            try {
                const response = await getCategoryAsync();
                const { result } = response.data;

                const transformData = (data: CategoryModel[]): TreeViewDataModel[] => {
                    return data.map(item => {
                        // 객체 구조 분해로 keyword 속성을 분리하고 나머지는 rest에 담기
                        const { keyword, children, ...rest } = item;

                        return {
                            ...rest,
                            name: keyword, // keyword를 name으로 변환
                            // 자식이 있으면 재귀적으로 처리
                            ...(children && { children: transformData(children) }),
                        };
                    });
                };

                const updateData = transformData(structuredClone(result.data));

                return updateData;
            } catch (error) {
                console.error('쿼리 에러 발생', error);
                throw error;
            }
        },
    });
};

// 카테고리 등록
const usePostCategoryMutation = () => {
    const queryClient = useQueryClient();
    const { showAlert } = useAlert();

    return useMutation({
        mutationFn: async (param: PostCategoryRequestModel) => postCategoryAsync(param),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['CATEGORY_LIST'] });
            showAlert('카테고리 등록을 성공했습니다.');
        },
        onError: err => {
            console.error('카테고리 등록 에러', err);
            showAlert('카테고리 등록에 실패했습니다.');
        },
    });
};

// 카테고리 수정
const usePutCategoryMutation = () => {
    const queryClient = useQueryClient();
    const { showAlert } = useAlert();

    return useMutation({
        mutationFn: async (param: PutCategoryRequestModel) => putCategoryAsync(param),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['CATEGORY_LIST'] });
            showAlert('카테고리 수정을 성공했습니다.', 'success');
        },
        onError: err => {
            console.error('카테고리 수정 에러', err);
            showAlert('카테고리 수정을 실패했습니다.');
        },
    });
};

// 카테고리 수정
const useDeleteCategoryMutation = () => {
    const queryClient = useQueryClient();
    const { showAlert } = useAlert();

    return useMutation({
        mutationFn: async (param: DeleteCategoryRequestModel) => deleteCategoryAsync(param),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['CATEGORY_LIST'] });
            showAlert('카테고리 삭제를 성공했습니다.', 'success');
        },
        onError: err => {
            console.error('카테고리 삭제 에러', err);
            showAlert('카테고리 삭제를 실패했습니다.');
        },
    });
};

export { useGetCategoryQuery, usePostCategoryMutation, usePutCategoryMutation, useDeleteCategoryMutation };
