import Carousel from "./Carousel";
import banner1 from "../../assets/Watchs/watchbanner1.jpg";
import banner2 from "../../assets/Watchs/watchbanner3.jpg";
import banner3 from "../../assets/Watchs/watchbanner2.jpg";

const WatchCarousel = () => {
  const images = [
    { image: banner1, name: "Titan Watches" },
    { image: banner2, name: "Sonata Watches" },
    { image: banner3, name: "Smart Watches" },
  ];

  return <Carousel images={images}/>
};

export default WatchCarousel;