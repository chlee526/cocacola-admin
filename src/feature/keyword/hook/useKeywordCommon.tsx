import { TreeViewDataModel } from '@chlee526/ui-kit-react';

import { KeywordModel, OptionModel } from '@/entity/keyword';
import { COMMON_CHANNEL } from '@/shared/config';
import { EXCLUSION_FILTER_TYPE, EXCLUSION_OP } from '@/shared/config/common';
import { CommonModel } from '@/shared/model';

import { FilterKeyItem, KeywordBoardModel } from '../model/model';

import { styled, Tooltip, TooltipProps } from '@mui/material';

const useKeywordCommon = () => {
    /**
     * 필터 값을 가져오는 함수
     * @param filterKey - 필터 키
     * @param selectedKeyword - 선택된 키워드 정보
     * @returns 필터 값 문자열
     */
    const getFilterValue = (
        filterKey: Pick<FilterKeyItem, 'key'>['key'] | Omit<FilterKeyItem, 'opSeq'>['key'],
        selectedKeyword: KeywordBoardModel | OptionModel,
    ) => {
        const renderValues = {
            sgSeqs: () => {
                const isAllSelected = selectedKeyword?.sgSeqs?.length === COMMON_CHANNEL.length;
                if (isAllSelected) return '전체';

                return selectedKeyword?.sgSeqs
                    ?.map((seq: number) => COMMON_CHANNEL.find(chn => chn.seq === Number(seq)))
                    .filter(Boolean)
                    .map((item: CommonModel | undefined) => item?.cmmName)
                    .join(',');
            },

            filterType: () => {
                return EXCLUSION_FILTER_TYPE.find(({ seq }) => seq === Number(selectedKeyword?.filterType))?.name || '';
            },

            specialCheck: () => {
                return selectedKeyword?.specialCheck === 1 ? '포함' : '미포함';
            },

            opSeq: () => {
                const op = EXCLUSION_OP.find(({ seq }) => seq === Number(selectedKeyword?.op));
                if (selectedKeyword?.op === 3) {
                    return `${op?.name} (${selectedKeyword?.leftLength}, ${selectedKeyword?.rightLength})`;
                }
                return op?.name;
            },
        };

        return renderValues[filterKey]?.();
    };

    /**
     * 필터 아이콘 값을 가져오는 함수
     * @param filterKey - 필터 키
     * @param selectedKeyword - 선택된 키워드 정보
     * @returns 필터 아이콘 문자열
     */
    const getFilterValueIcon = (
        filterKey: 'filterType' | 'specialCheck' | 'opSeq',
        selectedKeyword: KeywordModel | OptionModel,
    ) => {
        const renderValues = {
            filterType: () => {
                const filterTypeMap: Record<number, string> = {
                    1: 'SC',
                    2: 'S',
                    3: 'C',
                    4: 'M',
                    5: 'U',
                };
                return filterTypeMap[selectedKeyword?.filterType] || '';
            },

            specialCheck: () => {
                return selectedKeyword?.specialCheck === 1 ? '특' : '';
            },

            opSeq: () => {
                const opMap: Record<number, string> = {
                    1: 'A',
                    2: 'P',
                    3: `N(${selectedKeyword?.leftLength}, ${selectedKeyword?.rightLength})`,
                };
                return opMap[selectedKeyword?.op] || '';
            },
        };

        return renderValues[filterKey]?.();
    };

    /**
     * 특정 노드와 모든 부모 노드의 이름을 찾는 함수
     * @param {TreeViewDataModel[]} dataList - 트리 데이터 목록
     * @param {number} seq - 대상 노드의 시퀀스
     * @returns {string[]} 노드들의 이름 배열 (최상위 부모부터 대상 노드까지)
     */
    const getFindParentNames = (dataList: TreeViewDataModel[], seq: number): string[] => {
        const findParentRecursive = (
            items: TreeViewDataModel[],
            targetSeq: number,
            currentPath: string[] = [],
        ): string[] | null => {
            return items
                .map(item => {
                    if (item.seq === targetSeq) {
                        return [...currentPath, item.name];
                    }

                    if (item.children?.length) {
                        return findParentRecursive(item.children, targetSeq, [...currentPath, item.name]);
                    }

                    return null;
                })
                .flat()
                .filter(Boolean) as string[];
        };

        return findParentRecursive(structuredClone(dataList), seq) || [];
    };

    /**
     * 커스텀 툴팁 스타일 컴포넌트
     */
    const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => <Tooltip {...props} classes={{ popper: className }} />)(
        () => ({
            '.tooltipDl': {
                display: 'flex',
                padding: '2px 0',
                dd: {
                    paddingLeft: '6px',
                },
            },
        }),
    );

    return { getFilterValue, getFilterValueIcon, getFindParentNames, HtmlTooltip };
};

export { useKeywordCommon };
