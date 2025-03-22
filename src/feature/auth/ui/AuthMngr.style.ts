import { css } from '@emotion/react';

const Styles = css`
    .category {
        font-size: 14px;
        font-weight: 600;
        transition: all 0.2s ease;

        &.is1dp {
            font-size: 1rem;
            line-height: 30px;
        }

        &.isNoneAuth {
            font-weight: 400;
            opacity: 0.5;
        }
    }
`;

export { Styles };
