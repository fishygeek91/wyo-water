import React, { useContext, useState } from "react";
import USGSDataContext from "../state/contexts/usgsContext";
import { useRouter } from "next/navigation";
import { CurrentValue } from "wy-water/lib/types";

const Homepage: React.FC = () => {
  const router = useRouter();
  const context = useContext(USGSDataContext);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  const handleButtonClick = (site: CurrentValue) => {
    //const clonedSite = JSON.parse(JSON.stringify(site));
    //context.setSelectedSite(clonedSite);
    router.push(`/site/${site.siteCode}`);
  };

  if (!context) {
    return <div>Loading...</div>;
  }

  const { sites } = context;
  const siteArray = sites ? Object.values(sites) : [];

  // Filter the sites based on the search term
  const filteredSites = siteArray.filter((site) =>
    site.siteName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort the filtered sites alphabetically
  const sortedSites = filteredSites.sort((a, b) => {
    const aStartsWithNumber = /^\d/.test(a.siteName);
    const bStartsWithNumber = /^\d/.test(b.siteName);

    if (aStartsWithNumber && !bStartsWithNumber) {
      return 1; // a comes after b
    }

    if (!aStartsWithNumber && bStartsWithNumber) {
      return -1; // a comes before b
    }

    // If neither or both start with a number, use localeCompare
    return a.siteName.localeCompare(b.siteName);
  });

  return (
    <div className='flex flex-col items-center m-5 border-8 border-gray-400 p-4 rounded-lg justify-center'>
      <input
        type='text'
        placeholder='Search sites...'
        className='p-2 bg-white text-black border rounded m-4 shadow w-1/2'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className='flex flex-wrap justify-center mx-auto'>
        {sortedSites.map((site) => (
          <button
            key={site.siteCode}
            className='bg-blue-500 text-white px-2 py-1 rounded sm:w-1/2 md:w-1/3 lg:w-1/4 m-2'
            onClick={() => handleButtonClick(site)}
          >
            {site.siteName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
