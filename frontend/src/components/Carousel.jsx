import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    "https://ingeoexpert.com/wp-content/uploads/2018/01/Tower_bridge_London_Twilight_-_November_2006-1500x759.jpg", // Reemplaza con la URL de tu imagen
    "https://www.atrapalo.com/houdinis/wp-content/uploads/2019/08/image1-12-1173x498.jpg",
    "https://images.france.fr/zeaejvyq9bhj/5ULO4fBMntQgqtB8o69FJa/d97300ced307c79a21c90cc325f8e2e1/Pont_Alexandre_III_-_Paris.png?w=680&h=298&q=70&fm=webp&fit=fill",
    "https://www.yaencontre.com/noticias/wp-content/uploads/2018/10/puentes-helix-bridge.jpg"
  ];
  const titles = [
    "Tower Bridge (Reino Unido) ",
    " Golden Bridge (Vietnam) ",
    "Puente de Alejandro III(París)",
    "Helix Bridge de Cox Architecture (Singapur)"
  ];

  const nextImage = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Iniciar el intervalo para cambiar automáticamente de imagen
  useEffect(() => {
    const intervalId = setInterval(nextImage, 3000);

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, []);

  return (
   
    <div id="carouselExampleControlsNoTouching" className="carousel slide" data-bs-touch="false">
      <div className="carousel-inner">
        {images.map((image, index) => (
          <div key={index} className={`carousel-item ${index === activeIndex ? 'active' : ''}`}>
            <img
              src={image}
              className="d-block mx-auto"
              alt={`foto ${index + 1}`}
              style={{ objectFit: "cover", height: "70vh", width: "105%" }}  /> // Ajusta la altura según tu preferencia
             <div className="carousel-caption">
              <h3 style={{ color: "black", backgroundColor: "rgba(255, 255, 255, 0.2)", padding: "10px", borderRadius: "5px" }}>{titles[index]}</h3>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" onClick={prevImage}>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" onClick={nextImage}>
        <span className="visually-hidden">Next</span>
      </button>
      </div>
  );
};

export default Carousel;