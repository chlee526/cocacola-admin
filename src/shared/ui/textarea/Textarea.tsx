import React from 'react';

import { textareaStyle } from './Textarea.style';

type TextareaTypes = React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
>;

interface OwnProps extends TextareaTypes {
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
}

const Textarea = ({ id, value, onChange, placeholder }: OwnProps) => {
    return (
        <textarea
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            css={textareaStyle}
        />
    );
};

export { Textarea };
