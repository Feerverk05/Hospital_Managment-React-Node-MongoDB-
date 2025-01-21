import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profil = () => {
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true); 
  const navigateTo = useNavigate();

  const doctorData = {
    doctor: {
      firstName: "Микола",
      lastName: "Тесла",
      email: "mktesla@gmail.com",
      phone: "+38005063217483",
      nic: "1234567890121",
      dob: "1985-06-15",
      gender: "Чоловік",
      doctorDepartment: "Radiology",
      docAvatar: "/path/to/avatar.jpg"
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      setDoctorInfo(doctorData.doctor);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  if (!doctorInfo) {
    return <div>Завантаження...</div>;
  }

  return (
    <section className="page doctors">
    <h1 className="form-title">Лікар</h1>
    <div className="banner">
          
            <div className="card">
              <img
                src="/3.png"
                alt="doctor avatar"
              />
              <div className="details">
          <p><strong>Ім'я:</strong> {doctorInfo.firstName}</p>
          <p><strong>Прізвище:</strong> {doctorInfo.lastName}</p>
          <p><strong>Email:</strong> {doctorInfo.email}</p>
          <p><strong>Телефон:</strong> {doctorInfo.phone}</p>
          <p><strong>Ідентифікаційний номер:</strong> {doctorInfo.nic}</p>
          <p><strong>Дата народження:</strong> {doctorInfo.dob}</p>
          <p><strong>Стать:</strong> {doctorInfo.gender}</p>
          <p><strong>Відділ:</strong> {doctorInfo.doctorDepartment}</p>
        </div>
            </div>
         
    </div>
  </section>
  );
};

export default Profil;
