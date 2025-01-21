import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../main";

const Patient = () => {
  const [patients, setPatients] = useState([
    {
              _id: "1",
              firstName: "Іван",
              lastName: "Іванов",
              email: "ivan@ivanov.com",
              phone: "123-456-789",
              dob: "1990-01-01",
              medicalHistory: "Пневмонія, бронхіт.",
              department: "Терапія",
              gender: "Чоловіча",
            },
            {
              _id: "2",
              firstName: "Марія",
              lastName: "Марченко",
              email: "maria@marchenko.com",
              phone: "987-654-321",
              dob: "1985-05-10",
              medicalHistory: "Алергія на пилок, астма.",
              department: "Пульмонологія",
              gender: "Жіноча",
            },
            {
              _id: "3",
              firstName: "Олександр",
              lastName: "Петров",
              email: "oleksandr@petrov.com",
              phone: "555-123-456",
              dob: "1978-02-25",
              medicalHistory: "Гіпертонія.",
              department: "Кардіологія",
              gender: "Чоловіча",
            },
            {
              _id: "4",
              firstName: "Анна",
              lastName: "Сидоренко",
              email: "anna@syderenko.com",
              phone: "444-987-654",
              dob: "1992-07-14",
              medicalHistory: "Цукровий діабет.",
              department: "Ендокринологія",
              gender: "Жіноча",
            },
            {
              _id: "5",
              firstName: "Микола",
              lastName: "Ковальчук",
              email: "mykola@kovalchuk.com",
              phone: "321-654-987",
              dob: "1980-11-30",
              medicalHistory: "Туберкульоз.",
              department: "Терапія",
              gender: "Чоловіча",
            },
            {
              _id: "6",
              firstName: "Ірина",
              lastName: "Гречко",
              email: "irina@hrechko.com",
              phone: "666-789-123",
              dob: "1995-04-20",
              medicalHistory: "Мігрень.",
              department: "Неврологія",
              gender: "Жіноча",
            },
            {
              _id: "7",
              firstName: "Андрій",
              lastName: "Шевченко",
              email: "andriy@shevchenko.com",
              phone: "777-321-654",
              dob: "1983-09-15",
              medicalHistory: "Бронхіт.",
              department: "Пульмонологія",
              gender: "Чоловіча",
            },
            {
              _id: "8",
              firstName: "Олена",
              lastName: "Левченко",
              email: "olena@levchenko.com",
              phone: "888-432-765",
              dob: "1997-12-05",
              medicalHistory: "Психічні розлади.",
              department: "Психіатрія",
              gender: "Жіноча",
            },
            {
              _id: "9",
              firstName: "Дмитро",
              lastName: "Федоренко",
              email: "dmytro@fedorenko.com",
              phone: "555-123-789",
              dob: "1989-03-18",
              medicalHistory: "Алкогольна залежність.",
              department: "Терапія",
              gender: "Чоловіча",
            },
            {
              _id: "10",
              firstName: "Тетяна",
              lastName: "Мороз",
              email: "tetiana@moroz.com",
              phone: "777-123-456",
              dob: "1993-06-25",
              medicalHistory: "Депресія.",
              department: "Психіатрія",
              gender: "Жіноча",
            },         
  ]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const { isAuthenticated } = useContext(Context);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
  };


  const handleBack = () => {
    setSelectedPatient(null);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setPatients((prevPatients) =>
      prevPatients.map((patient) =>
        patient._id === selectedPatient._id ? selectedPatient : patient
      )
    );
    setEditMode(false);
  };
  const handleChange = (e) => {
    setSelectedPatient({
      ...selectedPatient,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="page patient">
      {selectedPatient ? (
        <div className="patient-details">
          <button onClick={handleBack} className="back-btn">Назад до списку</button>
          <div className="details">
            <h2>{`${selectedPatient.firstName} ${selectedPatient.lastName}`}</h2>
            <p>
              <strong>Email:</strong>
              {editMode ? (
                <input
                  type="email"
                  name="email"
                  value={selectedPatient.email}
                  onChange={handleChange}
                />
              ) : (
                selectedPatient.email
              )}
            </p>
            <p>
              <strong>Телефон:</strong>
              {editMode ? (
                <input
                  type="text"
                  name="phone"
                  value={selectedPatient.phone}
                  onChange={handleChange}
                />
              ) : (
                selectedPatient.phone
              )}
            </p>
            <p>
              <strong>Дата народження:</strong>
              {editMode ? (
                <input
                  type="date"
                  name="dob"
                  value={selectedPatient.dob.substring(0, 10)}
                  onChange={handleChange}
                />
              ) : (
                selectedPatient.dob.substring(0, 10)
              )}
            </p>
            <p>
              <strong>Історія хвороб:</strong>
              {editMode ? (
                <textarea
                  name="medicalHistory"
                  value={selectedPatient.medicalHistory}
                  onChange={handleChange}
                />
              ) : (
                selectedPatient.medicalHistory
              )}
            </p>
            <p>
              <strong>Відділ:</strong>
              {editMode ? (
                <input
                  type="text"
                  name="department"
                  value={selectedPatient.department}
                  onChange={handleChange}
                />
              ) : (
                selectedPatient.department
              )}
            </p>
            <p>
              <strong>Стать:</strong>
              {editMode ? (
                <select
                  name="gender"
                  value={selectedPatient.gender}
                  onChange={handleChange}
                >
                  <option value="Чоловіча">Чоловіча</option>
                  <option value="Жіноча">Жіноча</option>
                </select>
              ) : (
                selectedPatient.gender
              )}
            </p>

            {editMode ? (
              <button onClick={handleSave} className="save-btn">
                Зберегти зміни
              </button>
            ) : (
              <button onClick={handleEdit} className="edit-btn">
                Редагувати
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="patient-list">
          <h1 className="form-title">Пацієнти</h1>
          <div className="patients-container">
            {patients.length > 0 ? (
              patients.map((patient) => (
                <div
                  key={patient._id}
                  className="patient-card"
                  onClick={() => handlePatientClick(patient)}
                >
                  <div className="card-content">
                    <img src="/3.png" alt="patient avatar" className="avatar" />
                    <div className="info">
                      <h4>{`${patient.firstName} ${patient.lastName}`}</h4>
                      <p>
                        <strong>Історія хвороб:</strong> {patient.medicalHistory.substring(0, 100)}...
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h2>Нема пацієнтів!</h2>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Patient;
