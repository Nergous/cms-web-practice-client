import Carousel from "react-bootstrap/Carousel";
//import ExampleCarouselImage from "components/ExampleCarouselImage";
//import 'bootstrap/dist/css/bootstrap.min.css'
import cl from "./CarouselMy.module.css"

function CarouselMy() {
    return (
        <Carousel className={cl.carousel__mine}>
            <Carousel.Item interval={10000000}>
                {/* <ExampleCarouselImage text="First slide" /> */}
                <img src="group1.jpg" className={cl.image__carousel}></img>
                
            </Carousel.Item>
            <Carousel.Item interval={500}>
                {/* <ExampleCarouselImage text="Second slide" /> */}
                <img src="group2.jpg" className={cl.image__carousel}></img>
                
            </Carousel.Item>
            <Carousel.Item>
                {/* <ExampleCarouselImage text="Third slide" /> */}
                <img src="group3.jpg" className={cl.image__carousel}></img>
                
            </Carousel.Item>
        </Carousel>
    );
}

export default CarouselMy;
