import { LngLat } from 'maplibre-gl';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
} from 'react';
import { fetchSites, SiteWithFloodData } from './SitesAction';
import { useParams } from 'next/navigation';

interface SitesMapContextType {
  sites: SiteWithFloodData[];
  refetchSites: () => void;
  mapStyle: 'streets' | 'hybrid';
  setMapStyle: (style: 'streets' | 'hybrid') => void;
  newSiteLngLat?: LngLat;
  setNewSiteLngLat: (lngLat?: LngLat) => void;
  newSiteRadius?: number;
  setNewSiteRadius: (radius?: number) => void;
  currentSite: SiteWithFloodData | undefined;
  defaultCoordinates?: LngLat;
  setDefaultCoordinates: (coordinates?: LngLat) => void;
  defaultZoom?: number;
  setDefaultZoom: (zoom?: number) => void;
}

const SitesMapContext = createContext<SitesMapContextType | undefined>(
  undefined
);

export const SitesMapProvider = ({ children }: { children: ReactNode }) => {
  const params = useParams();

  const [mapStyle, setMapStyle] = useState<'streets' | 'hybrid'>('streets');
  const [newSiteLngLat, setNewSiteLngLat] = useState<LngLat | undefined>();
  const [newSiteRadius, setNewSiteRadius] = useState<number | undefined>();
  const [sites, setSites] = useState<SiteWithFloodData[]>([]);
  const [defaultCoordinates, setDefaultCoordinates] = useState<
    LngLat | undefined
  >();
  const [defaultZoom, setDefaultZoom] = useState<number | undefined>();

  const currentSite = useMemo(() => {
    if (params.siteId) {
      return sites.find((site) => site.id === params.siteId);
    }
    return undefined;
  }, [params.siteId, sites]);

  const getSites = async () => {
    const sites = await fetchSites();
    if (sites) {
      setSites(sites);
    }
  };

  useEffect(() => {
    getSites();
  }, []);

  return (
    <SitesMapContext.Provider
      value={{
        sites,
        refetchSites: getSites,
        mapStyle,
        setMapStyle,
        newSiteLngLat,
        setNewSiteLngLat,
        newSiteRadius,
        setNewSiteRadius,
        currentSite,
        defaultCoordinates,
        setDefaultCoordinates,
        defaultZoom,
        setDefaultZoom,
      }}
    >
      {children}
    </SitesMapContext.Provider>
  );
};

export const useSitesMap = () => {
  const context = useContext(SitesMapContext);
  if (context === undefined) {
    throw new Error('useSitesMap must be used within a SitesMapProvider');
  }
  return context;
};
