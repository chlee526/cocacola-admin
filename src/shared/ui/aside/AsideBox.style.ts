import { css } from '@emotion/react';

const asideBoxStyle = css`
    > .header {
        display: flex;
        align-items: center;
        gap: 8px;
        height: 32px;

        > h3 {
            font-size: 18px;
            font-weight: bold;
        }

        > .headerBtn {
            background: #fff;
        }
    }
`;

export { asideBoxStyle };
