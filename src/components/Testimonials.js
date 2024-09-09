import TestimonialCard from "./TestimonialCard";
import image from "../images/restaurant chef B.jpg";
function Testimonials() {
    const testimonialList = [];
    for (let i = 0; i < 4; i++) {
        testimonialList.push(
            <TestimonialCard key={i} img={image} title={"Rating"} text_profile={"Profile"} text_review={"Review"} />
        );
    }
  return (
    <section className="container container-green flex-column" id="testimonials">
        <h1 className="title-primary">Testimonials</h1>
        <div className="row justify-content-center">
            {testimonialList}
        </div>
    </section>

  );
}

export default Testimonials;