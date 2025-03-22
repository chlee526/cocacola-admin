import { css } from '@emotion/react';

const listStyle = css`
    .row {
        display: flex;
        padding: 0 0 1px 0;

        .item {
            flex: 1 1;
            display: grid;
            grid-template-columns: 80px 25% auto;
            gap: 0.1em;
            background: rgba(0, 0, 0, 0.04);
            transition: background 0.18s;

            > * {
                display: block;
                align-items: center;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;

                &.isLast {
                    display: flex;
                }

                .state {
                    display: block;
                    width: 0.5em;
                    height: 0.5em;
                    border-radius: 50%;
                    background: green;
                    margin-right: 0.5em;
                    text-align: left;
                    text-indent: -9999px;

                    .isNotUse {
                        background: red;
                    }
                }
            }

            &.isSelected {
                background: rgba(0, 0, 0, 0.2);
            }
        }

        &.is4Col {
            .item {
                grid-template-columns: 80px 25% 120px auto;
            }
        }
    }
`;

export { listStyle };
