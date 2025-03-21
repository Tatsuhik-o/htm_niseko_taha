import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

type TLazyImage = {
  src: string;
  alt: string;
};

const LazyImage = ({ src, alt }: TLazyImage) => {
  return (
    <LazyLoadImage
      src={src}
      alt={alt}
      effect="blur"
      width="100%"
      height="auto"
    />
  );
};

export default LazyImage;
