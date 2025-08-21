import Carousel from "../Layout/Carousel";
import banner1 from "../../assets/Phones/phonebanner.jpg";
import banner2 from "../../assets/Phones/phonebanner2.jpg";
import banner3 from "../../assets/Phones/phonebanner3.webp";

const PhoneCarousel = () => {
  const images = [
    { image: banner1, name: "Iphones" },
    { image: banner2, name: "Google Phones" },
    { image: banner3, name: "Samsung Phones" },
  ];
  return <Carousel images={images} />;
};

export default PhoneCarousel;
