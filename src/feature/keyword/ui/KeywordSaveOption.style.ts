import { css } from '@emotion/react';

const KeywordSaveOptionStyle = css`
    min-width: 406px;
    max-width: 460px;
    padding: 12px 20px 20px;
    border-radius: 5px;
    background: #fff;
    box-sizing: border-box;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    > .header {
        display: flex;
        align-items: center;
        gap: 8px;
        height: 32px;

        > h3 {
            font-size: 18px;
            font-weight: bold;
        }
    }

    > .contents {
        > .inputs {
            display: flex;
            flex-flow: column nowrap;
            gap: 8px;

            > div {
                &:has(#specialCheck) {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    gap: 4px;
                }

                &#op {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;

                    #op-length {
                        display: flex;
                        flex-wrap: wrap;
                        align-items: center;
                        gap: 4px;

                        .MuiFormControl-root {
                            min-width: unset;
                        }
                    }
                }

                legend {
                    font-size: 0.8125rem;
                    color: #666;
                }

                /* number spin 제거 */
                input[type='number']::-webkit-outer-spin-button,
                input[type='number']::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
            }
        }

        .button-box {
            display: flex;
            justify-content: flex-end;
            gap: 4px;
            margin-top: 16px;
        }

        .specialCheck-box {
            > button {
                min-width: 30px;
                padding: 0;
            }
        }
    }
`;

export { KeywordSaveOptionStyle };
