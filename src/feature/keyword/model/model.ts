import { KeywordModel } from '@/entity/keyword';

type KeywordBoardModel = {
    seq: number;
    keywordType: number;
    keyword: string;
    optionName: string;
    opSeq: number;
    state: string;
    op: number;
    leftLength: number;
    rightLength: number;
    filterType: number;
    specialCheck: number;
    sgSeqs?: number[];
    regDate: string;
    mname: string;
    pseq: number;
    category: string;
    children: KeywordModel[];
} | null;

type SaveOptionFormValues = {
    keywordType: number;
    optionName: string;
    op: {
        value: number;
        leftLength: number;
        rightLength: number;
    };
    filterType: number;
    specialCheck: number;
    sgSeqs?: number[];
};

interface FilterKeyItem {
    key: 'sgSeqs' | 'filterType' | 'specialCheck' | 'opSeq';
    name: string;
}

interface BoardFunctionProps {
    checkedItems: readonly number[];
    setCheckedItems: React.Dispatch<React.SetStateAction<readonly number[]>>;
    setIsAsideOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export type { KeywordBoardModel, SaveOptionFormValues, FilterKeyItem, BoardFunctionProps };
