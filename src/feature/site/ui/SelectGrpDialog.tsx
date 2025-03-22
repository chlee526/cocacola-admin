import { Dispatch, SetStateAction, useMemo } from 'react';

import { SiteGrpListModel } from '@/entity/site';

import { Dialog, DialogTitle, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

interface OwnProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    setGrp: Dispatch<SetStateAction<string | null>>;
    allGrpList: SiteGrpListModel[] | null;
}

const SelectGrpDialog = ({ open = false, setOpen, setGrp, allGrpList }: OwnProps) => {
    const grpList = useMemo(() => {
        return allGrpList ? allGrpList.slice(1) : [];
    }, [allGrpList]);

    const handleItemClick = (code: string) => {
        setGrp(code);
        setOpen(false);
    };

    return (
        <div>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>이동 그룹 선택</DialogTitle>
                <List sx={{ pt: 0 }} dense>
                    {grpList.map(item => (
                        <ListItem key={item.seq} disableGutters>
                            <ListItemButton onClick={() => handleItemClick(item.seq)}>
                                <ListItemText>{item.channel}</ListItemText>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Dialog>
        </div>
    );
};

export { SelectGrpDialog };
