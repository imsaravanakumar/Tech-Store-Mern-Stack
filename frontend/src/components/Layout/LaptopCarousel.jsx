import Carousel from "../Layout/Carousel";
import banner1 from "../../assets/Laptops/laptopbanner.jpg";
import banner2 from "../../assets/Laptops/laptopbanner1.jpg";
import banner3 from "../../assets/Laptops/laptopbanner2.avif";

const LaptopCarousel = () => {
  const laptopImages = [
    { image: banner1, name: "Lenovo Laptops" },
    { image: banner2, name: "Tuf Gaming Laptops" },
    { image: banner3, name: "Asus Laptops" },
  ];
  return <Carousel images={laptopImages} />;
};

export default LaptopCarousel;
