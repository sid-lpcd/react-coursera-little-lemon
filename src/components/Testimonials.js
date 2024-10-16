import TestimonialCard from "./TestimonialCard";
import image1 from "../images/people1.jpg";
import image2 from "../images/people2.jpg";
import image3 from "../images/people3.jpg";
import image4 from "../images/people4.jpg";

function Testimonials() {

    const testimonialList = [
    {
      img: image1,
      title: "Excellent Service",
      text_profile: "John Doe",
      text_review: "The food was fantastic and the service was impeccable. Will definitely come again!"
    },
    {
      img: image2,
      title: "Wonderful Experience",
      text_profile: "Jane Smith",
      text_review: "A truly unforgettable dining experience with exceptional ambiance and delightful dishes."
    },
    {
      img: image3,
      title: "Top-Notch Quality",
      text_profile: "Michael Brown",
      text_review: "Every dish was masterfully prepared, and the ingredients were top-notch. Highly recommend!"
    },
    {
      img: image4,
      title: "Great Atmosphere",
      text_profile: "Harry David",
      text_review: "The restaurant had such a warm and inviting atmosphere. The staff was friendly and the food was delicious!"
    }
  ];
  return (
    <section className="container container-green flex-column" id="testimonials">
        <h1 className="title-primary">Testimonials</h1>
        <div className="row justify-content-center">
        {testimonialList.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            img={testimonial.img}
            title={testimonial.title}
            text_profile={testimonial.text_profile}
            text_review={testimonial.text_review}
          />
        ))}
      </div>
    </section>

  );
}

export default Testimonials;
