import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import my_bookings from "../assets/propertiesTwo.json";
import BookingCard from "../components/BookingCard";
import { vi } from "vitest";

const fakeSeeMore = vi.fn();

test("checking if hotel description is displayed", async () => {
  render(
    <BookingCard
      property={my_bookings[0]}
      activeCard={true}
      setSeeMore={fakeSeeMore}
    />
  );
  expect(screen.getByText(my_bookings[0].description)).toBeInTheDocument();
});

test("checking if hotel name is displayed", async () => {
  render(
    <BookingCard
      property={my_bookings[0]}
      activeCard={false}
      setSeeMore={fakeSeeMore}
    />
  );
  expect(screen.getByText(my_bookings[0].name)).toBeInTheDocument();
});
