import useCache from "../hooks/useCache";

const Image = ({ url, ...rest }) => {
  const image = useCache(url);
  if (!image) {
    return <p>Loading ...</p>;
  }
  return <img src={url} alt="img" {...rest} />;
};

export default Image;
