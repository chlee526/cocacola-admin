import { css } from '@emotion/react';

const replaceSaveEditStyle = css`
    position: relative;

    > .ui-box {
        > .contents {
            > *:not(:last-child) {
                margin-bottom: 10px;
            }
            > .inputs {
                border: 1px solid #eeeeee;
                border-radius: 4px;

                > .find,
                .replace {
                    position: relative;
                    height: 150px;
                    overflow-y: auto;

                    &::before {
                        position: absolute;
                        display: block;
                        width: 100%;
                        top: 50%;
                        transform: translateY(-50%);
                        font-size: 28px;
                        text-align: center;
                        color: #666;
                        opacity: 0.3;
                        pointer-events: none;
                    }
                }

                > .find {
                    background-color: #f3f3f3;
                    &::before {
                        content: '찾을 키워드 입력';
                    }
                }

                > .replace {
                    &::before {
                        content: '치환 키워드 입력';
                    }
                }

                textarea {
                    padding: 20px;
                    border: none;
                    background-color: transparent;
                }
            }

            > .btnArea {
                display: flex;
                justify-content: end;
                gap: 4px;
            }
        }
    }
`;

export { replaceSaveEditStyle };
