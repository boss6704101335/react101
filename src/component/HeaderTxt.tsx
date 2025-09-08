//import { useState } from "react";

import ButtonAdd from "./ButtonAdd";

export default function HeaderTxt(
  { title, txtsize,status }: { title: string, txtsize: string, status: boolean }) {
  //const [count, setCount] = useState(50)
  //const title: string = "CS-MJU"
  
  //const status: boolean = false; // true = เขียว, false = แดง

  return (
    <>
    <h1 style={{ fontSize: `${txtsize}px` }} className={status ? "green-txt" : 
    "red-txt"} >{title}</h1>
    <ButtonAdd />
    </>
  );
}

