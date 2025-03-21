export const debouncing = (
  fn: Function,
  delay: number
): Function | EventListener => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, ...args);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  };
};

export const generateRandomProperty = () => {
  const randomBool = () => Math.random() < 0.5;
  const getRandomId = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  return {
    id: getRandomId(1, 1000),
    propertyTypeId: getRandomId(200, 300),
    propertyType: randomBool(),
    name: `Property ${getRandomId(1, 100)}`,
    description: `Located just ${getRandomId(
      100,
      500
    )}m from the Hirafu Gondola, this property is perfect for a stay.`,
    code: `PR${getRandomId(10, 99)}`,
    baseRoom: "",
    gradeId: getRandomId(1, 5),
    gradeSort: getRandomId(1, 3),
    locationId: getRandomId(10, 20),
    accomTypeId: getRandomId(1, 5),
    viewId: getRandomId(1, 10),
    kitchenId: getRandomId(1, 3),
    liftDistanceId: getRandomId(100, 500),
    villageCentreDistanceId: getRandomId(100, 500),
    bathrooms: getRandomId(1, 3),
    standardPax: getRandomId(1, 4),
    maximumPax: getRandomId(2, 6),
    soldSeparately: randomBool(),
    upgradedFacilities: randomBool(),
    amenities: {
      aircon: randomBool(),
      appletv: randomBool(),
      btspeakers: randomBool(),
      cardkey: randomBool(),
      chromecast: randomBool(),
      fireplace: randomBool(),
      hdtv: randomBool(),
      jacuzzi: randomBool(),
      nespresso: randomBool(),
    },
    bedConfigurations: [
      getRandomId(1, 10),
      getRandomId(11, 20),
      getRandomId(21, 30),
    ],
    status: ["healthy", "under maintenance", "renovating"][getRandomId(0, 2)],
    floorArea: getRandomId(30, 100),
    online: randomBool(),
    images: [
      `https://storefront.htmniseko.com/nisekocentral/${getRandomId(
        1,
        50
      )}/thumbnail_1.jpg`,
    ],
  };
};
