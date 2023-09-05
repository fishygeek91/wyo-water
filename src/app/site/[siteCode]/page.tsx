"use client";
import { useState, useEffect, useContext } from "react";
import USGSDataContext from "@/state/contexts/usgsContext";
import { useParams } from "next/navigation";
import SitePageComponent from "@/components/sitepage";

import { Card, Title, LineChart } from "@tremor/react";
import { InstantaneousValueMap, Value } from "wy-water/lib/types";

const SitePage: React.FC = () => {
  const { sites, siteDetail, fetchSiteDetail } = useContext(USGSDataContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const params = useParams();
  const siteCode: string = params.siteCode as string;
  const selectedSite = sites[siteCode];

  //   if (!selectedSite?.siteCode) {
  //     setSelectedSite(sites[siteCode]);
  //   }
  //console.log(params);

  let data: Array<{ datetime: string; streamflow: number | null | undefined }> = [];

  useEffect(() => {
    // if (!selectedSite?.siteCode && sites[siteCode]) {
    //   setSelectedSite(sites[siteCode]);
    // }

    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        await fetchSiteDetail(siteCode);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    // console.log(siteCode);
    // console.log(siteDetail);
    //console.log(siteDetail[selectedSite.siteCode]?.siteName);

    if (siteCode && !siteDetail?.[siteCode]) {
      fetchDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteCode, siteDetail]);

  const formatDate = (datetime: string): string => {
    const dateObj = new Date(datetime);

    return dateObj.toLocaleString("en-US", {
      month: "numeric",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  console.log(siteDetail);
  if (siteDetail?.[siteCode]) {
    const entries: InstantaneousValueMap = siteDetail[siteCode].instantaneousValues;
    // create a new list of objects from an InstantaneousValueMap with the following format:[{Datetime: dateTime, "Streamflow": metrics.Streamflow}]
    data = Object.entries(entries).map(([dateTime, metrics]) => ({
      datetime: formatDate(dateTime),
      streamflow: metrics.streamflow?.value,
    }));
  }

  return (
    <div>
      <Card>
        <Title>Streamflow</Title>
        <LineChart
          data={data}
          index='datetime'
          categories={["streamflow"]}
          colors={["emerald"]}
          startEndOnly={true}
          minValue={50}
          maxValue={150}
        />
      </Card>

      <SitePageComponent
        selectedSite={selectedSite}
        siteDetail={siteDetail}
        siteCode={siteCode}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default SitePage;
