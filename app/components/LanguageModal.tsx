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

interface LanguageModalProps {
  dict: Dict;
  open: boolean;
  onClose: () => void;
  changeLanguage: (newLanguage: string) => void;
}

const LanguageModal = ({
  dict,
  open,
  changeLanguage,
  onClose,
}: LanguageModalProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLanguage(event.target.value);
  };

  const handleSaveLanguage = () => {
    changeLanguage(selectedLanguage);
    onClose();
  };

  return (
    <Dialog open={open} onClose={() => {}} maxWidth={'lg'}>
      <DialogTitle>{dict['chooseLanguage']}</DialogTitle>
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
          {dict['confirm']}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LanguageModal;
