import React from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Departments = () => {
  const departmentsArray = [
    {
      name: "Педіатр",
      imageUrl: "/departments/pedia.png",
    },
    {
      name: "Ортопед",
      imageUrl: "/departments/orto.jpg",
    },
    {
      name: "Кардіолог",
      imageUrl: "/departments/serdce.jpg",
    },
    {
      name: "Невролог",
      imageUrl: "/departments/nevro.jpg",
    },
    {
      name: "Онколог",
      imageUrl: "/departments/onco.jpg",
    },
    {
      name: "МРТ",
      imageUrl: "/departments/mrt.jpg",
    },
    {
      name: "Фізична терапія",
      imageUrl: "/departments/therapy.png",
    },
    {
      name: "Дерматолог",
      imageUrl: "/departments/derma.jpg",
    },
    {
      name: "ЛОР",
      imageUrl: "/departments/lor.jpg",
    },
  ];
  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1, 
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1, 
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1,
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1, 
    },
  };

  return (
    <div className='container departments'>
      <h2>Відділи</h2>
<Carousel responsive={responsive} removeArrowOnDevice={["medium", "small"]}>
  {departmentsArray.map((depart, index) => {
    return (
      <div className="card" key={index}>
        <div className="depart-name">{depart.name}</div>
        <img src={depart.imageUrl} alt={depart.name}/>
      </div>
    )
  })}
</Carousel>;
    </div>
  )
}

export default Departments
