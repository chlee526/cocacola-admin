import { ReactNode } from 'react';

import { Stack, styled } from '@mui/material';

interface OwnProps {
    children: ReactNode;
}

// MUI Theme설정을 그대로 반영
const CuiFunctionRoot = styled('div')(({ theme }) => ({
    ...(theme.components?.CuiFunction?.styleOverrides?.root as React.CSSProperties),
}));

const CuiFunction = ({ children }: OwnProps) => {
    return (
        <CuiFunctionRoot>
            <Stack direction="row" justifyContent="space-between">
                {children}
            </Stack>
        </CuiFunctionRoot>
    );
};

export { CuiFunction };
