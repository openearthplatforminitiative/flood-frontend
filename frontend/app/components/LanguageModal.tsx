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
import type { Dict, Lang } from '@/app/[lang]/dictionaries';
import { isLang } from '@/app/[lang]/dictionaries';

interface LanguageModalProps {
  dict: Dict;
  open: boolean;
  onClose: () => void;
  changeLanguage: (lang: Lang) => void;
}

const LanguageModal = ({
  dict,
  open,
  changeLanguage,
  onClose,
}: LanguageModalProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Lang>('en');

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isLang(event.target.value)) {
      setSelectedLanguage(event.target.value);
    }
  };

  const handleSaveLanguage = () => {
    changeLanguage(selectedLanguage);
    onClose();
  };

  return (
    <Dialog open={open} onClose={() => {}} maxWidth={'lg'}>
      <DialogTitle>{dict.languageSelection.chooseLanguage}</DialogTitle>
      <DialogContent>
        <RadioGroup
          aria-label="language"
          name="language"
          value={selectedLanguage}
          onChange={handleLanguageChange}
        >
          <FormControlLabel value="en" control={<Radio />} label="English" />
          <Divider />
          <FormControlLabel value="fr" control={<Radio />} label="French" />
          <Divider />
          <FormControlLabel
            value="kw"
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
