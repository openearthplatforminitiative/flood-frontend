'use client';

import React, { useState } from 'react';
import {
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
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

  const handleMenuItemClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as string;
    const checked = siteValues.types.includes(value);

    if (checked) {
      // If the checkbox is checked, remove the value from the types array
      setSiteValues({
        ...siteValues,
        types: siteValues.types.filter((item) => item !== value),
      });
    } else {
      // If the checkbox is unchecked, add the value to the types array
      setSiteValues({ ...siteValues, types: [...siteValues.types, value] });
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
      <InputLabel id="select-crops">
        {dict.onBoarding.sites.cropType}
      </InputLabel>
      <Select
        labelId="select-crops"
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
      >
        <ListItem sx={{ width: '100%' }}>
          <List component="div" disablePadding>
            <ListItemButton
              onClick={handleCropMenuOpen}
              sx={{ justifyContent: 'space-between' }}
            >
              Crops and produce
              {cropMenuOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={cropMenuOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {cropTypes.map((crop) => {
                  const cropName = dict.onBoarding.sites.cropTypes[crop];
                  return (
                    <MenuItem key={crop} value={crop}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={handleMenuItemClick}
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
          </List>
        </ListItem>
        <ListItem sx={{ width: '100%' }}>
          <List component="div" disablePadding>
            <ListItemButton
              onClick={handleLivestockMenuOpen}
              sx={{ justifyContent: 'space-between' }}
            >
              Livestock
              {livestockMenuOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={livestockMenuOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {liveStocks.map((liveStock) => {
                  const cropName = dict.onBoarding.sites.liveStocks[liveStock];
                  return (
                    <MenuItem key={liveStock} value={liveStock}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={handleMenuItemClick}
                            checked={siteValues.types.includes(liveStock)}
                            value={liveStock}
                          />
                        }
                        label={liveStock}
                      />
                    </MenuItem>
                  );
                })}
              </List>
            </Collapse>
          </List>
        </ListItem>

        <MenuItem value="Storage">
          <FormControlLabel
            control={
              <Checkbox
                checked={siteValues.types.includes('Storage')}
                onChange={handleMenuItemClick}
                value="Storage"
              />
            }
            label="Storage"
          />
        </MenuItem>
        <MenuItem value="Residential">
          <FormControlLabel
            control={
              <Checkbox
                checked={siteValues.types.includes('Residential')}
                onChange={handleMenuItemClick}
                value="Residential"
              />
            }
            label="Residential"
          />
        </MenuItem>
        <MenuItem value="Industrial">
          <FormControlLabel
            control={
              <Checkbox
                checked={siteValues.types.includes('Industrial')}
                onChange={handleMenuItemClick}
                value="Industrial"
              />
            }
            label="Industrial"
          />
        </MenuItem>
      </Select>
      <FormHelperText error>{errorString}</FormHelperText>
    </FormControl>
  );
};

export default MultipleTypeSelect;
