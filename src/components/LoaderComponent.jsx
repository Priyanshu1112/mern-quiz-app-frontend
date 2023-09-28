import Loader from "react-js-loader";
import { TypeAnimation } from "react-type-animation";
const LoaderComponent = () => {
  return (
    <div className=" d-flex flex-column align-items-center vh-100 gap-5 py-5">
      <Loader
        type="bubble-loop"
        bgColor={"#ef9d59"}
        color={"#FFFFFF"}
        size={100}
      />
      <TypeAnimation
        sequence={["", 100, "Get", 200, "Get Ready!!!"]}
        wrapper="span"
        speed={20}
        className="color-primary "
        style={{ fontSize: "2em", display: "inline-block", color: "#ef9d59" }}
        repeat={Infinity}
      />
    </div>
  );
};

export default LoaderComponent;
