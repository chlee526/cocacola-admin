import { Control, UseFormWatch } from 'react-hook-form';

import { MembersModel, useDuplicateId } from '@/entity/member';

interface BoardFunctionPropsModel {
    checkedItems: readonly number[];
    setCheckedItems: React.Dispatch<React.SetStateAction<readonly number[]>>;
    setSelectedItem: React.Dispatch<React.SetStateAction<MembersModel>>;
    setIsAsideOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SaveEditPropsModel {
    selectedItem: MembersModel;
    setSelectedItem: React.Dispatch<React.SetStateAction<MembersModel>>;
}

type InputFieldType =
    | 'authSeq'
    | 'id'
    | 'pw'
    | 'name'
    | 'position'
    | 'dept'
    | 'phone'
    | 'email'
    | 'state';

type FormValues = Record<InputFieldType, string>;

interface InputFieldModel {
    field: InputFieldType;
    label: string;
    require?: boolean;
    type?: 'select' | 'text' | 'password';
}
interface InputFieldPropsModel {
    input: InputFieldModel;
    control: Control<FormValues>;
    watch: UseFormWatch<FormValues>;
    selectedItem: MembersModel;
    duplicateChk: boolean;
    setDuplicateChk: (value: boolean) => void;
    duplicateIdQuery: ReturnType<typeof useDuplicateId>;
}

interface InputFieldErrorMsgModel {
    id: string;
    pw: string;
    name: string;
    dept: string;
}

interface MemberConfigModel {
    InputFiledOpts: InputFieldModel[];
}

export type {
    BoardFunctionPropsModel,
    SaveEditPropsModel,
    FormValues,
    InputFieldType,
    InputFieldModel,
    InputFieldPropsModel,
    InputFieldErrorMsgModel,
    MemberConfigModel,
};
