import { css } from '@emotion/react';

const headerStyle = css`
    height: 42px;
    position: sticky;
    top: 0;
    z-index: 8;
    padding: 0 20px;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
    color: hsla(0, 0%, 100%, 0.9);

    &::before {
        content: '';
        width: 100%;
        height: 42px;
        border: 0;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        background: #454c5f;
    }

    .wrap {
        width: 100%;
        min-width: 1400px;
        height: 100%;
        display: flex;
        justify-content: space-between;

        > div {
            display: flex;

            h1 {
                font-size: 16px;

                a {
                    display: block;
                    line-height: 42px;
                    padding: 0 30px;
                    font-size: 1.2em;
                    font-weight: 500;
                }
            }
        }

        .userUtil {
            flex: 0 0 20%;
            display: flex;
            justify-content: end;
            align-items: center;

            > button {
                background: hsla(0, 0%, 100%, 0.2);
                color: hsla(0, 0%, 100%, 0.9);
                padding: 5px;

                > svg {
                    height: 15px;
                    width: 15px;
                }
            }
        }
    }
`;

const logoutbuttonStyle = css``;
export { headerStyle, logoutbuttonStyle };
