import React from "react";
import Hero from "../components/Hero";
import AppointmentForm from "../components/AppointmentForm.jsx";
const Appointment = () => {
  return (
    <>
    <Hero title={"Health"} imageUrl={"/q.png"}/>
  <AppointmentForm/>
    </>
  )
}

export default Appointment;
