'use client';

import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import type { Dict, Lang } from '@/utils/dictionaries';
import { isLang } from '@/utils/dictionaries';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';

interface LanguageModalProps {
  dict: Dict;
}

const LanguageModal = ({ dict }: LanguageModalProps) => {
  const router = useRouter();

  const [language, setLanguage] = useState<Lang>('en');

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isLang(event.target.value)) {
      setLanguage(event.target.value);
    }
  };

  const handleSaveLanguage = () => {
    setCookie('language', language);
    router.replace(`/${language}/`);
    router.refresh();
  };

  return (
    <Dialog open={true} maxWidth={'lg'}>
      <DialogTitle>{dict.languageSelection.chooseLanguage}</DialogTitle>
      <DialogContent>
        <RadioGroup
          aria-label="language"
          name="language"
          value={language}
          onChange={handleLanguageChange}
        >
          <FormControlLabel value="en" control={<Radio />} label="English" />
          <Divider />
          <FormControlLabel value="fr" control={<Radio />} label="Français" />
          <Divider />
          <FormControlLabel
            value="rw"
            control={<Radio />}
            label="Kinyarwanda"
          />
          <Divider />
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSaveLanguage} color="primary">
          {dict.confirm}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LanguageModal;
