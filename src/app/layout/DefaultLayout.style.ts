import { css } from '@emotion/react';

const defaultLayoutStyle = css`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    flex: 1 1;
    // font-size: 13px;
    position: relative;
    min-height: 100%;

    #container {
        display: flex;
        flex: 1 1;

        main {
            padding: 20px;
            padding-top: 0;
            flex-wrap: nowrap;
            gap: 20px;
        }

        .ui-box {
            padding: 12px 20px 20px;
            border-radius: 5px;
            background: #fff;
            box-sizing: border-box;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .ui-help {
            > .wrap,
            div {
                > ul {
                    padding: 15px 20px;
                    border-radius: 5px;
                    background: rgba(0, 0, 0, 0.05);
                    box-sizing: border-box;

                    > li {
                        font-size: 13px;

                        &:not(:last-child) {
                            padding-bottom: 5px;
                        }

                        em {
                            color: #999999;
                        }

                        > span {
                            display: block;
                            position: relative;
                            padding-left: 12px;
                            line-height: 16px;

                            &::before {
                                display: block;
                                content: '';
                                position: absolute;
                                top: 4px;
                                left: 0;
                                width: 3px;
                                height: 3px;
                                background-color: #666666;
                            }
                        }

                        &.title {
                            display: flex;
                            align-items: center;
                            gap: 4px;
                            font-size: 14px;
                            font-weight: bold;
                            padding-bottom: 12px;

                            .icon {
                                font-size: 16px;
                            }
                        }
                    }
                }
            }
        }
    }
`;

const breadcrumbsStyle = css`
    display: flex;
    padding: 0 15px;
    gap: 0.5rem;
    align-items: center;

    > * {
        line-height: 30px;
        padding: 5px 0;

        a,
        span {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 0.813rem;
        }
    }

    svg {
        font-size: 16px;
    }
`;
export { defaultLayoutStyle, breadcrumbsStyle };
