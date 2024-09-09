import FoodCard from "./FoodCard";
import greekSalad from "../images/greek salad.jpg";
import bruchetta from "../images/bruchetta.svg";
import lemonDessert from "../images/lemon dessert.jpg";
function Specials() {
  const foodList = [{
    img: greekSalad,
    title: "Greek Salad",
    text: "Text just to pretend it has something interesting. It is supposed to describe the dish."
  },{
    img: bruchetta,
    title: "Bruchetta",
    text: "Text just to pretend it has something interesting. It is supposed to describe the dish."
  },{
    img: lemonDessert,
    title: "Lemon Dessert",
    text: "Text just to pretend it has something interesting. It is supposed to describe the dish."
  }]
  const foodCards = foodList.map(food => {return <FoodCard key={food.title} img={food.img} title={food.title} text={food.text} />})
  return (
    <>
      <section className="container" style={{flexDirection: "column"}} id="specials">
        <div className="row heading w-100">
          <h1>Specials</h1>
          <button className="btn btn-primary">Online Menu</button>
        </div>
        <div className="row d-flex justify-content-center">
          {foodCards}
        </div>
          
      </section>
    </>
  );
}

export default Specials;