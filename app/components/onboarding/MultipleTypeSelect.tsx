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
        {dict.onBoarding.sites.siteType}
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
          <List component="div" disablePadding sx={{ width: '100%' }}>
            <ListItemButton
              onClick={handleCropMenuOpen}
              sx={{ justifyContent: 'space-between' }}
            >
              {dict.onBoarding.sites.cropsType}
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
          <List component="div" disablePadding sx={{ width: '100%' }}>
            <ListItemButton
              onClick={handleLivestockMenuOpen}
              sx={{ justifyContent: 'space-between' }}
            >
              {dict.onBoarding.sites.livestockType}
              {livestockMenuOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={livestockMenuOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {liveStocks.map((liveStock) => {
                  const liveStockName =
                    dict.onBoarding.sites.liveStocks[liveStock];
                  return (
                    <MenuItem key={liveStock} value={liveStock}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={handleMenuItemClick}
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
          </List>
        </ListItem>
        <Divider />
        <MenuItem value="Storage">
          <FormControlLabel
            control={
              <Checkbox
                checked={siteValues.types.includes('Storage')}
                onChange={handleMenuItemClick}
                value="Storage"
              />
            }
            label={dict.onBoarding.sites.storageType}
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
            label={dict.onBoarding.sites.residentialType}
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
            label={dict.onBoarding.sites.industrialType}
          />
        </MenuItem>
        <Divider />
        <MenuItem value="Other">
          <FormControlLabel
            control={
              <Checkbox
                checked={siteValues.types.includes('Other')}
                onChange={handleMenuItemClick}
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
