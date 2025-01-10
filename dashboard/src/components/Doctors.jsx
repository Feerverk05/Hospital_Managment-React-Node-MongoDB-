import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const { isAuthenticated } = useContext(Context);
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data.doctors);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchDoctors();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <section className="page doctors">
      <h1>Лікарі</h1>
      <div className="banner">
        {doctors && doctors.length > 0 ? (
          doctors.map((element) => {
            return (
              <div className="card">
                <img
                  src="/1.png"
                  alt="doctor avatar"
                />
                <h4>{`${element.firstName} ${element.lastName}`}</h4>
                <div className="details">
                  <p>Email: <span>{element.email}</span></p>
                  <p>Телефон: <span>{element.phone}</span></p>
                  <p>Дата народження: <span>{element.dob.substring(0, 10)}</span></p>
                  <p> Відділ: <span>{element.doctorDepartment}</span></p>
                  <p>Номер лікаря: <span>{element.nic}</span></p>
                  <p>Стать: <span>{element.gender}</span></p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>Нема лікарів!</h1>
        )}
      </div>
    </section>
  );
};

export default Doctors;
