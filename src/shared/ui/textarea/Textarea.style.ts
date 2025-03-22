import { css } from '@emotion/react';
import styled from '@emotion/styled';

const CustomTextarea = styled.textarea`
    outline: none;
    resize: none;
`;

const textareaStyle = css`
    display: block;
    width: 100%;
    height: 100%;
    padding: 6px 10px;
    border-radius: 4px;
    box-sizing: border-box;
    background: #ffffff;
    text-align: left;
    line-height: 1.5em;
    outline: none;
    resize: none;
`;

export { CustomTextarea, textareaStyle };
