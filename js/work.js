/** @format */

// **************
// Weather APP
// **************
window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    "#temperature-description"
  );
  let temperatureDegree = document.querySelector("#temperature");
  let location = document.querySelector("#location");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lat = position.coords.latitude;
      long = position.coords.longitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/5b356494a91e7d553e9716624d2c9b31/${lat},${long}`;
      console.log(api);

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let temperature = data.currently.temperature;
          const summary = data.currently.summary;
          const loc = data.timezone;
          const icon = data.currently.icon;
          console.log(icon);

            // Converting farenheit to celsius
            temperature = (temperature - 32) / 1.8;
            console.log(temperature);
            //Set DOM elements from fetch api
            temperatureDegree.innerHTML = `Temperature is ${temperature.toFixed(0)}` + '<sup>o</sup>' + ` C`;
            temperatureDescription.textContent = `The weather outside is : ${summary} `;
            location.textContent = `The time zone is : ${loc}`;

            //Set Icon
            setIcons(icon, document.querySelector(".icon"));
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } else {
    alert("Please allow us to access loaction to get weather..!");
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.add("icon", Skycons.currentIcon);
    console.log(currentIcon);
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});

 // **********************
 // BMI Calculator APP
 // **********************
function bmicalc() {
  let weight = document.getElementById("weight").value;
  let height = document.getElementById("height").value;
  if (isNaN(weight) || isNaN(height) || weight == "" || height == "") {
    document.getElementById("result").innerHTML = "Only Numbers are allowed";
    document.getElementById("weight").value = "";
    document.getElementById("height").value = "";
    return;
  }
  // converting kgs to lbs
  let weight1 = parseFloat(weight);
  let height1 = parseFloat(height);
  const weight2 = weight1 * 2.205;
  let height2 = height1 * height1;
  let result = (weight2 / height2) * 703;
  let range;
  if (result < 18.5) {
    range = "underweight";
  } else if (result > 18.5 && result < 24.9) {
    range = "healthy weight";
  } else if (result > 25 && result < 29.9) {
    range = "overweight";
  } else if (result > 30 && result < 39.9) {
    range = "obese";
  } else {
    range = "emergency weight";
  }

 
  document.getElementById("result").innerHTML =
    "Your BMI is " +
    result.toFixed(2) +
    " and You weight category is in " +
    range;
  document.getElementById("weight").value = "";
  document.getElementById("height").value = "";
}
