import { useMemo, useState } from 'react';

import { InputBox } from '@chlee526/ui-kit-react';
import { Controller } from 'react-hook-form';

import { formStyle } from './LoginForm.style';
import { useLogin } from '../hook/useAuth';

import { Box, Button, CircularProgress, Dialog, DialogTitle, DialogActions } from '@mui/material';

const LoginForm = () => {
    const { loginMutation, openDialog, setOpenDialog, handleConfirm, control, handleSubmit, isValid, isDirty } = useLogin();
    const [isOnChange, setIsOnChange] = useState({ id: false, pw: false });

    const onSubmit = () => {
        loginMutation.mutate();
    };

    const isFormValid = useMemo(() => isValid && isDirty, [isValid, isDirty]);

    return (
        <>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} css={formStyle}>
                <Controller
                    name="id"
                    control={control}
                    rules={{
                        required: '아이디를 입력해주세요',
                    }}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <div className="inputWrap">
                            <InputBox
                                aria-hidden={false}
                                autoFocus={false}
                                label="ID"
                                type="text"
                                required
                                className="input"
                                error={!!error}
                                errorMessage={isOnChange.id && error ? error.message : ''}
                                value={[value, onChange]}
                                onChange={() => setIsOnChange(prev => ({ ...prev, id: true }))}
                            />
                        </div>
                    )}
                />
                <Controller
                    name="pw"
                    control={control}
                    rules={{
                        required: '비밀번호를 입력해주세요',
                        minLength: { value: 4, message: '비밀번호는 최소 4자리 이상이어야 합니다' },
                    }}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <div className="inputWrap">
                            <InputBox
                                aria-hidden={false}
                                autoFocus={false}
                                label="PW"
                                type="password"
                                required
                                className="input"
                                error={!!error}
                                errorMessage={isOnChange.pw && error ? error.message : ''}
                                value={[value, onChange]}
                                onChange={() => setIsOnChange(prev => ({ ...prev, pw: true }))}
                            />
                        </div>
                    )}
                />

                <div className="btnWrap">
                    <Button
                        className="loginBtn"
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loginMutation.isPending || !isFormValid}
                    >
                        LOGIN
                    </Button>
                    {loginMutation.isPending && <CircularProgress className="loader" size={24} />}
                </div>
            </Box>

            <Dialog disableRestoreFocus open={openDialog}>
                <DialogTitle id="alert-dialog-title">
                    동일 아이디 사용자가 존재합니다.
                    <br />
                    기존 사용자를 강제 로그아웃 후 로그인하시겠습니까?
                </DialogTitle>

                <DialogActions>
                    <Button
                        onClick={() => {
                            setOpenDialog(false);
                        }}
                    >
                        취소
                    </Button>
                    <Button autoFocus onClick={handleConfirm}>
                        확인
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export { LoginForm };
