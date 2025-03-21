import { makeStyles } from "@mui/styles";
import { Property } from "../utils/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons";
import { useContext, useMemo } from "react";
import { mobileContext } from "../utils/context";
import LazyImage from "./LazyImage";

const useStyles = makeStyles({
  booking_card: {
    padding: "1rem",
    width: "100%",
    border: "1px solid #DBDBDB",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 2px 8px #8CA3CE",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      boxShadow: "0 8px 15px #8CA3CE",
    },
  },
  card_wrapper: {
    padding: "0.5rem",
    display: "flex",
    flexDirection: (props: { mobileView: boolean }) =>
      props.mobileView ? "column" : "row",
    gap: "5px",
  },
  info_booking_side: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: (props: { mobileView: boolean }) =>
      props.mobileView ? "column" : "row",
    gap: "25px",
    alignItems: "center",
  },
  room_image: {
    width: (props: { mobileView: boolean }) =>
      props.mobileView ? "100%" : "50%",
    aspectRatio: "3/2",
    "& img": {
      width: "100%",
      height: "100%",
      borderRadius: "5px",
      overflow: "hidden",
    },
  },
  property_info: {
    width: (props: { mobileView: boolean }) =>
      props.mobileView ? "100%" : "50%",
    aspectRatio: (props: { mobileView: boolean }) =>
      props.mobileView ? "2/1" : "3/2",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    "& > *": {
      color: "#7B98B3",
      fontFamily: "Source Code Pro",
    },
  },
  see_more: {
    cursor: "pointer",
    display: "flex",
    gap: "10px",
    textTransform: "capitalize",
    alignItems: "center",
    color: "#F06A49",
    "& > svg": {
      transform: "translateY(2px)",
    },
  },
  more_info: {
    padding: "0.5rem",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  divider: {
    height: "1px",
    width: "95%",
    backgroundColor: "#CCCCCC",
    alignSelf: "center",
  },
});

type TBookingCard = {
  property: Property;
  activeCard: boolean;
  setSeeMore: Function;
};

export default function BookingCard({
  property,
  activeCard,
  setSeeMore,
}: TBookingCard) {
  const { mobileView } = useContext(mobileContext) || {};
  const classes = useStyles({ mobileView: mobileView || false });

  const availableAmenities = useMemo(() => {
    return (
      Object.keys(property.amenities)
        .filter(
          (key) => property.amenities[key as keyof typeof property.amenities]
        )
        .join(", ") || "None"
    );
  }, [property.amenities]);

  return (
    <div className={classes.booking_card}>
      <div className={classes.card_wrapper}>
        <div className={classes.info_booking_side}>
          <div className={classes.room_image}>
            <LazyImage src={property.images[0]} alt={property.name} />
          </div>
          <div className={classes.property_info}>
            <p
              style={{
                color: "black",
                fontSize: "1.3rem",
                fontFamily: "Helvetica",
                textTransform: "capitalize",
              }}
            >
              {property.name}
            </p>
            <p>Floor size: {property.floorArea} sqm</p>
            <p>
              Available :{" "}
              <span style={{ color: property.online ? "green" : "red" }}>
                {property.online ? "Yes" : "No"}
              </span>
            </p>
            <p>Lifts within {property.liftDistanceId} m</p>
            <p>Village Centre within {property.villageCentreDistanceId} m</p>
            <p>
              Upgraded Facilities {"  "}
              <span
                style={{ color: property.upgradedFacilities ? "green" : "red" }}
              >
                {property.upgradedFacilities ? "Yes" : "No"}
              </span>
            </p>
            <div
              className={classes.see_more}
              onClick={() => setSeeMore()}
              data-testid="clickable-div"
            >
              <FontAwesomeIcon icon={faMagnifyingGlassPlus} fontSize={13} />
              see more
            </div>
          </div>
        </div>
      </div>
      {activeCard && (
        <div className={classes.more_info}>
          <div className={classes.divider}></div>
          <p style={{ fontFamily: "Source Code Pro" }}>
            {property.standardPax} Beds, Maximum {property.maximumPax} Guests{" "}
            {"  "}
            <span
              style={{
                fontSize: "0.7rem",
                color: "#877575",
                fontFamily: "sans-serif",
              }}
            >
              {"  "}
              *Charges apply where number of adults exceeds number of beds.
            </span>
          </p>
          <p
            style={{
              textTransform: "uppercase",
              fontSize: "0.8rem",
              fontFamily: "Source Code Pro",
            }}
          >
            Amenities : {availableAmenities || "None"}
          </p>
          <p style={{ fontFamily: "Source Code Pro", color: "#7B98B3" }}>
            {property.description}
          </p>
          <div style={{ width: "100%", aspectRatio: "3/2" }}>
            <LazyImage src={property.images[1]} alt={property.name} />
          </div>
        </div>
      )}
    </div>
  );
}
