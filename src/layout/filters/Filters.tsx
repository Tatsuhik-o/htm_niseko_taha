import { makeStyles } from "@mui/styles";
import { useContext, useEffect, useState, useCallback } from "react";
import { mobileContext } from "../../utils/context";
import { PropertyList } from "../../utils/types";
import my_bookings from "../../assets/propertiesTwo.json";

const useStyles = makeStyles({
  filters: {
    width: (props: { mobileView: boolean; range: number }) =>
      props.mobileView ? "100%" : "33%",
    padding: "0.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
  filter_by_name_description: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    fontFamily: "Source Code Pro",
    color: "#7B96B1",
    "& input": {
      width: "100%",
      maxWidth: "300px",
      padding: "0.5rem",
      fontFamily: "Source Code Pro",
      fontSize: "1rem",
      border: "1px solid #DDDDDD",
      borderRadius: "5px",
    },
  },
  filter_by_size: {
    color: "#7B96B1",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    fontFamily: "Source Code Pro",
    "& input": {
      width: "100%",
      maxWidth: "300px",
      padding: "0.5rem",
      fontFamily: "Source Code Pro",
      fontSize: "1rem",
    },
  },
  range_position: {
    width: "100%",
    maxWidth: "300px",
    transform: (props: { range: number }) => `translateX(${props.range}%)`,
  },
});

const filterByInput = (list: PropertyList, searchInput: string) => {
  const regex = new RegExp(`.*${searchInput}.*`, "i");

  return list.filter(
    (item) => regex.test(item.name) || regex.test(item.description)
  );
};

const filterBySize = (list: PropertyList, range: number) => {
  return list.filter((item) => Number(item.floorArea) >= range);
};

export default function Filters() {
  const { mobileView, setAllBookings, allBookings, setIsLoading } =
    useContext(mobileContext) || {};
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [rangeValue, setRangeValue] = useState<number>(1);
  const [searchInputBookings, setSearchInputBookings] =
    useState<PropertyList>(my_bookings);
  const maxRangeValue = Math.max(
    ...(searchInputBookings?.map((elem) => elem.floorArea) || [1])
  );
  const classes = useStyles({
    mobileView: mobileView || false,
    range: (rangeValue * 100) / maxRangeValue - rangeValue / 100 || 0,
  });

  useEffect(() => {
    if (setIsLoading) {
      setIsLoading(true);
    }
    const debounceTimer = setTimeout(() => {
      if (allBookings && setAllBookings) {
        setAllBookings([
          ...filterByInput(my_bookings as PropertyList, searchFilter),
        ]);
        setSearchInputBookings([
          ...filterByInput(my_bookings as PropertyList, searchFilter),
        ]);
      }
      setRangeValue(1);
      if (setIsLoading) {
        setIsLoading(false);
      }
    }, 500);
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchFilter]);

  useEffect(() => {
    if (setIsLoading) {
      setIsLoading(true);
    }
    const debounceTimer = setTimeout(() => {
      if (allBookings && setAllBookings) {
        setAllBookings([
          ...filterBySize(searchInputBookings as PropertyList, rangeValue),
        ]);
      }
      if (setIsLoading) {
        setIsLoading(false);
      }
    }, 500);
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [rangeValue]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (/^[a-zA-Z0-9\s_.,!()-]*$/.test(e.target.value)) {
        setSearchFilter(e.target.value);
      }
    },
    []
  );

  return (
    <div className={classes.filters}>
      <div className={classes.filter_by_name_description}>
        <label htmlFor="name_and_description">
          Keyword: (by Name or Description)
        </label>
        <input
          type="text"
          value={searchFilter}
          id="name_and_description"
          onChange={handleSearchChange}
        />
      </div>
      <div className={classes.filter_by_size}>
        <label htmlFor="floor_size">Floor Size :</label>
        <span className={classes.range_position}>{rangeValue}</span>
        <input
          type="range"
          min={1}
          max={maxRangeValue}
          value={rangeValue}
          id="floor_size"
          onChange={(e) => setRangeValue(Number(e.target.value))}
        />
      </div>
    </div>
  );
}
