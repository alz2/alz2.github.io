// Modulate Profile Picture on click.
let normalProfilePic = true;
let bioImg = document.getElementById("bio-pic");
bioImg.onclick =
    () => {
      normalProfilePic = !normalProfilePic;
      bioImg.src = normalProfilePic ? "assets/images/profile.jpg"
                                    : "assets/images/profile2.jpg";
    }

// Firebase configuration.
// https://stackoverflow.com/questions/37482366/is-it-safe-to-expose-firebase-apikey-to-the-public
var firebaseConfig = {
  apiKey : "AIzaSyC2ZfdG4OeGSB94NWmQyfX8tZWT7vLb85Y",
  authDomain : "personalwebsitevisitorstats.firebaseapp.com",
  databaseURL : "https://personalwebsitevisitorstats.firebaseio.com",
  projectId : "personalwebsitevisitorstats",
  storageBucket : "personalwebsitevisitorstats.appspot.com",
  messagingSenderId : "558349611639",
  appId : "1:558349611639:web:5934c30c0a742ecdca8c72",
  measurementId : "G-Z0FKR289DS"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.database();

function IncrementLocationCount(country, state) {
  const locKey = country + '-' + state;
  db.ref('visitors/' + locKey)
      .child("count")
      .set(firebase.database.ServerValue.increment(1));
}

function LogCities(country, state, city) {
  function GetDateTime() {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' +
               today.getDate();
    let time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date + ' ' + time;
  }

  const locKey = country + '-' + state;
  let visitRef = db.ref('cities/' + locKey + '/' + city.toUpperCase()).push();
  visitRef.set({time : GetDateTime()});
}

// Retrieve Geo data based on IP and then increment location in firebase.
// Additionally log a city with time information.
const ipGeoLookup = "https://ipapi.co/json/";
fetch(ipGeoLookup).then(response => response.json()).then(data => {
  IncrementLocationCount(data.country, data.region_code);
  LogCities(data.country, data.region_code, data.city);
});
