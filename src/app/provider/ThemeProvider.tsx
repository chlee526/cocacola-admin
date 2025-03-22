import { css } from '@emotion/react';
import { Reset } from 'styled-reset';

import { ProviderProps } from '@/shared/model';
import { customTheme } from '@/shared/ui';

import { GlobalStyles, ThemeProvider as MUIThemeProvider } from '@mui/material';

/**
 * 전체 적용 스타일
 */
const globalStyle = css`
    @font-face {
        font-family: 'Pretendard Variable';
        font-weight: 45 920;
        font-style: normal;
        font-display: swap;
        src:
            local('Pretendard Variable'),
            url('/asset/font/PretendardVariable.woff2') format('woff2-variations');
    }

    html,
    body,
    #root {
        height: 100%;
    }

    * {
        /* Reset의 font: inherit 때문에 폰트 적용 안됨 이슈로 important */
        font-family:
            Pretendard Variable,
            맑은 고딕,
            Malgun Gothic,
            돋움,
            Dotum,
            AppleSDGothicNeo-Light,
            Sans-serif,
            Tahoma !important;

        a {
            text-decoration: none;
            color: inherit;
        }

        button {
            cursor: pointer;
        }
    }

    body {
        background: #f7f8fa;

        /* #root {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            min-width: 1400px;
            min-height: 100%;
        } */
    }
`;

const ThemeProvider = ({ children }: ProviderProps) => {
    console.log(customTheme);
    return (
        <>
            <Reset />
            <MUIThemeProvider theme={customTheme}>
                <GlobalStyles styles={globalStyle} />
                {children}
            </MUIThemeProvider>
        </>
    );
};

export { ThemeProvider };
