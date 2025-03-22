import { css } from '@emotion/react';

const containerStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-width: 1400px;
    height: 100vh;
`;

const wrapStyle = css`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 470px;
    padding: 75px 32px 50px 32px;
    margin: auto;
    border-radius: 6px;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 0.15);

    > .icon {
        position: absolute;
        top: -54px;
        padding: 24px;

        svg {
            width: 60px;
            height: 60px;
        }
    }

    .title {
        padding-bottom: 30px;
        box-sizing: border-box;
        font-size: 39px;
        font-weight: 700;
    }
`;

export { containerStyle, wrapStyle };
