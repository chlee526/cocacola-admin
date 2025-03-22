import { Loader } from '@/shared/ui';

import { useGrpAdd } from '../hook/useStie';

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
    margin-top: auto;

    > * {
    }
`;

const AddGrpDialog = () => {
    const { isLoading, isOpen, addGrp, handleOn, handleClose } = useGrpAdd();

    return (
        <div css={style}>
            <Button type="button" variant="contained" fullWidth onClick={handleOn}>
                버튼
            </Button>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: addGrp,
                }}
            >
                <DialogTitle>그룹 추가</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="channel"
                        name="channel"
                        label="그룹명"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" size="small" onClick={handleClose}>
                        취소
                    </Button>
                    <Button variant="contained" size="small" type="submit">
                        추가
                    </Button>
                </DialogActions>
                <Loader open={isLoading} />
            </Dialog>
        </div>
    );
};

export { AddGrpDialog };
