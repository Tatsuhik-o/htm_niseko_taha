import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  wrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    padding: "1rem",
  },
  loading: {
    width: "60px",
    aspectRatio: "2",
    "--_g": "no-repeat radial-gradient(circle closest-side,#E56448 90%,#0000)",
    background: `
          var(--_g) 0%   50%,
          var(--_g) 50%  50%,
          var(--_g) 100% 50%
        `,
    backgroundSize: "calc(100% / 3) 50%",
    animation: "$l3 1s infinite linear",
  },
  "@keyframes l3": {
    "20%": { backgroundPosition: "0%   0%, 50%  50%,100%  50%" },
    "40%": { backgroundPosition: "0% 100%, 50%   0%,100%  50%" },
    "60%": { backgroundPosition: "0%  50%, 50% 100%,100%   0%" },
    "80%": { backgroundPosition: "0%  50%, 50%  50%,100% 100%" },
  },
});

export default function Loading() {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.loading}></div>
    </div>
  );
}
