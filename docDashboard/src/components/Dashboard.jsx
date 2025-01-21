import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  
  // Включення логіки завантаження прийомів (якщо потрібно)
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/appointment/getall",
          { withCredentials: true }
        );
        setAppointments(data.appointments);
      } catch (error) {
        setAppointments([]);
        toast.error("Не вдалося завантажити прийоми");
      }
    };
    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/appointment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };


  const { isAuthenticated, doctor } = useContext(Context);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

 

  return (
    <section className="dashboard pagge">
      <div className="banner">
        <div className="firstBox">
          <img src="/3.png" alt="docImg" />
          <div className="content">
            <div>
              <p>Вітаємо</p>
              <h5>у E-Health!</h5>
            </div>
          </div>
        </div>

        <div className="secondBox">
          <p>Візитів за місяць:</p>
          <h3>80</h3>
        </div>
        <div className="thirdBox">
          <div className="stat-box">
            <p>Записаних прийомів:</p>
            <h3>{appointments.length}</h3>
          </div>
          <div className="stat-box">
            <p>Активних пацієнтів:</p>
            <h3>15</h3>
          </div>
        </div>
      </div>

      <div className="banner">
        <h5>Список прийомів</h5>
        <table>
          <thead>
            <tr>
              <th>Пацієнт</th>
              <th>Дата</th>
              <th>Лікар</th>
              <th>Відділ</th>
              <th>Статус</th>
              <th>Візит</th>
            </tr>
          </thead>
          <tbody>
            {appointments && appointments.length > 0
              ? appointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                    <td>{appointment.appointment_date.substring(0, 16)}</td>
                    <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                    <td>{appointment.department}</td>
                    <td>
                      <select
                        className={
                          appointment.status === "Pending"
                            ? "value-pending"
                            : appointment.status === "Accepted"
                            ? "value-accepted"
                            : "value-rejected"
                        }
                        value={appointment.status}
                        onChange={(e) =>
                          handleUpdateStatus(appointment._id, e.target.value)
                        }
                      >
                        <option value="Pending" className="value-pending">
                          Повторне дослідження
                        </option>
                        <option value="Accepted" className="value-accepted">
                          Бу-ла/-в на прийомі
                        </option>
                        <option value="Rejected" className="value-rejected">
                          Має прийти на прийом
                        </option>
                      </select>
                    </td>
                    <td>
                      {appointment.hasVisited === true ? (
                        <GoCheckCircleFill className="green" />
                      ) : (
                        <AiFillCloseCircle className="red" />
                      )}
                    </td>
                  </tr>
                ))
              : "No Appointments Found!"}
          </tbody>
        </table>
        
      </div>
    </section>
  );
};

export default Dashboard;
