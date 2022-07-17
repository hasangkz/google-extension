import React, { useEffect } from "react";
import "./Home.css";
const Home = () => {
  useEffect(() => {
    var countDownDate = new Date("October 5, 2023 18:19:44").getTime();

    var x = setInterval(function () {
      var now = new Date().getTime();

      var distance = countDownDate - now;

      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById("test").innerHTML =
        days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

      if (distance < 0) {
        clearInterval(x);
        document.getElementById("test").innerHTML = "EXPIRED";
      }
    }, 1000);
  });
  return (
    <div className="bg">
      <div className="middle">
        <h1>COMING SOON</h1>
        <hr />
        <div id="test"></div>
      </div>
    </div>
  );
};
export default Home;
