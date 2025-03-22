import { ReactNode } from 'react';

import { SerializedStyles } from '@emotion/react';

import { styled, SxProps, Theme } from '@mui/material';

type Variants = 'style2';

interface OwnProps {
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
    sx?: SxProps<Theme>;
    css?: SerializedStyles;
    variant?: Variants;
    labelWidth?: number;
}

// MUI Theme설정을 그대로 반영하는
const CuiAsideInputsRoot = styled('div')<{ variant?: Variants; labelWidth?: number }>(({ theme, variant, labelWidth }) => ({
    // 기본 스타일(root)
    ...(theme.components?.CuiAsideInputs?.styleOverrides?.root as React.CSSProperties),
    // variant 스타일
    ...(theme.components?.CuiAsideInputs?.variants?.find(v => v.props.variant === variant)?.style as React.CSSProperties),
    // labelWidth 적용(기본형에서만 적용됨)
    ...(variant === undefined &&
        labelWidth !== undefined && {
            label: {
                '> *:not(.MuiFormControl-root)': {
                    flex: `0 0 ${labelWidth}px !important`,
                },
            },
        }),
}));

const CuiAsideInputs = ({ children, variant, labelWidth, ...props }: OwnProps) => {
    return (
        <CuiAsideInputsRoot variant={variant} labelWidth={labelWidth} {...props}>
            {children}
        </CuiAsideInputsRoot>
    );
};

export { CuiAsideInputs };
