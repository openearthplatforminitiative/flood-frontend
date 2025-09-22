'use client';

import { Autocomplete, debounce, TextField } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import { geoCodingAction } from './map/GeoCodingActions';
import { LngLat } from 'maplibre-gl';

type LocationOption = {
  label: string;
  coordinate: [number, number];
};

type GeoAutoCompleteProps = {
  setLngLat: (lnglat: LngLat) => void;
  style?: React.CSSProperties;
  className?: string;
  fieldStyle?: React.CSSProperties;
  fieldClassName?: string;
};

export const GeoAutoComplete = ({
  setLngLat,
  ...rest
}: GeoAutoCompleteProps) => {
  const [options, setOptions] = useState<LocationOption[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const { fieldStyle, fieldClassName, ...autoProps } = rest;

  const fetchOptions = debounce(async (searchTerm, abortController) => {
    if (!searchTerm) {
      setOptions([]);
      return;
    }
    setLoading(true);
    await geoCodingAction(searchTerm, 'en').then((result) => {
      if (!abortController.signal.aborted) {
        if (result.features && result.features.length > 0) {
          setOptions(
            result.features.map((feature) => {
              let label = feature.properties.name || '';
              if (feature.properties.city) {
                label += `, ${feature.properties.city}`;
              }
              if (feature.properties.country) {
                label += `, ${feature.properties.country}`;
              }
              const coordinate = feature.geometry.coordinates as [
                number,
                number,
              ];
              return { label, coordinate };
            })
          );
        }
        setLoading(false);
      }
    });
  }, 300);

  useEffect(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const newAbortController = new AbortController();
    abortControllerRef.current = newAbortController;

    fetchOptions(searchQuery, newAbortController);

    return () => newAbortController.abort(); // Cleanup on unmount
  }, [searchQuery, fetchOptions]);

  return (
    <Autocomplete
      disablePortal
      options={options}
      loading={loading}
      onChange={(e, value) => {
        if (!value) return;
        setLngLat(new LngLat(value.coordinate[0], value.coordinate[1]));
      }}
      {...autoProps}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Location"
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="filled"
          style={fieldStyle}
          className={fieldClassName}
          sx={{
            '& .MuiFilledInput-root': {
              backgroundColor: 'white',
              '&:hover': {
                backgroundColor: 'white',
                '@media (hover: none)': {
                  backgroundColor: 'white',
                },
              },
              '&.Mui-focused': {
                backgroundColor: 'white',
              },
            },
          }}
        />
      )}
    />
  );
};
