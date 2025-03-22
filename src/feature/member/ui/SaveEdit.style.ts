import { css } from '@emotion/react';

const saveEditStyle = css`
    > .ui-box {
        > .contents {
            > .inputs {
                display: flex;
                flex-direction: column;
                gap: 12px;

                .authSeq {
                    > label {
                        display: flex;
                        justify-content: start;
                        margin: 0;

                        > span {
                            flex-shrink: 0;
                            width: 80px;
                            font-size: 14px;
                            font-weight: bold;
                            color: #666;
                        }

                        > .selectBoxWrap {
                            flex-grow: 1;
                            flex-shrink: 1;

                            > * {
                                width: 100%;
                            }
                        }
                    }
                }

                .input {
                    > label {
                        display: flex;
                        justify-content: start;
                        margin: 0;

                        > span {
                            flex-shrink: 0;
                            width: 80px;
                            font-size: 14px;
                            font-weight: bold;
                            color: #666;
                        }

                        > .inputWrap {
                            flex-grow: 1;
                            flex-shrink: 1;
                            display: flex;
                            gap: 4px;

                            > * {
                                width: 100%;
                            }

                            > strong {
                                padding: 5px 14px;
                                font-size: 13px;
                                font-weight: 600;
                            }

                            .inputBox {
                                flex-grow: 1;
                                flex-shrink: 1;

                                &.readOnly {
                                    fieldset {
                                        border: 0;
                                    }
                                    input {
                                        font-weight: bold;
                                    }
                                }
                            }

                            .duplicateBtn {
                                width: 80px;
                                padding: 1px 5px !important;
                                border-radius: 4px;
                                font-size: 13px;
                            }
                        }
                    }

                    &.require {
                        > label {
                            > span {
                                &::after {
                                    content: '*';
                                    display: inline-block;
                                    position: relative;
                                    top: 2px;
                                    padding-left: 3px;
                                    color: #ff0018;
                                }
                            }
                        }
                    }
                }

                .state {
                    > label {
                        display: flex;
                        justify-content: start;
                        margin: 0;

                        > span {
                            width: 80px;
                            font-size: 14px;
                            font-weight: bold;
                            color: #666;
                        }
                    }
                }
            }

            > .btnArea {
                display: flex;
                justify-content: end;
                gap: 6px;
                padding-top: 20px;
            }
        }
    }
`;

export { saveEditStyle };
