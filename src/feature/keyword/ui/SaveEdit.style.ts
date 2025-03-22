import { css } from '@emotion/react';

// import { useTheme } from '@mui/material/styles';

const KeywordSaveEditStyle = () => {
    // const theme = useTheme();
    return css`
        .categorySelect {
            width: 100%;
            padding: 8px 0;

            > * {
                width: 100%;
            }
        }

        .inputArea {
            height: 100px;
            padding-bottom: 8px;
        }

        .optionArea {
            flex: 1 1;
            padding: 8px;
            border-radius: 8px;
            border: 1px solid #cfcfcf;
            background: #fff;

            > .wrap {
                overflow: auto;
                padding: 0;

                .list {
                    position: relative;
                    padding: 0;
                    height: 100px;

                    &:empty {
                        &::before {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            content: '데이터가 없습니다';
                            font-size: 13px;
                            color: rgb(153, 153, 153);
                        }
                    }

                    .item {
                        padding: 0 0 4px 0;

                        &.is-select {
                            div[role='button'] {
                                background-color: #808080;
                                border-color: #808080;
                                color: #fff;
                                transition: all 200ms;
                            }
                        }

                        &:last-child {
                            padding: 0;
                        }

                        div[role='button'] {
                            padding: 3px;
                            border: 1px solid #cfcfcf;
                            border-radius: 4px;
                        }
                        span {
                            text-align: center;
                            font-size: 13px;
                            line-height: 1;
                        }
                    }
                }
            }
        }

        .btnArea {
            display: flex;
            justify-content: end;
            gap: 8px;
        }
    `;
};

const EditFormStyle = () => {
    return css`
        .keywordInfo {
            .keyword {
                position: relative;
                padding: 12px 24px;
                border: 1px solid #e6e6e6;
                border-radius: 4px;

                span {
                    display: block;
                    padding-bottom: 8px;
                    font-size: 13px;
                    color: #999999;
                }

                strong {
                    display: block;
                    font-size: 24px;
                    font-weight: 700;
                }

                &::before {
                    position: absolute;
                    top: 0;
                    left: -2px;
                    content: '';
                    width: 8px;
                    height: 100%;
                    border-top-left-radius: 4px;
                    border-bottom-left-radius: 4px;
                    background-color: #e6e6e6;
                    overflow: hidden;
                }
            }

            .filters {
                padding: 16px 0;
                .filter {
                    padding-bottom: 6px;
                    strong,
                    span {
                        display: inline-block;
                        font-size: 13px;
                    }
                    strong {
                        width: 80px;
                        font-weight: 600;
                    }
                }
            }
        }

        .exKeywordArea {
            padding: 16px;
            margin-bottom: 8px;
            border-radius: 8px;
            background-color: #f6f6f6;

            .label {
                font-size: 14px;
                font-weight: 600;
                margin-bottom: 8px;
            }

            .exKeywordWrap {
                .exKeywordList {
                    height: 120px;
                    padding: 8px 6px;
                    border: 1px solid #e6e6e6;
                    overflow: auto;
                    background-color: #fff;

                    .exKeywordItem {
                        display: flex;
                        justify-content: space-between;
                        transition: all 200ms;

                        &:hover {
                            background-color: #f3f3f3;
                        }

                        .lc {
                            display: flex;
                            align-items: center;
                            gap: 6px;
                            span {
                                font-size: 14px;
                            }
                        }

                        .rc {
                            display: flex;
                            align-items: center;
                            gap: 6px;

                            .filters {
                                display: flex;
                                gap: 6px;
                                span {
                                    font-size: 12px;
                                    padding: 4px;
                                    border-radius: 4px;
                                    background-color: #ededed;
                                }
                            }
                        }
                    }
                }
            }

            .addExKeywordWrap {
                margin-top: 10px;

                > .inputArea {
                    height: 80px;
                }

                > .optionArea {
                    .wrap {
                        .list {
                            height: 90px;
                        }
                    }
                }
                .addExKeywordBtn {
                    margin-top: 10px;
                    text-align: right;
                }
            }
        }
    `;
};
export { KeywordSaveEditStyle, EditFormStyle };
