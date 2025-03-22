import { css } from '@emotion/react';

const navigationStyle = css`
    display: flex;

    > div {
        min-width: 120px;
        height: auto;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-width: 0 1px 0 0;
        position: relative;
        transition: all 0.3s;

        &:first-of-type {
            border-left-width: 1px;
        }

        > a {
            display: block;
            padding: 0 40px;
            line-height: 42px;
            font-size: 16px;
            text-align: center;
        }

        .sub {
            background-color: #454c5f;
            visibility: hidden;
            opacity: 0;
            transition: all 0.3s;

            ul[role='menu'] {
                padding: 0;
                border-radius: 0 0 4px 4px;

                box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
                background: rgba(0, 0, 0, 0.2);

                > li {
                    color: #9fa8bf;
                    transition: all 0.3s;
                    padding: 0;

                    &:hover,
                    &:has(a.active) {
                        background: rgba(0, 0, 0, 0.2);
                        color: hsla(0, 0%, 100%, 0.9);
                    }
                    a {
                        display: block;
                        width: 100%;
                        padding: 8px 20px;
                        font-size: 14px;
                    }
                }
            }
        }

        &:hover {
            background: rgba(0, 0, 0, 0.2);

            .sub {
                visibility: visible;
                opacity: 1;
            }
        }

        &:has(a.active) {
            background: rgba(0, 0, 0, 0.2);
        }
    }
`;

export { navigationStyle };
