import { css } from '@emotion/react';

const color = '#ddd';

const getSize = () => {
    return '#ddd';
};

const wrapStyle = css`
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--tmp);
    background-color: ${color};
    font-size: ${getSize()};
`;

export { wrapStyle };
