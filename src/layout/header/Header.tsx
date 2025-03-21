import { makeStyles } from "@mui/styles";
import { useContext } from "react";
import { mobileContext } from "../../utils/context";

const useStyles = makeStyles({
  header: {
    width: "100%",
    backgroundColor: "#222222",
    maxHeight: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.5rem 3.5rem",
    borderBottom: "1px solid #343434",
  },
  logo: {
    overflow: "hidden",
    height: "100%",
    maxWidth: "300px",
    padding: "2rem 0rem",
    "& img": {
      width: "90%",
      height: "90%",
    },
  },
  more_info: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "flex-end",
  },
  contact_info: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    color: "#F06549",
    fontFamily: "Source Code Pro",
    "& > a": {
      display: "flex",
      alignItems: "center",
      padding: "0.5rem",
      color: "#F06549",
    },
  },
  about_us: {
    color: "#7B96B1",
    fontFamily: "Source Code Pro",
    fontSize: "0.9rem",
  },
});

export default function Header() {
  const { mobileView } = useContext(mobileContext) || {};
  const classes = useStyles({ mobileView: mobileView || false });
  return (
    <div className={classes.header}>
      <div className={classes.logo}>
        <img src="htm_logo.webp" alt="HTM Logo" />
      </div>
    </div>
  );
}
