import { render, screen } from "@testing-library/react";
import { JSX } from "react";
import "@testing-library/jest-dom";
import Bookings from "../layout/bookings/Bookings";
import { mobileContext } from "../utils/context";

const fakeMobileContext = {
  isLoading: false,
  allBookings: [
    {
      id: 1091,
      propertyTypeId: 224,
      propertyType: false,
      name: "Chalet Murasaki",
      description:
        "This 8 bedroom chalet (487 sqm) features a large master bedroom (55 sqm) with a hinoki en-suite bathroom and a daybed nook for quiet relaxation.",
      code: "CM",
      baseRoom: "",
      gradeId: 22,
      gradeSort: 8,
      locationId: 50,
      accomTypeId: 2,
      viewId: 9,
      kitchenId: 1,
      liftDistanceId: 179,
      villageCentreDistanceId: 181,
      bathrooms: 4,
      standardPax: 17,
      maximumPax: 18,
      soldSeparately: true,
      upgradedFacilities: false,
      amenities: {
        aircon: false,
        appletv: false,
        btspeakers: false,
        cardkey: false,
        chromecast: false,
        fireplace: false,
        hdtv: false,
        jacuzzi: false,
        nespresso: false,
      },
      bedConfigurations: [92, 224, 225, 226, 228],
      status: "healthy",
      floorArea: 487,
      online: true,
      images: [
        "https://storefront.htmniseko.com/nisekocentral/123/hero_winter_large.jpg",
        "https://storefront.htmniseko.com/nisekocentral/123/main_winter_large.jpg",
      ],
    },
  ],
};

const customRender = (ui: JSX.Element, myContext: any) => {
  return render(
    <mobileContext.Provider value={myContext}>{ui}</mobileContext.Provider>
  );
};

test("renders loading element when data is loading", () => {
  const testLoading = { ...fakeMobileContext, isLoading: true };
  const { container } = customRender(<Bookings />, testLoading);
  const loading = container.querySelector("[class*='makeStyles-loading']");
  expect(loading).toBeInTheDocument();
});

test("displays hotel names when bookings are available", () => {
  const { container } = customRender(<Bookings />, fakeMobileContext);

  console.log(container);

  expect(screen.getByText("Chalet Murasaki")).toBeInTheDocument();
});

test("displays 'no bookings' message when there are no bookings", () => {
  const noBookings = { ...fakeMobileContext, allBookings: [] };
  customRender(<Bookings />, noBookings);
  expect(
    screen.getByText(
      "Sorry, we have nothing available with this search query ..."
    )
  ).toBeInTheDocument();
});
