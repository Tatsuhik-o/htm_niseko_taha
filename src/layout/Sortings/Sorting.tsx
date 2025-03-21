import { makeStyles } from "@mui/styles";
import { useCallback, useContext, useRef, useState } from "react";
import { mobileContext } from "../../utils/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles({
  sorting: {
    marginLeft: (props: { mobileView: boolean }) =>
      props.mobileView ? "0" : "calc(33% + 5px)",
    padding: "0.5rem",
    display: "flex",
    gap: "1.5rem",
    fontFamily: "Source Code Pro",
    color: "#7B96B1",
    fontSize: "0.9rem",
    "& > div:not(:first-child)": {
      cursor: "pointer",
      display: "flex",
      gap: "2.5px",
      alignItems: "center",
    },
  },
});

const resetFilters = (
  obj: { name: boolean; size: boolean; bathroom: boolean },
  key: string
) => {
  return Object.keys(obj).reduce(
    (acc, curr) => {
      acc[curr as keyof typeof obj] = curr === key;
      return acc;
    },
    { name: false, size: false, bathroom: false }
  );
};

export default function Sorting() {
  const { mobileView, setAllBookings, allBookings } =
    useContext(mobileContext) || {};
  const sortOrderRef = useRef({
    name: false,
    size: false,
    bathroom: false,
  });
  const [ascendingOrder, setAscendingOrder] = useState<boolean>(false);
  const classes = useStyles({ mobileView: mobileView || false });

  const filterByName = useCallback(() => {
    if (allBookings && setAllBookings) {
      sortOrderRef.current = resetFilters(sortOrderRef.current, "name");
      setAllBookings([
        ...allBookings.sort((a, b) =>
          ascendingOrder
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        ),
      ]);
      setAscendingOrder(!ascendingOrder);
    }
  }, [allBookings]);

  const filterBySize = useCallback(() => {
    if (allBookings && setAllBookings) {
      sortOrderRef.current = resetFilters(sortOrderRef.current, "size");
      setAllBookings([
        ...allBookings.sort((a, b) =>
          ascendingOrder ? b.floorArea - a.floorArea : a.floorArea - b.floorArea
        ),
      ]);
      setAscendingOrder(!ascendingOrder);
    }
  }, [allBookings]);

  const filterByBathroom = useCallback(() => {
    if (allBookings && setAllBookings) {
      sortOrderRef.current = resetFilters(sortOrderRef.current, "bathroom");
      setAllBookings([
        ...allBookings.sort((a, b) =>
          ascendingOrder ? b.bathrooms - a.bathrooms : a.bathrooms - b.bathrooms
        ),
      ]);
      setAscendingOrder(!ascendingOrder);
    }
  }, [allBookings]);

  return (
    <div className={classes.sorting}>
      <div style={{ color: "black" }}>Sort By: </div>
      <div onClick={filterByName}>
        {sortOrderRef.current.name === true && (
          <FontAwesomeIcon
            icon={ascendingOrder ? faArrowUp : faArrowDown}
            color="#7B96B1"
          />
        )}
        Name
      </div>
      <div onClick={filterBySize}>
        {sortOrderRef.current.size === true && (
          <FontAwesomeIcon
            icon={ascendingOrder ? faArrowUp : faArrowDown}
            color="#7B96B1"
          />
        )}
        Size
      </div>
      <div onClick={filterByBathroom}>
        {sortOrderRef.current.bathroom === true && (
          <FontAwesomeIcon
            icon={ascendingOrder ? faArrowUp : faArrowDown}
            color="#7B96B1"
          />
        )}
        Bathrooms
      </div>
    </div>
  );
}
