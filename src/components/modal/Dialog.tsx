import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@mui/material';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

const DialogModal = ({ isOpen, onClose, children }: ModalProps) => {
    const [open, setOpen] = useState(isOpen);
    const handleClose = () => {
        setOpen(false);
        onClose();
    };

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <DialogContent>{children}</DialogContent>
            </Dialog>
        </div>
    );
};

export default DialogModal;
