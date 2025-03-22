import { css } from '@emotion/react';

const KeywordBoardStyle = css`
    .is-ellipsis {
        display: inline-block;
        max-width: 120px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        &.is-length {
            color: #b5b5b5;
        }
    }
`;

export { KeywordBoardStyle };
