'use client';

import {
  Modal, 
  Typography
} from '@mui/material';

import { Dict, getDictonaryWithDefault } from '@/app/[lang]/dictionaries';

type NotificationProps = {
    lang: string;
    open: boolean;
    handleClose: () => void;
};

export const NotificationModal = ({lang, open, handleClose}: NotificationProps) => {

    const dict: Dict = getDictonaryWithDefault(lang);

    return(
        <Modal open={open} onClose={handleClose}>
            <div>
            <Typography variant="h4">Allow Notifications</Typography>
            </div>
        </Modal>
    )
}