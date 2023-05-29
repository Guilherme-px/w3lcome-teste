import { useState } from 'react';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

type SnackbarProps = {
    alertType: string;
    message: string;
};

const MessageAlert = ({ alertType, message }: SnackbarProps) => {
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    const snackbarOrigin: SnackbarOrigin = {
        vertical: 'bottom',
        horizontal: 'center',
    };

    return (
        <>
            {message ? (
                <Snackbar
                    open={open}
                    autoHideDuration={5000}
                    anchorOrigin={snackbarOrigin}
                    onClose={handleClose}
                >
                    {alertType === 'error' ? (
                        <Alert severity="error" onClose={handleClose}>
                            {message}
                        </Alert>
                    ) : (
                        <Alert severity="success" onClose={handleClose}>
                            {message}
                        </Alert>
                    )}
                </Snackbar>
            ) : (
                ''
            )}
        </>
    );
};

export default MessageAlert;