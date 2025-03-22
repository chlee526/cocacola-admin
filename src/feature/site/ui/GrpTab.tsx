import { useState } from 'react';

import { SiteGrpResponseType } from '@/entity/site';
import { Loader } from '@/shared/ui';

import { AddGrpDialog } from './AddGrpDialog';
import { MdfyGrpDialog } from './MdfyGrpDialog';
import { useGrpTab } from '../hook/useStie';

import { ToggleButtonGroup, ToggleButton, css } from '@mui/material';

const style = css`
    display: flex;
    height: 100%;
    flex-direction: column;
    position: relative;

    > * {
    }
`;
const GrpTab = () => {
    const { isLoading, grpData, grpCntData, selGrp, handleItemSelect } = useGrpTab();
    const [mdfyItem, setMdfyItem] = useState<SiteGrpResponseType | null>(null);

    const handleMdfy = (item: SiteGrpResponseType) => {
        setMdfyItem(item);
    };

    return (
        <div className="grp" css={style}>
            <ToggleButtonGroup
                orientation="vertical"
                color="primary"
                value={selGrp}
                exclusive
                aria-label="Platform"
                fullWidth
                sx={{
                    height: 'calc(100% - 4em)',
                    overflow: 'auto',
                }}
            >
                {grpData.length > 1 &&
                    grpData?.map(item => (
                        <ToggleButton
                            key={item.seq}
                            value={item.seq}
                            onClick={handleItemSelect}
                            onDoubleClick={() => {
                                handleMdfy(item);
                            }}
                        >
                            {item.channel}
                            {grpCntData && (
                                <span className="cnt">
                                    ({(item.seq ? grpCntData[item.seq] : grpCntData.total) || 0})
                                </span>
                            )}
                        </ToggleButton>
                    ))}
            </ToggleButtonGroup>

            <AddGrpDialog />
            <MdfyGrpDialog mdfyItemState={[mdfyItem, setMdfyItem]} />
            <Loader open={isLoading} />
        </div>
    );
};

export { GrpTab };
