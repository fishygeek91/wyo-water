"use client";
import React, { useState, useEffect } from "react";
import USGSDataContext from "../contexts/usgsContext";
import { getSites, getSite } from "@/services/usgsService";
import { CurrentValuesMap } from "wy-water/lib/types";

interface USGSDataProviderProps {
  children: React.ReactNode;
}

const USGSDataProvider: React.FC<USGSDataProviderProps> = ({ children }) => {
  const [sites, setSites] = useState<CurrentValuesMap>({});
  const [siteDetail, setSiteDetail] = useState<any | null>(null); // Replace 'any' with your specific data type
  const [selectedSiteCode, setSelectedSiteCode] = useState<string>("");

  const fetchSiteDetail = async (siteCode: string) => {
    setSelectedSiteCode(siteCode);
    try {
      const data = await getSite(siteCode, "P7D"); // Replace 'somePeriod' with the desired period
      setSiteDetail(data);
    } catch (error) {
      console.error("Failed to fetch site detail:", error);
    }
  };

  useEffect(() => {
    if (Object.keys(sites).length === 0) {
      // checks if sites object is empty
      getSites()
        .then((fetchedSites) => {
          if (fetchedSites instanceof Error) {
            console.error("Error fetching sites:", fetchedSites.message);
            return;
          }
          setSites(fetchedSites);
        })
        .catch((error) => {
          console.error("Error during the fetch:", error);
        });
    }
  }, [sites]);

  return (
    <USGSDataContext.Provider
      value={{
        sites,
        siteDetail,
        setSites,
        setSiteDetail,
        fetchSiteDetail,
        selectedSiteCode,
        setSelectedSiteCode,
      }}
    >
      {children}
    </USGSDataContext.Provider>
  );
};

export default USGSDataProvider;
