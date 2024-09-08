function FoodCard(props) {
    return (
      <div className="card col-3">
        <img src={props.img} className="card-img-top"></img>
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.text}</p>
          <a href="#" className="card-link">Order a delivery</a>
        </div>
      </div>
    );
  }
  
  export default FoodCard;