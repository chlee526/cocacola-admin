import { RegisterOptions } from 'react-hook-form';

import { PostReceiverRequestModel } from '@/entity/receiver';

interface InputFieldSettingType {
    id: keyof PostReceiverRequestModel;
    label: string;
    rules?: Omit<
        RegisterOptions<PostReceiverRequestModel, keyof PostReceiverRequestModel>,
        'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
    >;
}

const InputFieldSettings: InputFieldSettingType[] = [
    {
        id: 'rname',
        label: '이름',
        rules: {
            required: '필수값입니다.',
            minLength: {
                value: 2,
                message: '최소 2글자 이상 입력해주세요.',
            },
        },
    },
    {
        id: 'position',
        label: '직급',
        rules: {
            minLength: {
                value: 2,
                message: '최소 2글자 이상 입력해주세요.',
            },
        },
    },
    {
        id: 'dept',
        label: '부서',
        rules: {
            required: '필수값입니다.',
            minLength: {
                value: 2,
                message: '최소 2글자 이상 입력해주세요.',
            },
        },
    },
    {
        id: 'email',
        label: 'Email',
        rules: {
            required: '필수값입니다.',
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '올바른 이메일 형식이 아닙니다.',
            },
            validate: (value: string | boolean | undefined, formValues: PostReceiverRequestModel) => {
                if (typeof value === 'string') {
                    if (!formValues.emailChk) return '이메일 중복확인이 필요합니다.';
                    if (formValues.emailDuplicate) return '이메일 중복되었습니다.';
                }
                return true;
            },
        },
    },
];

export { InputFieldSettings };
