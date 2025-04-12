
let mapElement=document.getElementById('map');
function marker(){
var map = L.map('map').setView([51.505, -0.09], 2);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
L.marker([51.5, -0.09]).addTo(map);
L.popup()
    .setLatLng([51.5, -0.09])
    .setContent(`<div class="popupColor">Welcome to my weather website</div>`)
    .addTo(map);//here addTo is used to show welcome content all the time on the map


// map maker on location being clicked

locationElement.addEventListener("click",()=>{
    mapElement.scrollIntoView({ behavior: 'smooth' });
    L.marker([locationData.lat,locationData.lon]).addTo(map);
  
    L.circle([locationData.lat,locationData.lon], {
        color: 'red',
         fillColor: '#f03',
        fillOpacity: 0.9,
     radius: 5
 }).addTo(map);//her addTo is used to add every marker to the map without removing the previous one

 var temp=`${currentWeather.temp_c}°C`;
 var location=`${locationData.name},${locationData.country}`;
 var description=`${currentWeather.condition.text}`;

    L.popup()
.setLatLng([locationData.lat,locationData.lon])
.setContent(`<div class="popupColor">Location: ${location}<br>Temperature: ${temp}<br>Condition: ${description}</div>`)
.openOn(map);//here open is used to close the previous popup and open the new one    
})


}
 
   


