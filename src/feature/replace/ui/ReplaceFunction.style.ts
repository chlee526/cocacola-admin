import { Button, css, styled } from '@mui/material';

const WhiteButton = styled(Button)`
    height: 30px;
    padding: 6px 10px;
    color: #666;
    background: #fff;
    box-shadow: none !important;
    border: 1px solid #d4d4d4;
    line-height: 16px;
    transition: all 0.2s;

    &:hover {
        border: 1px solid gray;
        background: #efefef;
        color: #333;
    }
`;
const functionStyle = css`
    padding: 15px;
    border-radius: 5px;
    background-color: #f7f8fa;

    .search-box {
        margin: 0;
        height: 30px;
        background-color: #fff;

        .select-box {
            width: 7rem;
            border-radius: 4px 0 0 4px;
        }
        .input-box {
            display: flex;
            width: 250px;
            border: 1px solid #d4d4d4;
            border-left: 0;
            border-radius: 0 8px 8px 0;
            box-sizing: border-box;

            > div {
                flex: 1;

                input {
                    // font-size: 13px;
                    padding: 0;
                    padding-left: 10px;
                }
            }

            button {
                width: 30px;
                border-radius: 0 4px 4px 0;
                background: #666;
                color: #fff;
            }
        }
    }
`;
export { WhiteButton, functionStyle };
