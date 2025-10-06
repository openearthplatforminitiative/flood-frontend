import { atom } from 'jotai';
import { LngLat } from 'maplibre-gl';

export const mapStyleAtom = atom<'streets' | 'hybrid'>('streets');

export const activeLngLatAtom = atom<LngLat>();

export const defaultCoordinatesAtom = atom<LngLat>();

export const defaultZoomAtom = atom<number>();

export const newSiteRadiusAtom = atom<number>();
