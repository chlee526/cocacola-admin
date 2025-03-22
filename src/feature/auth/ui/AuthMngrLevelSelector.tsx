import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { ToggleButtonGroup, ToggleButton, ToggleButtonGroupProps } from '@mui/material';

interface OwnProps {
    seq: number;
    value: [string, Dispatch<SetStateAction<Record<string, string>>>];
    size?: ToggleButtonGroupProps['size'] | 'xsmall';
    onClick?: (e: React.MouseEvent<HTMLElement>, val: string | null) => void;
}

const AuthMngrLevelSelector = ({
    seq,
    value: ownPropsValue,
    size = 'small',
    onClick,
}: OwnProps) => {
    const [ownValue, setOwnValue] = ownPropsValue;
    const [value, setValue] = useState<string[] | null>();

    const handleChange = (e: React.MouseEvent<HTMLElement>, val: string | null) => {
        let result = null;
        if (val && val.length > 0) {
            if (value && value[value.length - 1] === val) {
                result = null;
            } else {
                result = ['1', '2', '3'].slice(0, Number(val));
            }
        }
        setOwnValue(prev => {
            const ownResult = { ...prev };
            if (result) ownResult[seq] = result[result.length - 1];
            else delete ownResult[seq];
            return ownResult;
        });
        if (onClick) onClick(e, val);
    };

    useEffect(() => {
        const level = Number(ownValue);
        const newValue = Array.from({ length: level }, (_, i) => String(i + 1));
        setValue(newValue);
    }, [ownValue]);

    return (
        <ToggleButtonGroup value={value} size={size}>
            <ToggleButton value="1" onClick={handleChange} title="조회">
                1
            </ToggleButton>
            <ToggleButton value="2" onClick={handleChange} title="조회,등록,수정">
                2
            </ToggleButton>
            <ToggleButton value="3" onClick={handleChange} title="조회,등록,수정,삭제">
                3
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export { AuthMngrLevelSelector };
