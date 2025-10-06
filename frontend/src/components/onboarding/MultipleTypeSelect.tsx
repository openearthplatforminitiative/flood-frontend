'use client';

import { useState } from 'react';
import {
  Checkbox,
  Collapse,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  List,
  MenuItem,
  Select,
} from '@mui/material';
import {
  Dict,
  cropTypes,
  livestockTypes,
  propertyTypes,
} from '@/utils/dictionaries';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { typesRenderer } from '@/lib/render-utils';

interface DropdownProps {
  dict: Dict;
  value: string[];
  onChange: (value: string[]) => void;
  error: string;
}

const MultipleTypeSelect = ({
  dict,
  value,
  onChange,
  error,
}: DropdownProps) => {
  const [cropMenuOpen, setCropMenuOpen] = useState<boolean>(false);
  const [livestockMenuOpen, setLivestockMenuOpen] = useState<boolean>(false);

  const handleMenuItemClick = (menuItem: string) => {
    const checked = value.includes(menuItem);
    if (checked) {
      // If the checkbox is checked, remove the value from the types array
      onChange(value.filter((item) => item !== menuItem));
    } else {
      // If the checkbox is unchecked, add the value to the types array
      onChange([...value, menuItem]);
    }
  };

  const handleCropMenuOpen = () => {
    setCropMenuOpen(!cropMenuOpen);
  };

  const handleLivestockMenuOpen = () => {
    setLivestockMenuOpen(!livestockMenuOpen);
  };

  return (
    <FormControl variant="filled" sx={{ marginTop: '16px', width: '100%' }}>
      <InputLabel id="select-site-type">{dict.sites.typeOfSite}</InputLabel>
      <Select
        labelId="select-site-type"
        value={value}
        multiple
        renderValue={(values) => typesRenderer(values, dict)}
        error={!!error}
        label={dict.onBoarding.sites.type}
        sx={{
          background: 'white',
          width: '100%',
          '&:hover': {
            backgroundColor: 'white',
          },
          '&.Mui-focused': {
            backgroundColor: 'white',
          },
          '& .MuiSelect-select.MuiInputBase-input.MuiFilledInput-input:focus': {
            backgroundColor: 'white',
          },
        }}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 400,
              width: 250,
            },
            autoFocus: false,
          },
        }}
      >
        <MenuItem
          sx={{
            width: '100%',
            justifyContent: 'space-between',
            padding: '15px',
          }}
          onClick={handleCropMenuOpen}
        >
          {dict.onBoarding.sites.cropsType}
          {cropMenuOpen ? <ExpandLess /> : <ExpandMore />}
        </MenuItem>
        <Collapse in={cropMenuOpen} timeout="auto" unmountOnExit>
          <List>
            {cropTypes.map((cropType) => {
              const cropTypeName = dict.onBoarding.sites.siteTypes[cropType];
              return (
                <MenuItem key={cropType} value={cropType}>
                  <FormControlLabel
                    sx={{ width: '100%' }}
                    onChange={() => handleMenuItemClick(cropType)}
                    control={
                      <Checkbox
                        checked={value.includes(cropType)}
                        value={cropType}
                      />
                    }
                    label={cropTypeName}
                  />
                </MenuItem>
              );
            })}
          </List>
        </Collapse>
        <MenuItem
          sx={{
            width: '100%',
            justifyContent: 'space-between',
            padding: '15px',
          }}
          onClick={handleLivestockMenuOpen}
        >
          {dict.onBoarding.sites.livestockType}
          {livestockMenuOpen ? <ExpandLess /> : <ExpandMore />}
        </MenuItem>
        <Collapse in={livestockMenuOpen} timeout="auto" unmountOnExit>
          <List>
            {livestockTypes.map((livestock) => {
              const livestockName = dict.onBoarding.sites.siteTypes[livestock];
              return (
                <MenuItem key={livestock} value={livestock}>
                  <FormControlLabel
                    sx={{ width: '100%' }}
                    onChange={() => handleMenuItemClick(livestock)}
                    control={
                      <Checkbox
                        checked={value.includes(livestock)}
                        value={livestock}
                      />
                    }
                    label={livestockName}
                  />
                </MenuItem>
              );
            })}
          </List>
        </Collapse>
        <Divider />
        {propertyTypes.map((propertyType) => {
          return (
            <MenuItem key={propertyType} value={propertyType}>
              <FormControlLabel
                sx={{ width: '100%' }}
                onChange={() => handleMenuItemClick(propertyType)}
                control={
                  <Checkbox
                    checked={value.includes(propertyType)}
                    value={propertyType}
                  />
                }
                label={dict.onBoarding.sites.siteTypes[propertyType]}
              />
            </MenuItem>
          );
        })}
        <Divider />
        <MenuItem value="other">
          <FormControlLabel
            sx={{ width: '100%' }}
            onChange={() => handleMenuItemClick('other')}
            control={
              <Checkbox checked={value.includes('other')} value="other" />
            }
            label={dict.onBoarding.sites.otherType}
          />
        </MenuItem>
      </Select>
      <FormHelperText error>{error}</FormHelperText>
    </FormControl>
  );
};

export default MultipleTypeSelect;
