import { Dispatch, SetStateAction } from 'react';

import { SiteGrpResponseType } from '@/entity/site';
import { Loader } from '@/shared/ui';

import { useGrpMdfy } from '../hook/useStie';

import {
    Button,
    css,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';

const style = css`
    > * {
    }
`;

interface OnwProps {
    mdfyItemState: [
        SiteGrpResponseType | null,
        Dispatch<SetStateAction<SiteGrpResponseType | null>>,
    ];
}

const MdfyGrpDialog = ({ mdfyItemState }: OnwProps) => {
    const { mdfyItem, isLoading, isOpen, handleDelete, handleMdfy, handleClose } =
        useGrpMdfy(mdfyItemState);

    return (
        <div css={style}>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleMdfy,
                }}
            >
                <DialogTitle>그룹 수정</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="channel"
                        name="channel"
                        label="그룹명"
                        defaultValue={mdfyItem?.channel || ''}
                        // value={mdfyItem?.channel || ''}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        size="small"
                        color="error"
                        onClick={handleDelete}
                        sx={{ marginRight: 'auto' }}
                    >
                        삭제
                    </Button>
                    <Button variant="outlined" size="small" onClick={handleClose}>
                        취소
                    </Button>
                    <Button variant="contained" size="small" type="submit">
                        수정
                    </Button>
                </DialogActions>
                <Loader open={isLoading} />
            </Dialog>
        </div>
    );
};

export { MdfyGrpDialog };
