import cook1 from "../images/Mario and Adrian A.jpg";
import cook2 from "../images/Mario and Adrian b.jpg";

function Description() {
  return (
    <>
      <section className="container" style={{flexDirection: "row"}} id="description">
        <div className="col-8">
          <h1>Little Lemon</h1>
          <h3>Chicago</h3>
          <p>Random description of the restaurant. This text is just place holder to simulate how it would look.
          Fill even more the text so it looks better aligned with Coursera tasks.</p>
        </div>
        <div className="col-4">
            <div className="img-container offset-vertical">
                <img src={cook1} alt="cooking"/>
            </div>
            <div className="img-container fixed">
                <img src={cook2} alt="cooking"/>
            </div>
        </div>
      </section>
    </>
  );
}

export default Description;