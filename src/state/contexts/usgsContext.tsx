import { createContext } from "react";
import { CurrentValuesMap, InstantaneousValuesMap } from "wy-water/lib/types";

interface USGSDataState {
  sites: CurrentValuesMap;
  siteDetail: InstantaneousValuesMap; // Consider replacing with the specific type for site details
  selectedSiteCode: string;
  setSelectedSiteCode: React.Dispatch<React.SetStateAction<string>>;
  setSites: React.Dispatch<React.SetStateAction<CurrentValuesMap>>;
  setSiteDetail: React.Dispatch<React.SetStateAction<any>>; // Update 'any' accordingly
  fetchSiteDetail: (siteCode: string) => void;
}

const initialState: USGSDataState = {
  sites: {},
  siteDetail: {},
  selectedSiteCode: "",
  setSelectedSiteCode: () => {},
  setSites: () => {},
  setSiteDetail: () => {},
  fetchSiteDetail: () => {},
};

const USGSDataContext = createContext<USGSDataState>(initialState);

export default USGSDataContext;
