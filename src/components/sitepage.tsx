import { CurrentValue, InstantaneousValuesMap } from "wy-water/lib/types";

type SitePageProps = {
  selectedSite: CurrentValue | null;
  siteDetail: InstantaneousValuesMap;
  siteCode: string;
  isLoading: boolean;
  error: Error | null;
};

const selectedSiteDisplay = (selectedSite: CurrentValue) => {
  return (
    <div className='max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl'>
      <div className='md:flex'>
        <div className='md:flex-shrink-0'>
          {/* You can insert an image here if you have one */}
          {/* <img className="h-48 w-full object-cover md:w-48" src="/path_to_image.jpg" alt="Site Image" /> */}
        </div>
        <div className='p-8'>
          <h2 className='text-gray-600 mb-4'>{selectedSite.siteName}</h2>
          <p className='text-gray-600 mb-4'>Site Code: {selectedSite.siteCode}</p>

          <p className='text-gray-600 mb-4'>
            Temperature: {selectedSite.currentTemp ? selectedSite.currentTemp.value : "N/A"}{" "}
          </p>

          <p className='text-gray-600 mb-4'>
            Flow: {selectedSite.currentFlow ? selectedSite.currentFlow.value : "N/A"}{" "}
          </p>

          <p className='text-gray-600 mb-4'>
            Gage Height:{" "}
            {selectedSite.currentGageHeight ? selectedSite.currentGageHeight.value : "N/A"}
          </p>

          <p className='text-gray-600 mb-4'>
            Dissolved Oxygen:{" "}
            {selectedSite.currentDissolvedOxygen
              ? selectedSite.currentDissolvedOxygen.value
              : "N/A"}{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

const SitePageComponent: React.FC<SitePageProps> = ({
  selectedSite,
  siteDetail,
  siteCode,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!selectedSite) {
    return <div>No details available.</div>;
  }

  return <div>{selectedSiteDisplay(selectedSite)}</div>;
};

export default SitePageComponent;
