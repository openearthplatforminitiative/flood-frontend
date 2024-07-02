'use client';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { Dict, Lang } from '@/app/[lang]/dictionaries';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';

interface LanguageDropdownProps {
  dict: Dict;
  lang: Lang;
}

const LanguageDropdown = ({ dict, lang }: LanguageDropdownProps) => {
  const router = useRouter();

  const handleChange = (event: SelectChangeEvent) => {
    const nextLanguage = event.target.value;
    setCookie('language', nextLanguage);
    router.push(`/${nextLanguage}/settings`);
    router.refresh();
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="language-select">
        {dict.settings.selectedLanguage}
      </InputLabel>
      <Select
        labelId="language-select"
        value={lang}
        label={dict.settings.selectedLanguage}
        onChange={handleChange}
      >
        <MenuItem value={'en'}>English</MenuItem>
        <MenuItem value={'fr'}>Français</MenuItem>
        <MenuItem value={'kw'}>Kinyarwanda</MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageDropdown;
