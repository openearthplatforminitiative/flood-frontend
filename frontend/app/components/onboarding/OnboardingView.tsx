"use client";
import { useState } from "react";
import { Dict, getDictonaryWithDefault } from '@/app/[lang]/dictionaries';
import { Button } from "@mui/material";
import { Add } from '@mui/icons-material';
import { OnboardingModal } from "./OnboardingModal";

type OnboardingViewProps = {
    lang: string;
}
export const OnboardingView = ({ lang }:OnboardingViewProps) => {

    const dict: Dict = getDictonaryWithDefault(lang);

    const [open, setOpen] = useState(false)

    return(
        <>
            <Button                   
                variant={'contained'}
                sx={{ width: '50%' }}
                onClick={() => setOpen(true)}
                >Onboarding modal</Button>
            <OnboardingModal lang={lang} open={open} handleClose={() => setOpen(!open)}/>
        </>
        
    )
}