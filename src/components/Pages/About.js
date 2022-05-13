import RestauranInfo from "../Info/RestaurantInfo";
import RestauranSummary from "../Info/RestaurantSummary";
import Map from "../Map/Map";
import classes from "./About.module.css";

const About = () => {
  return (
    <>
      <RestauranSummary></RestauranSummary>
      <div className={classes.mapSection}>
        <Map></Map>
        <RestauranInfo></RestauranInfo>
      </div>
    </>
  );
};

export default About;
