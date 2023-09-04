import { getWyomingSites, getInstantaneousRiverMetrics } from "wy-water";
import { CurrentValuesMap, InstantaneousValuesMap } from "wy-water/lib/types";

export const getSites = async (): Promise<CurrentValuesMap | Error> => {
    try {
        const sites = await getWyomingSites();
        // trim whitespace from site names
        Object.keys(sites).forEach((key) => {
            sites[key].siteName = sites[key].siteName.trimStart();
        });
        return sites;
    } catch (error) {
        return new Error("Failed to fetch sites.");
    }
}

export const getSite = async (siteCode: string, period: string): Promise<InstantaneousValuesMap | Error> => {
    try {
        const site = await getInstantaneousRiverMetrics(siteCode, period);

        return site;
    } catch (error) {
        return new Error("Failed to fetch sites.");
    }
}