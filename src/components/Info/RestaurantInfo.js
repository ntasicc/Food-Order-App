import classes from "./RestaurantInfo.module.css";
import sushiImg from "../../assets/sushi.png";

const RestauranInfo = () => {
  return (
    <section className={classes.info}>
      <h2>Contact Informations</h2>
      <p>Call us or give us a visit. We are there for you!</p>
      <div className={classes.wrapper}>
        <section className={classes.contact}>
          <p>⏲️ Hours: 09-23h</p>
          <p>📍 Obrenovićeva 23 Niš 700179 Serbia</p>
          <p>📮 info@missionsushi.com</p>
          <p>📱 +381 234 567 88</p>
        </section>
        <img src={sushiImg}></img>
      </div>
      <h4>We are expanding to a new location so stay tuned!</h4>
    </section>
  );
};

export default RestauranInfo;
