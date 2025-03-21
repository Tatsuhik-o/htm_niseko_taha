interface Amenities {
  aircon: boolean;
  appletv: boolean;
  btspeakers: boolean;
  cardkey: boolean;
  chromecast: boolean;
  fireplace: boolean;
  hdtv: boolean;
  jacuzzi: boolean;
  nespresso: boolean;
}

export interface Property {
  id: number;
  propertyTypeId: number;
  propertyType: boolean;
  name: string;
  description: string;
  code: string;
  baseRoom: string;
  gradeId: number;
  gradeSort: number;
  locationId: number;
  accomTypeId: number;
  viewId: number;
  kitchenId: number;
  liftDistanceId: number;
  villageCentreDistanceId: number;
  bathrooms: number;
  standardPax: number;
  maximumPax: number;
  soldSeparately: boolean;
  upgradedFacilities: boolean;
  amenities: Amenities;
  bedConfigurations: number[];
  status: string;
  floorArea: number;
  online: boolean;
  images: string[];
}

export type PropertyList = Property[];

export type TContext = {
  mobileView: boolean;
  setMobileView: React.Dispatch<React.SetStateAction<boolean>>;
  allBookings: PropertyList;
  setAllBookings: React.Dispatch<React.SetStateAction<PropertyList>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
