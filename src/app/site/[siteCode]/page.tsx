"use client";
import { useState, useEffect, useContext } from "react";
import USGSDataContext from "@/state/contexts/usgsContext";
import { useParams } from "next/navigation";

const SitePage: React.FC = () => {
  const { siteDetail, fetchSiteDetail, selectedSiteCode } = useContext(USGSDataContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const params = useParams();
  const siteCode = selectedSiteCode ? selectedSiteCode : (params.siteCode as string);
  console.log(params);

  useEffect(() => {
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

    if (siteCode && !siteDetail?.[siteCode]) {
      fetchDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteCode]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {/* Here you can render the siteDetail information as needed */}
      <h1>{siteDetail?.[selectedSiteCode]?.siteName ?? "No details available."}</h1>
      {/* Add more details as necessary */}
    </div>
  );
};

export default SitePage;
