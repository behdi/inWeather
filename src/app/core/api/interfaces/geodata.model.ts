export interface GeoData {
  /**
   * Name of the found location.
   */
  name: string;

  /**
   * Object containing name of the found location in different languages.
   */
  local_names?: Record<string, string>;

  /**
   * Latitude of the found location.
   */
  lat: number;

  /**
   * Longitude of the found location.
   */
  lon: number;

  /**
   * Country code of the found location.
   */
  country: string;

  /**
   * State name of the found location.
   */
  state?: string;
}
