import { css } from '@emotion/react';

const SiteListStyle = css`
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;

    .filters {
        display: flex;
        gap: 0.4em;
        padding: 0.5em 1em;
        margin: 0 0 1em 0;
        border-radius: 8px;
        background: rgba(0, 0, 0, 0.05);
    }

    .listWrap {
        flex: 1;
        display: flex;
        gap: 1em;

        > .grp {
            flex: 0 0 130px;
            min-width: 100px;
            white-space: nowrap;

            button {
                flex-direction: column;

                > * {
                    line-height: 1;
                }

                .cnt {
                    display: block;
                    font-size: 11px;
                    font-weight: 300;
                }
            }
        }

        > .list {
            flex: 1 1;
        }
    }
`;
export { SiteListStyle };
