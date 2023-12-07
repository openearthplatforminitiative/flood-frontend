'use client';

import React, { useState } from 'react';
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
import { cropTypes, Dict, liveStocks } from '@/app/[lang]/dictionaries';
import { SiteData } from '@/app/components/onboarding/OnboardingDashboard';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface DropdownProps {
  dict: Dict;
  siteValues: SiteData;
  setSiteValues: (value: SiteData) => void;
  errorString: string;
}

const MultipleTypeSelect = ({
  dict,
  siteValues,
  setSiteValues,
  errorString,
}: DropdownProps) => {
  const [cropMenuOpen, setCropMenuOpen] = useState<boolean>(false);
  const [livestockMenuOpen, setLivestockMenuOpen] = useState<boolean>(false);

  const handleMenuItemClick = (menuItem: string) => {
    const checked = siteValues.types.includes(menuItem);

    if (checked) {
      // If the checkbox is checked, remove the value from the types array
      setSiteValues({
        ...siteValues,
        types: siteValues.types.filter((item) => item !== menuItem),
      });
    } else {
      // If the checkbox is unchecked, add the value to the types array
      setSiteValues({ ...siteValues, types: [...siteValues.types, menuItem] });
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
      <InputLabel id="select-site-type">
        {dict.onBoarding.sites.siteType}
      </InputLabel>
      <Select
        labelId="select-site-type"
        value={siteValues.types}
        multiple
        renderValue={(value) => (value as string[]).join(', ')}
        error={Boolean(errorString)}
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
            {cropTypes.map((crop) => {
              const cropName = dict.onBoarding.sites.cropTypes[crop];
              return (
                <MenuItem key={crop} value={crop}>
                  <FormControlLabel
                    sx={{ width: '100%' }}
                    onChange={() => handleMenuItemClick(cropName)}
                    control={
                      <Checkbox
                        checked={siteValues.types.includes(cropName)}
                        value={cropName}
                      />
                    }
                    label={cropName}
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
            {liveStocks.map((liveStock) => {
              const liveStockName = dict.onBoarding.sites.liveStocks[liveStock];
              return (
                <MenuItem key={liveStock} value={liveStock}>
                  <FormControlLabel
                    sx={{ width: '100%' }}
                    onChange={() => handleMenuItemClick(liveStockName)}
                    control={
                      <Checkbox
                        checked={siteValues.types.includes(liveStockName)}
                        value={liveStockName}
                      />
                    }
                    label={liveStockName}
                  />
                </MenuItem>
              );
            })}
          </List>
        </Collapse>
        <Divider />
        <MenuItem value="Storage">
          <FormControlLabel
            sx={{ width: '100%' }}
            onChange={() => handleMenuItemClick('Storage')}
            control={
              <Checkbox
                checked={siteValues.types.includes('Storage')}
                value="Storage"
              />
            }
            label={dict.onBoarding.sites.storageType}
          />
        </MenuItem>
        <MenuItem value="Residential">
          <FormControlLabel
            sx={{ width: '100%' }}
            onChange={() => handleMenuItemClick('Residential')}
            control={
              <Checkbox
                checked={siteValues.types.includes('Residential')}
                value="Residential"
              />
            }
            label={dict.onBoarding.sites.residentialType}
          />
        </MenuItem>
        <MenuItem value="Industrial">
          <FormControlLabel
            sx={{ width: '100%' }}
            onChange={() => handleMenuItemClick('Industrial')}
            control={
              <Checkbox
                checked={siteValues.types.includes('Industrial')}
                value="Industrial"
              />
            }
            label={dict.onBoarding.sites.industrialType}
          />
        </MenuItem>
        <Divider />
        <MenuItem value="Other">
          <FormControlLabel
            sx={{ width: '100%' }}
            onChange={() => handleMenuItemClick('Other')}
            control={
              <Checkbox
                checked={siteValues.types.includes('Other')}
                value="Other"
              />
            }
            label={dict.onBoarding.sites.otherType}
          />
        </MenuItem>
      </Select>
      <FormHelperText error>{errorString}</FormHelperText>
    </FormControl>
  );
};

export default MultipleTypeSelect;
