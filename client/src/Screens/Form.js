import React, { useEffect, useState } from "react";
import "./form.css";
import Memes from "./Memes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HandleForm from "./HandleForm";
import Navbar from "./Navbar";

toast.configure();
const FormDiv = () => {
  const [memes, setMemes] = useState([]);

  // will fetch whenever something changes on page like user edited page or uploaded a new meme
  useEffect(() => {
    fetchMemes();
  }, []);

  // function to fetch memes from server
  function fetchMemes() {
    fetch("/memes")
      .then((res) => res.json())
      .then((res) => {
        console.log(res.memes);
        const d = new Date(res.memes.length > 0 && res.memes[0].createdAt);
        console.log(d.toLocaleString());
        setMemes(res.memes);
      });
  }

  return (
    <div>
      {/* <h1 className="heading">Meme Stream</h1> */}
      <Navbar />
      <HandleForm fetchMemes={fetchMemes} />
      <Memes memes={memes} />
    </div>
  );
};

export default FormDiv;
