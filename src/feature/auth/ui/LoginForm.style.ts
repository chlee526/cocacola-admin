import { css } from '@emotion/react';

const fontSize = '16px';

const formStyle = css`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    margin-top: 30px;

    .inputWrap {
        width: 100%;

        > * {
            width: 100%;

            .input {
                width: 100%;
            }

            > p {
                position: relative;
                transform: none;
                width: 100%;
                margin: 0;
                padding: 6px 6px 6px 6px;
                box-sizing: border-box;
            }
        }
    }

    .btnWrap {
        position: relative;
        padding-top: 10px;

        .loginBtn {
            padding: 14px 18px;
            font-size: ${fontSize};
            font-weight: 700;
        }

        .loader {
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -12px;
            margin-left: -12px;
        }
    }
`;

export { formStyle };
