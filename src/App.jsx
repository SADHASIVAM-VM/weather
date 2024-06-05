import { useEffect, useState } from "react";
import sunpng from "./assets/pngwing.com.png";
import "./App.css";


const Weath = ({temp, country, air, name, desc,hum, Ftemp, lon, lat}) => {
  return (
    <div className="text-center " >
      <div className="WeatherImg ">
        <img src={sunpng} alt="" />
      </div>
      <div className="ha1 my-3">
      <h1 className="text-yellow-400 text-4xl">{temp}°</h1>
      <div className="cityName">
        <h1 className="text-white text-2xl my-2">
        {name}
          <span>
            <i className="fa-solid fa-location-dot text-sm ms-2 text-yellow-300 "></i>
          </span>
        </h1>
        <p className="text-white">Feels Like :<span className="text-red-400 inline rounded px-2">{Ftemp} °</span> </p>
        <p className=" text-green-400  ">{country}</p>
      </div>

      </div>
      <div className="desc my-2  text-gray-300 my-4">{desc}</div>

      <div className="foot flex justify-between">
        <div className="location text-start">
          <p className="text-gray-400 text-sm ">
            <i class="fa-solid fa-location-crosshairs text-green-300 "></i> {lat}°
          </p>
          <p className="text-gray-400 text-sm">
            <i className="fa-solid fa-location-crosshairs text-red-300"></i>{lon}°
          </p>
        </div>
        <div className="air text-start ">
          <p className="text-gray-400 text-sm">
            <i className="fa-solid fa-wind text-green-400 " /> {air}/kms
          </p>
          <p className="text-gray-400 text-sm">
            <i className="fa-solid fa-droplet text-blue-400 "></i> {hum}%
          </p>
        </div>
      </div>
      <p className="text-white text-sm m-5 bg-red-400 rounded px-2 fot">designed by NotZero</p>
    </div>
  );
};

function App() {
  const [temp, setTemp] = useState();
  const[Ftemp, setFtemp]=useState()
  const [country, setcountry] = useState();
  const [desc, setDesc] = useState();
  const [air, setAir] = useState();
  const [Cname, setCname] = useState();
  const [City, setCity] = useState('Salem');
  const [Ermsg, setEr] = useState(true);
  const [load, setLoad] = useState(false);
  const [icon, setIcon] = useState()
  const [hum, sethum] = useState()
  const [lat, setlat] = useState()
  const [lon, setlon] = useState()


 
  const API = async () => {
    setLoad(true)
    const apis = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=c1d7ad32240ae761f80dcf6141b9e113&unit=metric`
    ).then((res) => res.json());
    if(apis.cod === '404'){
      setEr('City Name Not Found')
      setEr(true)
      setLoad(false)
      return ' ';
    }
    try {

     console.log(apis)
      setTemp((apis.main.temp-273.15).toFixed(1));
      setFtemp((apis.main.feels_like-273.15).toFixed(1));
      setAir(apis.wind.speed);
      setcountry(apis.sys.country);
      setDesc(apis.weather[0].description);
      setCname((apis.name).toUpperCase());
      setIcon(apis.location)   
      sethum(apis.main.humidity)
      setlon((apis.coord.lon).toFixed(1))
      setlat((apis.coord.lat).toFixed(1))

    } catch (er) {

    }
  };
  

  function btna (){
    console.log('clicked')
    API()
  }

  function handleCity(e) {
    setCity(e.target.value);
  }
  useEffect(()=>{ API()},[])

  return (
    <div div className="container text-center">
      <div className="search m-5">
        <form action="" onClick={(e) => e.preventDefault()}>
          <input
            type="text"
            name=""
            id=""
            value={City}
            className="border bg-gray-100 mx-2 mt-2 rounded p-1 text-black"
            placeholder="New York"
            onChange={(e) => handleCity(e)}
          />
        </form>
        <button className="m-3 " onClick={btna}>
          
          <i className="fa-solid fa-location-arrow mt-1 text-black text-xl "></i>
        </button>
      </div>

      <div>
      {Ermsg && <Weath
        name={Cname}
        air={air}
        desc={desc}
        country={country}
        temp={temp}
        hum ={hum}
        Ftemp ={Ftemp}
        lon={lon} lat={lat}
        />}
      </div>
      {/* <p>{Ermsg}</p> */}
    </div>
  );
}
export default App;
