import { useState, useEffect } from "react";
const useCache = (url) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const picture = new Image();
    picture.onload = () => {
      setImage(picture);
    };
    picture.src = url;
  }, [url]);
  return image;
};

export default useCache;
