export async function getInfo() {
  let today = new Date(); //date today
  let destination = encodeURI(document.getElementById("city").value); // to where
  let destination_show = document.getElementById("city").value;// to where
  let date_in_show = document.getElementById("date_in").value // departure
  let date_out_show = document.getElementById("date_out").value // out
  //https://www.javatpoint.com/calculate-days-between-two-dates-in-javascript
  let date_in = new Date(document.getElementById("date_in").value)
  let date_out = new Date(document.getElementById("date_out").value)
  let time_difference = date_out.getTime() - date_in.getTime(); // length of trip
   //calculate days difference by dividing total milliseconds in a day
  let result = time_difference / (1000 * 60 * 60 * 24);
  console.log(result);

  let toTrip = date_in.getTime() - today.getTime();
  let toTripFinal = parseInt(toTrip / (1000 * 60 * 60 * 24));
  console.log(toTripFinal);

//>>> start to get keys for API <<<
  const AllUserData = async ()=> {
       const resp1 = await fetch ('/allkeys')
       try {
           const AllUserData = await resp1.json()
           return AllUserData;
       } catch (error) {
           console.log("XERROR: KEY X", error)
       }
   }
   const AllAPIKeys = await AllUserData();
   const keyCity = AllAPIKeys.UserGeo ;
   const key_weather = AllAPIKeys.UserWeather;
   const key_pixaBay = AllAPIKeys.UserPixa;

   //parametere for city data
// >>> start to get the information from geoAPI and get the lat and lng to use it in the other apis (pixa and weatherbit) <<<
   const geoURL = 'http://api.geonames.org/searchJSON?q';
   const geoFinalFormat =`${geoURL}=${destination}&maxRows=1&username=${keyCity}`;
   console.log(geoFinalFormat);
   console.log(destination);

  const retData = async () => {
      try {
          const response = await fetch (geoFinalFormat)
          const data = await response.json()
           console.log(data);
           return data;
          } catch (error) {
          console.log(" XERROR: DATA X", error)
          }
  }
  let cityInfo = {};
  const useDataC = async () =>  {
    const data = await retData();
      cityInfo = {
      cityName: data.geonames[0].name,
      country: data.geonames[0].countryName,
      lat: data.geonames[0].lat,
      lng: data.geonames[0].lng,
    }
     console.log('heloo',cityInfo.cityName);
     document.getElementById('subject').innerHTML  = "Your trip is for "+result+" day/s, "+toTripFinal+" day/s To Trip";
     document.getElementById('desti').innerHTML  = "<strong>To: </strong>"+cityInfo.cityName+"<strong> From: </strong>"+date_in_show.split("-").reverse().join("-")+"<strong> Till: </strong>"+date_out_show.split("-").reverse().join("-")+".";
    return cityInfo;
  }
  // get the current weather data
  const coords = await useDataC();
  let lat = coords.lat;
  let long = coords.lng;

   console.log(key_weather);

/// now forecast
const weatURLNOW = 'https://api.weatherbit.io/v2.0/current?';
const weatherFinalFormatNOW =`${weatURLNOW}&lat=${lat}&lon=${long}&key=${key_weather}&include=minutely`;
console.log(weatherFinalFormatNOW);
 const retDatawNOW = async () => {
   try {
       const responsewNOW = await fetch (weatherFinalFormatNOW)
       const datawNOW = await responsewNOW.json()
        console.log(datawNOW);
        return datawNOW;
       } catch (error) {
       console.log(" XERROR: DATA X", error)
       }
}
const useDataWNOW = async ()=>  {
 const datawNOW = await retDatawNOW();
   let weatherInfoNOW ={
   Tempn: datawNOW.data[0].temp,
 }
 console.log(weatherInfoNOW);
  console.log(weatherInfoNOW.Tempn);
  document.getElementById('temp').innerHTML  = "<strong>Temperature Now: </strong>"+weatherInfoNOW.Tempn +" C° in "+ destination_show
}

/// daily forecast
   const weatURL = 'https://api.weatherbit.io/v2.0/forecast/daily?';
   //const weatherFinalFormat =`${weatURL}&lat=${lat}&lon=${long}&days=${difference}&key=${key_weather}`;
   const weatherFinalFormat =`${weatURL}&lat=${lat}&lon=${long}&days=5&key=${key_weather}`
   console.log(weatherFinalFormat);
    const retDataw = async () => {
      try {
          const responsew = await fetch (weatherFinalFormat)
          const dataw = await responsew.json()
           console.log(dataw);
           return dataw;
          } catch (error) {
          console.log(" XERROR: DATA X", error)
          }
  }
  const useDataW = async ()=>  {
    const dataw = await retDataw();
      let weatherInfo ={
      dateWeather: dataw.data[0].datetime,
      maxTemp: dataw.data[0].max_temp,
      minTemp: dataw.data[0].min_temp,
      dataPop: dataw.data[0].pop,
      icon: dataw.data[0].weather.icon,

      dateWeather1: dataw.data[1].datetime,
      maxTemp1: dataw.data[1].max_temp,
      minTemp1: dataw.data[1].min_temp,
      dataPop1: dataw.data[1].pop,
      icon1: dataw.data[1].weather.icon,

      dateWeather2: dataw.data[2].datetime,
      maxTemp2: dataw.data[2].max_temp,
      minTemp2: dataw.data[2].min_temp,
      dataPop2: dataw.data[2].pop,
      icon2: dataw.data[2].weather.icon,
    }
    console.log(weatherInfo);
     console.log(weatherInfo.maxTemp);
     document.getElementById('forecast').innerHTML  = weatherInfo.dateWeather.split("-").reverse().join("-") +"<strong> Min: </strong>"+weatherInfo.minTemp +" C° <strong>Max: </strong>"+ weatherInfo.maxTemp+" C°"+`<img class="iconsize" src="./media/icons/${weatherInfo.icon}.png" alt="no image" /> <br />`+
     weatherInfo.dateWeather1.split("-").reverse().join("-")+"<strong> Min: </strong>"+weatherInfo.minTemp1 +" C° <strong>Max: </strong>"+ weatherInfo.maxTemp1+" C°"+`<img class="iconsize" src="./media/icons/${weatherInfo.icon1}.png" alt="no image" /> <br />`+
     weatherInfo.dateWeather2.split("-").reverse().join("-")+"<strong> Min: </strong>"+weatherInfo.minTemp2 +" C° <strong>Max: </strong>"+ weatherInfo.maxTemp2+" C°"+`<img class="iconsize" src="./media/icons/${weatherInfo.icon2}.png" alt="no image" /> <br />`;
  }

// get images of destination
// >>> get the first image in the array of the requested destination <<<

  console.log(key_pixaBay);
 const pixaURL = 'https://pixabay.com/api/?key=';
 const type ='type'
 const pixaFinalFormat =`${pixaURL}${key_pixaBay}&q=${destination}&image_type=${type}`;
 console.log(pixaFinalFormat);
  const retDataP = async () => {
    try {
        const responseP = await fetch (pixaFinalFormat)
        const dataP = await responseP.json()
         console.log(dataP);
         return dataP;
        } catch (error) {
        console.log(" XERROR: DATA X", error)
        }
}
const useDataP = async ()=>  {
  const dataP = await retDataP();
    let pixaImg ={
    img1: dataP.hits[0].webformatURL,
  }
   console.log(pixaImg);
   console.log(pixaImg.img1);
   document.getElementById('pixa').innerHTML  = `<img id="imgwh" class="adjust" src="${pixaImg.img1}" alt="">`;
}
/*
setTimeout(useDataC(), 3000);
setTimeout(useDataW(), 3000);
setTimeout(useDataP(), 3000);
setTimeout(useDataWNOW(), 3000);
*/
 useDataC()
 useDataW()
 useDataP()
 useDataWNOW()

}
