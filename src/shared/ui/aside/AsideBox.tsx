import { asideBoxStyle } from './AsideBox.style';
import { AsideBoxProps } from './model/asideModel';

import { Button } from '@mui/material';

const AsideBox = ({ title, headerButton, children }: AsideBoxProps) => {
    return (
        <div className="ui-box" css={asideBoxStyle}>
            <div className="header">
                <h3>{title}</h3>
                {headerButton && (
                    <Button
                        className="headerBtn"
                        variant="outlined"
                        size="small"
                        onClick={headerButton.onClick}
                    >
                        {headerButton.label}
                    </Button>
                )}
            </div>
            <hr />
            {children}
        </div>
    );
};

export { AsideBox };
