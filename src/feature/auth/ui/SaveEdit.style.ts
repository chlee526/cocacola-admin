import { css } from '@emotion/react';

const Styles = css`
    .authMngr {
        min-height: 500px;
        max-height: calc(100vh - 400px);
        overflow-y: auto;
    }

    > .btnArea {
        display: flex;
        justify-content: end;
        gap: 6px;
        padding-top: 20px;
        margin-left: auto;
    }
`;

export { Styles };
// .select-box {
//     margin: 0;
//     width: 120px;
//     font-size: 13px;
//     border-radius: 4px 0 0 4px;
//     box-sizing: border-box;

//     > [role='combobox'] {
//         min-height: unset;

//         padding: 6px 22px 6px 10px;
//         box-sizing: border-box;
//     }
// }
// .input-box {
//     display: flex;
//     width: 250px;
//     border: 1px solid #d4d4d4;
//     border-left: 0;
//     border-radius: 0 8px 8px 0;
//     box-sizing: border-box;

//     > div {
//         flex: 1;

//         input {
//             font-size: 13px;
//             padding: 0;
//             padding-left: 10px;
//         }
//     }

//     button {
//         width: 30px;
//         border-radius: 0 4px 4px 0;
//         background: #666;
//         color: #fff;
//     }
// }
