'use client';
import React, { useEffect, useState } from 'react';
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
  open: boolean;
  onClose: () => void;
  onLanguageChange: (newLanguage: string) => void;
}

const LanguageModal = ({
  open,
  onLanguageChange,
  onClose,
}: LanguageModalProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLanguage(event.target.value);
  };

  const handleSaveLanguage = () => {
    onLanguageChange(selectedLanguage);
    onClose();
  };

  useEffect(() => {
    console.log('Selected language: ', selectedLanguage);
  }, [selectedLanguage]);

  return (
    <Dialog open={open} onClose={() => {}} maxWidth={'lg'}>
      <DialogTitle>Choose Language</DialogTitle>
      <DialogContent>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="language"
            name="language"
            value={selectedLanguage}
            onChange={handleLanguageChange}
          >
            <FormControlLabel
              value="en-US"
              control={<Radio />}
              label="English"
            />
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
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LanguageModal;
