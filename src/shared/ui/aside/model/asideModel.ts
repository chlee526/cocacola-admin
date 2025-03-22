import { ReactNode } from 'react';

type AsideButtonActionType = 'DELETE' | 'RESET' | 'SAVE';

interface AsideBoxProps {
    title: string;
    headerButton?: {
        label: string;
        onClick: () => void;
    } | null;
    headerControl?: ReactNode;
    children: ReactNode;
}

interface AsideBoxSaveEditProps extends AsideBoxProps {
    handleButtonAction: (type: AsideButtonActionType) => void;
}

export type { AsideButtonActionType, AsideBoxProps, AsideBoxSaveEditProps };
