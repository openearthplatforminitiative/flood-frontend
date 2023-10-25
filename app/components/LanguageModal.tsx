'use client';
import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { acceptedLocales } from '@/app/[lang]/dictionaries';

interface LanguageModalProps {
  dict: Dict;
  open: boolean;
  onClose: () => void;
  changeLanguage: (newLanguage: Lang) => void;
}

const LanguageModal = ({
  dict,
  open,
  changeLanguage,
  onClose,
}: LanguageModalProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Lang>('en');

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (acceptedLocales.includes(event.target.value)) {
      setSelectedLanguage(event.target.value as Lang);
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
        <FormControl component="fieldset">
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
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSaveLanguage} color="primary">
          {dict.languageSelection.confirm}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LanguageModal;
