import { mobileContext } from "./utils/context";
import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Header from "./layout/header/Header";
import Sorting from "./layout/Sortings/Sorting";
import Filters from "./layout/filters/Filters";
import Bookings from "./layout/bookings/Bookings";
import { PropertyList } from "./utils/types";
const useStyles = makeStyles({
  app: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  main_layout: {
    width: "100%",
    maxWidth: "1440px",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    padding: "0rem 1.5rem",
  },
  filters_and_bookings: {
    width: "100%",
    display: "flex",
    gap: "5px",
    flexDirection: (props: { mobileView: boolean }) =>
      !props.mobileView ? "row" : "column",
  },
});

function App() {
  const [mobileView, setMobileView] = useState<boolean>(
    window.innerWidth < 1000
  );
  const [allBookings, setAllBookings] = useState<PropertyList>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const classes = useStyles({ mobileView: mobileView || false });

  useEffect(() => {
    (async () => {
      const controller = new AbortController();
      try {
        const response = await fetch("./assets/propertiesTwo.json", {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error("Error Fetching Data ...");
        }
        const data = await response.json();
        setAllBookings(data);
      } catch (err) {
        console.log("Error Fetching Data : ", err);
      }
      return () => {
        controller.abort();
      };
    })();
    let resizeTimer: NodeJS.Timeout | undefined;
    const checkMobileView = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setMobileView(window.innerWidth < 1000);
        console.log("resizing ...");
      }, 500);
      return () => {
        clearTimeout(resizeTimer);
      };
    };
    window.addEventListener("resize", checkMobileView);
    return () => {
      window.removeEventListener("resize", checkMobileView);
    };
  }, []);

  return (
    <mobileContext.Provider
      value={{
        mobileView,
        setMobileView,
        allBookings,
        setAllBookings,
        isLoading,
        setIsLoading,
      }}
    >
      <div className={classes.app}>
        <Header />
        <div className={classes.main_layout}>
          <Sorting />
          <div className={classes.filters_and_bookings}>
            <Filters />
            <Bookings />
          </div>
        </div>
      </div>
    </mobileContext.Provider>
  );
}

export default App;
