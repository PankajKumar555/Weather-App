import { useEffect, useState } from "react";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import Lottie from "react-lottie-player";
import { Col, Row } from "react-bootstrap";
import { MdAir } from "react-icons/md";
import { WiHumidity, WiSunrise } from "react-icons/wi";
import { MdVisibility } from "react-icons/md";
import { BsCloudHaze2Fill } from "react-icons/bs";
import { MdWindPower } from "react-icons/md";
import { TbSunset2 } from "react-icons/tb";
import Clear from "../lottieGif/clear.json";
import Cloud from "../lottieGif/cloud.json";
import Rain from "../lottieGif/rain.json";
import Snow from "../lottieGif/snow.json";
import Thunder from "../lottieGif/thunder.json";
import weekData from "../helperFunction/DayConverter.js";
import cityImageUrls from "../Images/cityImages/CityImageUrls.js";
import { toast } from "react-toastify";
import "./index.css";

function WeatherPage() {
  const [data, setData] = useState(null);
  const [forcastFiveDaysData, setForcastFiveDaysData] = useState(null);
  const [location, setLocation] = useState("Delhi");
  const [sunRise, setSunRise] = useState();
  const [sunSet, setSunSet] = useState();
  const [time, setTime] = useState(new Date());

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=17a7566a835af1a26cb60882e0346245`;
  const urlSevendays = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=17a7566a835af1a26cb60882e0346245&cnt`;
  const formattedName = data && data.name.split(" ").join("");
  const imageUrl = cityImageUrls[formattedName];

  const date = new Date();

  let m = date.getMonth();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[m];

  let d = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[d];

  const addLeadingZero = (num) => {
    return num.toString().padStart(2, "0");
  };

  const showTime =
    addLeadingZero(time.getHours()) +
    ":" +
    addLeadingZero(time.getMinutes()) +
    ":" +
    addLeadingZero(time.getSeconds());

  const showDate = date.getDate() + " " + month + " " + date.getFullYear();

  const showDay = day;

  const searchLocation = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.log("Error fetching data:", error);
      toast.error("You didn't entered correct city name");
    }

    try {
      const response = await axios.get(urlSevendays);
      const dailyData = response.data.list.filter((item, index, self) => {
        return (
          index ===
          self.findIndex(
            (t) =>
              new Date(t.dt_txt).getDate() === new Date(item.dt_txt).getDate()
          )
        );
      });
      setForcastFiveDaysData(dailyData);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const sunRiseAndSet = (timestamp1, timestamp2) => {
    const sunRiseTime = new Date(timestamp1 * 1000);
    const suSetTime = new Date(timestamp2 * 1000);

    const formattedSunRiseTime = formatTime(sunRiseTime);
    const formattedSuSetTime = formatTime(suSetTime);
    setSunRise(formattedSunRiseTime);
    setSunSet(formattedSuSetTime);
  };

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  const change = (event) => {
    setLocation(event.target.value);
  };

  const searchLocationByEnter = (event) => {
    if (event.key === "Enter") {
      searchLocation();
      sunRiseAndSet(data.sys.sunrise, data.sys.sunset);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (data !== null) {
      sunRiseAndSet(data.sys.sunrise, data.sys.sunset);
    }
  }, [data]);

  useEffect(() => {
    searchLocation();
  }, []);

  return (
    <div className="inside-container">
      <div className="search-container">
        <Col>
          <BsSearch className="search-icon" />
          <input
            type="search"
            placeholder="Search"
            className="search"
            onChange={change}
            onKeyPress={searchLocationByEnter}
          />
        </Col>
      </div>
      <div className="live-time-container">
        <Col lg={3} md={6} sm={6} className="cards-col mx-auto">
          <p>Current Weather : {data && data.name ? data.name : ""}</p>
          <div className="gif-temp">
            {data && data.weather[0].main === "Haze" ? (
              <Lottie loop animationData={Clear} play style={{ height: 100 }} />
            ) : (
              ""
            )}
            {data && data.weather[0].main === "Clear" ? (
              <Lottie loop animationData={Clear} play style={{ height: 100 }} />
            ) : (
              ""
            )}
            {data && data.weather[0].main === "Clouds" ? (
              <Lottie loop animationData={Cloud} play style={{ height: 100 }} />
            ) : (
              ""
            )}
            {data && data.weather[0].main === "Rain" ? (
              <Lottie loop animationData={Rain} play style={{ height: 100 }} />
            ) : (
              ""
            )}
            {data && data.weather[0].main === "Mist" ? (
              <Lottie loop animationData={Rain} play style={{ height: 100 }} />
            ) : (
              ""
            )}
            {data && data.weather[0].main === "Drizzle" ? (
              <Lottie loop animationData={Rain} play style={{ height: 100 }} />
            ) : (
              ""
            )}
            {data && data.weather[0].main === "Snow" ? (
              <Lottie loop animationData={Snow} play style={{ height: 100 }} />
            ) : (
              ""
            )}
            {data && data.weather[0].main === "Thunder" ? (
              <Lottie
                loop
                animationData={Thunder}
                play
                style={{ height: 100 }}
              />
            ) : (
              ""
            )}

            <h1>{data && data.main.temp ? data.main.temp : ""}° C</h1>
          </div>
          <p style={{ margin: "0px" }}>{showDate}</p>
          <div className="date-time">
            <p>{showDay}</p>
            <p>{showTime}</p>
          </div>
        </Col>
        <Col
          lg={4}
          md={6}
          sm={6}
          className="cards-col mx-auto"
          style={{ padding: "0px" }}
        >
          <img src={imageUrl} alt="Images Not Found" />
        </Col>
        <Col lg={3} md={6} sm={6} className="cards-col all-values mx-auto">
          <p>
            <span>
              <MdAir />
              &nbsp; Feels Like :{" "}
            </span>
            {data && data.main.feels_like ? data.main.feels_like : ""}
          </p>
          <p>
            <span>
              <WiHumidity />
              &nbsp; Humidity :{" "}
            </span>
            {data && data.main.humidity ? data.main.humidity : ""}
          </p>
          <p>
            <span>
              <MdVisibility />
              &nbsp; Visibility :{" "}
            </span>
            {data && data.visibility ? data.visibility : ""}
          </p>
          <p>
            <span>
              <BsCloudHaze2Fill />
              &nbsp; Description :{" "}
            </span>
            {data && data.weather[0].main ? data.weather[0].main : ""}
          </p>
          <p>
            <span>
              <MdWindPower />
              &nbsp; Wind Speed :{" "}
            </span>
            {data && data.wind.speed ? data.wind.speed : ""}
          </p>
          <p>
            <span>
              <WiSunrise />
              &nbsp; Sunrise :
            </span>
            {sunRise}
          </p>
          <p>
            <span>
              <TbSunset2 />
              &nbsp; Sunset :
            </span>
            {sunSet}
          </p>
        </Col>
      </div>
      <div className="container-forcast-cards">
        {forcastFiveDaysData &&
          Array.isArray(forcastFiveDaysData) &&
          forcastFiveDaysData.map(
            (item, index) =>
              weekData &&
              Array.isArray(weekData) &&
              weekData[index] && (
                <Col
                  lg={2}
                  md={6}
                  sm={6}
                  xs={12}
                  className="forcast-five-days mx-auto"
                  key={index}
                >
                  <p>{weekData[index].dayName}</p>
                  <p>12.00 AM</p>
                  <div className="forcast-five-days-animation">
                    {item && item.weather[0].main === "Haze" ? (
                      <Lottie
                        loop
                        animationData={Clear}
                        play
                        style={{ height: 50 }}
                      />
                    ) : (
                      ""
                    )}
                    {item && item.weather[0].main === "Clear" ? (
                      <Lottie
                        loop
                        animationData={Clear}
                        play
                        style={{ height: 50 }}
                      />
                    ) : (
                      ""
                    )}
                    {item && item.weather[0].main === "Clouds" ? (
                      <Lottie
                        loop
                        animationData={Cloud}
                        play
                        style={{ height: 50 }}
                      />
                    ) : (
                      ""
                    )}
                    {item && item.weather[0].main === "Rain" ? (
                      <Lottie
                        loop
                        animationData={Rain}
                        play
                        style={{ height: 50 }}
                      />
                    ) : (
                      ""
                    )}
                    {item && item.weather[0].main === "Snow" ? (
                      <Lottie
                        loop
                        animationData={Snow}
                        play
                        style={{ height: 50 }}
                      />
                    ) : (
                      ""
                    )}
                    {item && item.weather[0].main === "Thunder" ? (
                      <Lottie
                        loop
                        animationData={Thunder}
                        play
                        style={{ height: 50 }}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <p>
                    Min : &nbsp;{(item.main.temp_min - 273.15).toFixed(2)}°C
                  </p>
                  <p>
                    Max : &nbsp;{(item.main.temp_max - 273.15).toFixed(2)}°C
                  </p>
                </Col>
              )
          )}
      </div>
    </div>
  );
}

export default WeatherPage;
