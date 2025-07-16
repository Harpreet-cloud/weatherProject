//global variables
 let allResponses;
 let allResponsesJson;
 let currentWeather;
 let locationData;
 let forecastData;
 let forecastArray =[];
 scrollButton=document.getElementById("btn");
 const locationElement=document.getElementById("location");
 const dropdownElement=document.getElementById("dropdown");



//calling 3 api and converting response into json
async function getDataFromAllAPI() {
    allLocations=['https://gist.githubusercontent.com/harpreetdhindsa/78130dd85ae8c2abb29c7399297eb35b/raw/e67bf57d91371aec84a8434c28267bb456f6b8bc/gistfile1.json',
        'https://gist.githubusercontent.com/harpreetdhindsa/46621f6b54221d85e431be8f6adebcc8/raw/cfc31fad4a064ab49c9be6a17cc90bdf4151a21c/gistfile1.json',
        'https://gist.githubusercontent.com/harpreetdhindsa/79091dd06ffbd69ca187e3e16927edf8/raw/ad32b8a8c4ab1edf2a4f6233df2b006b9f575f33/gistfile1.json'
        ];
        try{
 //here map is giving you an array of promises to fetch 3 urls and Promise.all is executing that promise in parallel which is faster than sequential order of await
      
 allResponses = await Promise.all(allLocations.map(url => fetch(url)));
 allResponsesJson=await Promise.all(allResponses.map(response => response.json()));
        }
        catch(e){
            console.error("unable to fetch url");
        }
}


//display location data
function renderLocation(){
locationElement.innerHTML=`${locationData.name},${locationData.country}`;
const locationtimeElement=document.getElementById("locationtime");
locationtimeElement.innerText=`${locationData.localtime}`;
console.log(locationData);

}

// display current weather conditions 
function renderCurrentWeather(){

const tempElement=document.getElementById("temp");
tempElement.innerText=`${currentWeather.temp_c}°C`;

const iconElement=document.getElementById("icon");
iconElement.src=`${currentWeather.condition.icon}`;
iconElement.alt=`${currentWeather.condition.text}`;


const conditionElement=document.getElementById("condition");
conditionElement.innerText=`${currentWeather.condition.text}`;

const windgustElement=document.getElementById("windgust");
windgustElement.innerText=`${currentWeather.gust_kph}`;

const windGlElement=document.getElementById("windG");
windGlElement.innerText="WindGusts";

const feelslikeElement=document.getElementById("feelslike");
feelslikeElement.innerText=`${currentWeather.feelslike_c}°C`;

const feellikeLabel=document.getElementById("feelslikeLabel");
feellikeLabel.innerText="FeelsLike";

const dewpointElement=document.getElementById("dewpoint");
dewpointElement.innerText=`${currentWeather.dewpoint_c}°C`;

const dewpointlabel=document.getElementById("dewpointlabel");
dewpointlabel.innerText="DewPoint";

const humidityElement=document.getElementById("humidity");
humidityElement.innerText=`${currentWeather.humidity}`;

const humiditylabel=document.getElementById("humiditylabel");
humiditylabel.innerText="Humidity";

const heatindex=document.getElementById("heat");
heatindex.innerText=`${currentWeather.heatindex_c}°C`;

const heatlabel=document.getElementById("heatlabel");
heatlabel.innerText="HeatIndex";

const windchill=document.getElementById("windchill");
windchill.innerText=`${currentWeather.windchill_c}°C`;

const windlabel=document.getElementById("windlabel");
windlabel.innerText="WindChill";

}
//forecast weather 
 function renderForecast(){
    const dateElement=document.querySelectorAll(".date");
    console.log(dateElement);
    //here forEach is used because you are iterating over every single element in the array without stopping 
    dateElement.forEach((element, index) => {
        element.innerText=forecastArray[index].date;
       
    });
   
    
    const textElement=document.querySelectorAll(".text");
    textElement.forEach((element,index) =>{
       element.innerText=forecastArray[index].day.condition.text;
      
    });
    const conditioniconElement=document.querySelectorAll(".conditionicon");
    conditioniconElement.forEach((element,index) =>{
   element.src=`${forecastArray[index].day.condition.icon}`;
   element.alt=`${forecastArray[index].day.condition.text}`;


});
const maxtempElement=document.querySelectorAll(".maxtemp");
maxtempElement.forEach((element,index) =>{
    element.innerText=`${forecastArray[index].day.maxtemp_c}°C`;
   
});
const labelElement=document.querySelectorAll(".maxlabel");
labelElement.forEach((element,index) =>{
    element.innerText="High";
  
});

const mintempElement=document.querySelectorAll(".mintemp");
mintempElement.forEach((element,index) =>{
    element.innerText=`${forecastArray[index].day.mintemp_c}°C`;
   
});
const labelElement2=document.querySelectorAll(".minlabel");
labelElement2.forEach((element,index) =>{
    element.innerText="Low";
   
});

const feelsElement=document.querySelectorAll(".feels");
feelsElement.forEach((element,index) =>{
    element.innerText=`${forecastArray[index].day.daily_chance_of_rain}%`;
  
});
const labelElement3=document.querySelectorAll(".feelsL");
labelElement3.forEach((element,index) =>{
    element.innerText="Rain";
  
});

}


//function to display weather for default location
function defaultSelection() {

    const defaultCity=dropdownElement.value[0];
    calledApi =  allResponsesJson[defaultCity];

    if (calledApi) {
        currentWeather = calledApi.current;
        renderCurrentWeather();
        locationData = calledApi.location;
        renderLocation();
        forecastData = calledApi.forecast;
        forecastArray = [...forecastData.forecastday];
        renderForecast();
        console.log(forecastArray);
        
    }
    else{
        alert(`unable to fetch data for default location ${defaultCity} at this time`);
    }
    
}

dropdownElement.addEventListener('change',(e)=>{
    
    const selectedCityIndex=e.target.value;
   // console.log(selectedCityIndex);
    //call the appropriate api based on the index of selected city
    const calledApi=allResponsesJson[selectedCityIndex];
    // console.log(calledApi);
if(calledApi){
//changes  data as per the selected api
currentWeather=calledApi.current;
locationData=calledApi.location;
forecastData=calledApi.forecast;
forecastArray=[...forecastData.forecastday];
renderLocation();
renderCurrentWeather();
renderForecast();
}
else{
    
    alert(`Unable to fetch data for selected location: ${selectedCityIndex} at this time`);
}

});

//creating dynamic class floating when scrolling down until 200px
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      scrollButton.classList.add('floating');
    } else {
      scrollButton.classList.remove('floating');
    }
  });
// adding click event to scroll back to location
scrollButton.addEventListener("click",()=>{
        locationElement.scrollIntoView({ behavior: 'smooth'})
        });
   

async function maindata()
{
    await getDataFromAllAPI();
    defaultSelection(); 
    marker();
 
}


maindata();


