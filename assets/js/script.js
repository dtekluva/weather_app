var target          = document.getElementsByClassName('options');
var input           = document.getElementsByTagName('input');
var date_target     = document.getElementsByClassName('date')
var country_target  = document.getElementsByClassName('country');
var city_target     = document.getElementsByClassName('city');
var detail_target   = document.getElementsByClassName('weather_details');
var slider_target   = document.getElementsByClassName('slider');
var splash_target   = document.getElementsByClassName('splash');

console.log(slider_target)
detail_target[0].style.display   = "none";

var xhttp           = new XMLHttpRequest();


/*ADD EVENT LISTENERS*/
target[0].addEventListener("click",(e)=>{
    place_city_and_country_name()
    slider_target[0].style.animation = " slide 1s ease-in-out infinite alternate";
     
});

input.text_input.addEventListener("input",(e)=>{

    place_options(input.text_input.value)

});

setInterval(() => {
    date_target["0"].innerHTML=(Date());
}, 1000);


/*FINISHED ADD EVENT LISTENERS*/

function place_city_and_country_name(){
    citylist.forEach(element => {
        if((element.id)==target[0].value){
            country_target[0].innerText   = element.country;
            city_target[0].innerText   = element.name;
            make_request(element.id)
            }
        });
};



function place_options(input_query){
    console.log(input_query)
    var output = ""
    if (input_query.length>2){
        
        citylist.forEach(element => {
            if(((element.name).toLowerCase())==input_query.toLowerCase()){
             output += "<option value=" + element.id + ">" + element.name + "-" + element.country +"</option>"
                }
            });
        target[0].innerHTML= output
    }
}

function make_request(city_id){
    detail_target[0].style.animation = "swell 0.5s ease-in-out infinite alternate";
    console.log("loading data...")
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            populate_weather_data(JSON.parse(this.responseText));
        }
    };
    xhttp.open("GET", "https://api.openweathermap.org/data/2.5/forecast?id=" + city_id + "&APPID=7d740708090dd65a4ddd2db1f445504e", true);
    xhttp.send();
};

function populate_weather_data(jason_data){
    var output=" "
    jason_data.list.forEach(element => {
        var iter = 0;
        url = "http://openweathermap.org/img/w/" +  element.weather[0].icon+ ".png";

        output += "<div><span><img src=" + url + " alt=><h4>" + element.weather[0].description + 
                 "</h4> </span><span><h4>Time</h4> <br> <p>" + element.dt_txt + "</p> </span><span><h4>Humidity</h4> <br> <p>"
                 + element.main.humidity + "</p> </span><span><h4>Temp</h4> <br> <p>" + element.main.temp + 
                 "°k</p> </span><span><h4>Wind</h4> <br> <p>" + element.wind.speed + "m/s</p> </span></div><hr><hr>";

        detail_target[0].innerHTML = output;
        detail_target[0].style.display   = "";
        slider_target[0].style.animation = "";
        splash_target[0].style.display   = "none";        
    });
};

// async function getText(file) {
//     let myObject = await fetch(file);
//     let myText = await myObject.json();
//     console.log(myText);
//     document.getElementById("target").innerText = myText.authenticatedData.name;
//     }

// getText("https://wyre22.pythonanywhere.com/api/v1/dashboard/2/01-12-2020%2000:00/20-12-2020%2000:00")

var url = "https://wyre22.pythonanywhere.com/api/v1/dashboard/2/01-12-2020%2000:00/20-12-2020%2000:00";
var auth = "https://wyre22.pythonanywhere.com/api/v1/auth/";

(async () => {
    const rawResponse = await fetch(auth, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
                                "username": "admin",
                                "password" : "19sedimat54"
                            })
    });
    const content = await rawResponse.json();
  
    console.log(content);
  })();