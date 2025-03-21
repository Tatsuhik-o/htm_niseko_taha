import { makeStyles } from "@mui/styles";
import Loading from "../../components/Loading";
import { useContext, useEffect, useState, useRef } from "react";
import { mobileContext } from "../../utils/context";
import BookingCard from "../../components/BookingCard";

const useStyles = makeStyles({
  bookings: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginBottom: "1rem",
  },
  no_bookings: {
    padding: "1rem",
    width: "100%",
    fontSize: "1.2rem",
    fontFamily: "Source Code Pro",
    color: "#F69349",
  },
});

export default function Bookings() {
  const { isLoading, allBookings } = useContext(mobileContext) || {};
  const [seeMores, setSeeMores] = useState<boolean[]>([]);
  const seeMoresRef = useRef<boolean[]>([]);
  const classes = useStyles();

  useEffect(() => {
    seeMoresRef.current = new Array(allBookings?.length || 0).fill(false);
    setSeeMores(seeMoresRef.current);
  }, [allBookings]);

  return (
    <div className={classes.bookings}>
      {isLoading && <Loading />}
      {!isLoading && allBookings && (
        <>
          {allBookings.map((booking, idx) => {
            return (
              <BookingCard
                property={booking}
                key={booking.name}
                activeCard={seeMores[idx]}
                setSeeMore={() =>
                  setSeeMores([
                    ...seeMores.map((_, index) => {
                      if (index !== idx) return false;
                      return !seeMores[idx];
                    }),
                  ])
                }
              />
            );
          })}
        </>
      )}
      {!isLoading && !allBookings?.length && (
        <div className={classes.no_bookings}>
          Sorry, we have nothing available with this search query ...
        </div>
      )}
    </div>
  );
}
