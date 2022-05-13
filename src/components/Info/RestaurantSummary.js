import classes from "./RestaurantSummary.module.css";

const RestauranSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Mission Sushi - Since 2010</h2>
      <p>
        Mission Sushi is a restaurant run by a bunch of friends. It started
        through our love for Japan and its culture.
      </p>
      <p>
        Our chefs traveled all over Japan to perfect technics and expand
        knowledge of this unique cuisine.
      </p>
      <p>Be brave and enjoy a variety of delicious food.</p>
    </section>
  );
};

export default RestauranSummary;
