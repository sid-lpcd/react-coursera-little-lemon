import plate from "../images/restauranfood.jpg";
import { Link } from 'react-router-dom';

function BookTable() {
  return (
    <section className="container container-green" id="book-table">
        <div className="col-8">
            <h1 className="title-primary">Little Lemon</h1>
            <h3 className="title-secondary">Chicago</h3>
            <p className="text-second">Random description of the restaurant. This text is just place holder to simulate how it would look.</p>
            <Link to="/booking">
              <button className="btn btn-primary">Book Table</button>
            </Link>
        </div>
        <div className="col-4">
            <div className="img-container offset-vertical">
                <img src={plate} alt="cuisine"/>
            </div>
        </div>
    </section>

  );
}

export default BookTable;
