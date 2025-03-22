import { ReactNode, useCallback, useEffect, useMemo } from 'react';

import { useMenuAuthContext, usePersonalizationStore } from '@chlee526/ui-kit-react';

import { asideStyle, buttonStyle, resizerStyle } from './AsideLayout.style';
import { handleAside } from './util/handleAside';

import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { IconButton } from '@mui/material';

interface OwnProps {
    menuName: string;
    initState?: {
        'min-width': string;
        'max-width': string;
    };
    isOpen: boolean;
    handleOpen: (state: boolean) => void;
    children: ReactNode;
}

const initValue = {
    isOpen: true,
    'min-width': '150px',
    'max-width': 'unset',
};

const AsideLayout = ({
    menuName,
    initState = initValue,
    isOpen,
    handleOpen,
    children,
}: OwnProps) => {
    const methods = useMenuAuthContext();
    const maxWidth = useCallback(() => initState['max-width'], [initState]);
    const minWidth = useCallback(() => initState['min-width'], [initState]);

    const { setPersonalization, getPersonalization } = usePersonalizationStore();

    // 수정 또는 저장 권한이 있는지 확인
    const useAside = useMemo(() => {
        return !!(methods && (methods.includes('POST') || methods.includes('PUT')));
    }, [methods]);

    /**
     * aside 넓이 개인화 적용
     * 렌더될때만 동작
     */
    const applyPersonalization = useCallback(() => {
        const personalization = getPersonalization;
        const menuPersonalization = personalization[menuName];

        const $aside = document.querySelector('aside') as HTMLElement;

        // 개인화 정보에 aside 존재하는지 확인 타입가드
        if (
            menuPersonalization &&
            typeof menuPersonalization === 'object' &&
            'aside' in menuPersonalization
        ) {
            const { aside } = menuPersonalization;

            // 개인화 aside가 객체인지 확인
            if (typeof aside === 'object' && aside !== null && 'width' in aside && $aside) {
                $aside.style.width = aside.width as string;
            } else {
                $aside.style.width = '25%';
            }

            $aside.style.transitionProperty = 'min-width, padding, width';
        }
    }, [getPersonalization, menuName]);

    /**
     * aside 넓이 개인화 저장
     * @param width{string} 퍼센트 포함 넓이
     */
    const savePersonalization = (width: string) => {
        if (!menuName) return;

        setPersonalization(menuName, 'aside', { width });
    };

    const toggleAside = () => {
        handleOpen(!isOpen);
    };

    const getClassName = () => {
        return useAside && isOpen ? '' : 'is-closed';
    };

    useEffect(() => {
        // aside 사용할때만 동작
        if (useAside) {
            // 개인화 넓이 적용
            applyPersonalization();

            // aside 넓이 조정 이벤트
            handleAside(savePersonalization);
        }
    }, []);

    return useAside ? (
        <>
            <div id="resizer" role="button" css={resizerStyle} tabIndex={0}>
                <IconButton className={getClassName()} css={buttonStyle} onClick={toggleAside}>
                    {isOpen ? <NavigateNextRoundedIcon /> : <NavigateBeforeRoundedIcon />}
                </IconButton>
            </div>
            <aside
                className={getClassName()}
                css={asideStyle}
                style={{ maxWidth: maxWidth(), minWidth: minWidth() }}
            >
                {children}
            </aside>
        </>
    ) : null;
};

export { AsideLayout };
