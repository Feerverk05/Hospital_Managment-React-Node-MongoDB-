import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
const AboutUs = () => {
  return (
    <>
    <Hero title={"Health"} imageUrl={"/t.png"}/>
    <Biography imageUrl={"/d.png"} width="auto" height="200px"/>
    </>
  )
}

export default AboutUs
