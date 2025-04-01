import React from "react";
import { FaStar } from "react-icons/fa";

export default function Stars() {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <FaStar key={index} className=" text-amber-300 text-xl" />
  ));

  return <>{stars}</>;
}
