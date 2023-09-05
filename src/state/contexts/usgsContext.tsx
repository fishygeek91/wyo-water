import { createContext } from "react";
import { CurrentValue, CurrentValuesMap, InstantaneousValuesMap } from "wy-water/lib/types";

interface USGSDataState {
  sites: CurrentValuesMap;
  siteDetail: InstantaneousValuesMap; // Consider replacing with the specific type for site details
  //selectedSite: CurrentValue | null;
  //setSelectedSite: React.Dispatch<React.SetStateAction<CurrentValue | null>>;
  setSites: React.Dispatch<React.SetStateAction<CurrentValuesMap>>;
  setSiteDetail: React.Dispatch<React.SetStateAction<any>>; // Update 'any' accordingly
  fetchSiteDetail: (siteCode: string) => void;
}

const initialState: USGSDataState = {
  sites: {},
  siteDetail: {},
  //selectedSite: null,
  //setSelectedSite: () => {},
  setSites: () => {},
  setSiteDetail: () => {},
  fetchSiteDetail: () => {},
};

const USGSDataContext = createContext<USGSDataState>(initialState);

export default USGSDataContext;
