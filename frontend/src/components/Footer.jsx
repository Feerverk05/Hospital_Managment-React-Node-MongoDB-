import React from "react";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const hours = [
    {
      id: 1,
      day: "Понеділок",
      time: "9:00 - 23:00 ",
    },
    {
      id: 2,
      day: "Вівторок",
      time: "12:00 - 22:00 ",
    },
    {
      id: 3,
      day: "Середа",
      time: "10:00 - 23:00",
    },
    {
      id: 4,
      day: "Четвер",
      time: "9:00 - 21:00",
    },
    {
      id: 5,
      day: "П'ятниця",
      time: "8:00 - 17:00",
    },
  ];

  return (
    <>
      <footer className={"container"}>
        <hr />
        <div className="content">
          <div>
            <img src="/logogo.png" alt="logo" className="logo-img"/>
          </div>
          <div>
            <ul>
              <Link to={"/"}>Головна</Link>
              <Link to={"/appointment"}>Призначення</Link>
              <Link to={"/about"}>Про нас</Link>
            </ul>
          </div>
          <div>
            <h4>Години роботи</h4>
            <ul>
              {hours.map((element) => (
                <li key={element.id}>
                  <span>{element.day}</span>
                  <span>{element.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Контактні данні</h4>
            <div>
              <FaPhone />
              <span>099-34-67-114</span>
            </div>
            <div>
              <MdEmail />
              <span>barabolya123@gmail.com</span>
            </div>
            <div>
              <FaLocationArrow />
              <span>Hololobova Kateryna, Ukraine</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
