import plate from "../images/restauranfood.jpg";

function BookTable() {
  return (
    <section className="container container-green" id="book-table">
        <div className="col-8">
            <h1 className="title-primary">Little Lemon</h1>
            <h3 className="title-secondary">Chicago</h3>
            <p className="text-secondary">Random description of the restaurant. This text is just place holder to simulate how it would look.</p>
            <button className="btn btn-primary">Book Table</button>
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