function TestimonialCard(props) {
    return (
      <div className="card col-2 flex-column  justify-content-center">
        <h5 className="card-title">{props.title}</h5>
        <div className="row align-items-center">
          <img src={props.img} className="card-img-side w-50"></img>
          <p>{props.text_profile}</p>
        </div>
        <p className="card-text">{props.text_review}</p>
      </div>
    );
  }
  
  export default TestimonialCard;