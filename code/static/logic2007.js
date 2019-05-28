// Create a map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 2
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 40,
  id: "mapbox.streets-basic",
  accessToken: API_KEY
}).addTo(myMap);

// Define a markerSize function that will give each city a different radius based on its population
function markerSize(minute_mac) {
  return minute_mac * 10000;
}

// Each city object contains the city's name, location and population
var cities = [
  // {
  //   "Country": "Australia",
  //   "Minimum_Wage_hour": 14.14,
  //   "Minimum_Wage_Min": 0.235666667,
  //   "Bigmac": 4.352045,
  //   "minute_mac": 18.46695188,
  //   "Lat": -25.274398,
  //   "Lon": 133.775136,
  //   "location": [-25.274398,133.775136]
  // },
  // {
  //   "Country": "New Zealand",
  //   "Minimum_Wage_hour": 11.28,
  //   "Minimum_Wage_Min": 0.188,
  //   "Bigmac": 4.1912,
  //   "minute_mac": 22.29361702,
  //   "Lat": -40.900557,
  //   "Lon": 174.885971,
  //   "location": [-40.900557,174.885971]
  // },
  // {
  //   "Country": "France",
  //   "Minimum_Wage_hour": 11.24,
  //   "Minimum_Wage_Min": 0.187333333,
  //   "Bigmac": 4.81383,
  //   "minute_mac": 25.69660147,
  //   "Lat": 46.227638,
  //   "Lon": 2.213749,
  //   "location": [46.227638,2.213749]
  // },
  // {
  //   "Country": "Netherlands",
  //   "Minimum_Wage_hour": 11.01,
  //   "Minimum_Wage_Min": 0.1835,
  //   "Bigmac": 4.5846,
  //   "minute_mac": 24.98419619,
  //   "Lat": 52.132633,
  //   "Lon": 5.291266,
  //   "location": [52.132633,5.291266]
  // },
  // {
  //   "Country": "Ireland",
  //   "Minimum_Wage_hour": 10.87,
  //   "Minimum_Wage_Min": 0.181166667,
  //   "Bigmac": 4.6648305,
  //   "minute_mac": 25.74883436,
  //   "Lat": 53.41291,
  //   "Lon": -8.24389,
  //   "location": [53.41291,-8.24389]
  // },
  // {
  //   "Country": "Belgium",
  //   "Minimum_Wage_hour": 10.78,
  //   "Minimum_Wage_Min": 0.179666667,
  //   "Bigmac": 4.81383,
  //   "minute_mac": 26.79311683,
  //   "Lat": 50.503887,
  //   "Lon": 4.469936,
  //   "location": [50.503887,4.469936]
  // },
  // {
  //   "Country": "Germany",
  //   "Minimum_Wage_hour": 10.06,
  //   "Minimum_Wage_Min": 0.167666667,
  //   "Bigmac": 4.722138,
  //   "minute_mac": 28.16384487,
  //   "Lat": 51.165691,
  //   "Lon": 10.451526,
  //   "location": [51.165691,10.451526]
  // },
  {
    "Country": "Euro Area",
    "Minimum_Wage_hour": 9.74,
    "Minimum_Wage_Min": 0.162333333,
    "Bigmac": 4.6419075,
    "minute_mac": 27.28905,
    "Lat": 55.378051,
    "Lon": -3.435973,
    "location": [55.378051,-3.435973]
  },
  // {
  //   "Country": "Canada",
  //   "Minimum_Wage_hour": 9.06,
  //   "Minimum_Wage_Min": 0.151,
  //   "Bigmac": 5.084873066,
  //   "minute_mac": 33.67465607,
  //   "Lat": 56.130366,
  //   "Lon": -106.346771,
  //   "location": [56.130366,-106.346771]
  // },
  {
    "Country": "Japan",
    "Minimum_Wage_hour": 7.61,
    "Minimum_Wage_Min": 0.126833333,
    "Bigmac": 3.596458871,
    "minute_mac": 20.33133,
    "Lat": 36.204824,
    "Lon": 138.252924,
    "location": [36.204824,138.252924]
  },
  {
    "Country": "United States",
    "Minimum_Wage_hour": 7.31,
    "Minimum_Wage_Min": 0.121833333,
    "Bigmac": 5.58,
    "minute_mac": 29.51721,
    "Lat": 37.09024,
    "Lon": -95.712891,
    "location": [37.09024,-95.712891]
  },
  // {
  //   "Country": "South Korea",
  //   "Minimum_Wage_hour": 6.71,
  //   "Minimum_Wage_Min": 0.111833333,
  //   "Bigmac": 4.02288575,
  //   "minute_mac": 35.97215286,
  //   "Lat": 35.907757,
  //   "Lon": 127.766922,
  //   "location": [35.907757,127.766922]
  // },
  // {
  //   "Country": "Slovenia",
  //   "Minimum_Wage_hour": 5.51,
  //   "Minimum_Wage_Min": 0.091833333,
  //   "Bigmac": 2.636145,
  //   "minute_mac": 28.70575328,
  //   "Lat": 46.151241,
  //   "Lon": 14.995463,
  //   "location": [46.151241,14.995463]
  // },
  // {
  //   "Country": "Spain",
  //   "Minimum_Wage_hour": 5.07,
  //   "Minimum_Wage_Min": 0.0845,
  //   "Bigmac": 4.5272925,
  //   "minute_mac": 53.57742604,
  //   "Lat": 40.463667,
  //   "Lon": -3.74922,
  //   "location": [40.463667,-3.74922]
  // },
  // {
  //   "Country": "Portugal",
  //   "Minimum_Wage_hour": 3.97,
  //   "Minimum_Wage_Min": 0.066166667,
  //   "Bigmac": 3.7249875,
  //   "minute_mac": 56.29704002,
  //   "Lat": 39.399872,
  //   "Lon": -8.224454,
  //   "location": [39.399872,-8.224454]
  // },
  // {
  //   "Country": "Greece",
  //   "Minimum_Wage_hour": 3.86,
  //   "Minimum_Wage_Min": 0.064333333,
  //   "Bigmac": 3.8396025,
  //   "minute_mac": 59.68294072,
  //   "Lat": 39.074208,
  //   "Lon": 21.824312,
  //   "location": [39.074208,21.824312]
  // },
  // {
  //   "Country": "Estonia",
  //   "Minimum_Wage_hour": 3.38,
  //   "Minimum_Wage_Min": 0.056333333,
  //   "Bigmac": 3.66768,
  //   "minute_mac": 65.10674595,
  //   "Lat": 58.595272,
  //   "Lon": 25.013607,
  //   "location": "58.595272,25.013607"
  // },
  // {
  //   "Country": "Poland",
  //   "Minimum_Wage_hour": 3.24,
  //   "Minimum_Wage_Min": 0.054,
  //   "Bigmac": 2.801157812,
  //   "minute_mac": 51.87329281,
  //   "Lat": 51.919438,
  //   "Lon": 19.145136,
  //   "location": [51.919438,19.145136]
  // },
  // {
  //   "Country": "Czech Republic",
  //   "Minimum_Wage_hour": 3.16,
  //   "Minimum_Wage_Min": 0.052666667,
  //   "Bigmac": 3.80966894,
  //   "minute_mac": 72.33548574,
  //   "Lat": 49.817492,
  //   "Lon": 15.472962,
  //   "location": [49.817492,15.472962]
  // },
  // {
  //   "Country": "Slovakia",
  //   "Minimum_Wage_hour": 3.14,
  //   "Minimum_Wage_Min": 0.052333333,
  //   "Bigmac": 3.66768,
  //   "minute_mac": 70.08305777,
  //   "Lat": 48.669026,
  //   "Lon": 19.699024,
  //   "location": [48.669026,19.699024]
  // },
  // {
  //   "Country": "Croatia",
  //   "Minimum_Wage_hour": 3.03,
  //   "Minimum_Wage_Min": 0.0505,
  //   "Bigmac": 3.241315974,
  //   "minute_mac": 64.18447474,
  //   "Lat": 45.1,
  //   "Lon": 15.2,
  //   "location": [45.1,15.2]
  // },
  // {
  //   "Country": "Hungary",
  //   "Minimum_Wage_hour": 2.92,
  //   "Minimum_Wage_Min": 0.048666667,
  //   "Bigmac": 3.032803336,
  //   "minute_mac": 62.31787634,
  //   "Lat": 47.162494,
  //   "Lon": 19.503304,
  //   "location": [47.162494,19.503304]
  // },
  // {
  //   "Country": "Latvia",
  //   "Minimum_Wage_hour": 2.89,
  //   "Minimum_Wage_Min": 0.048166667,
  //   "Bigmac": 3.20922,
  //   "minute_mac": 66.62740438,
  //   "Lat": 56.879635,
  //   "Lon": 24.603189,
  //   "location": [56.879635,24.603189]
  // },
  // {
  //   "Country": "Argentina",
  //   "Minimum_Wage_hour": 2.88,
  //   "Minimum_Wage_Min": 0.048,
  //   "Bigmac": 2.002402883,
  //   "minute_mac": 41.71672674,
  //   "Lat": -38.416097,
  //   "Lon": -63.616672,
  //   "location": [-38.416097,-63.616672]
  // },
  // {
  //   "Country": "Turkey",
  //   "Minimum_Wage_hour": 2.87,
  //   "Minimum_Wage_Min": 0.047833333,
  //   "Bigmac": 1.996879296,
  //   "minute_mac": 41.74660577,
  //   "Lat": 38.963745,
  //   "Lon": 35.243322,
  //   "location": [38.963745,35.243322]
  // },
  // {
  //   "Country": "Romania",
  //   "Minimum_Wage_hour": 2.84,
  //   "Minimum_Wage_Min": 0.047333333,
  //   "Bigmac": 2.286725925,
  //   "minute_mac": 48.31111143,
  //   "Lat": 45.943161,
  //   "Lon": 24.96676,
  //   "location": [45.943161,24.96676]
  // },
  // {
  //   "Country": "Lithuania",
  //   "Minimum_Wage_hour": 2.79,
  //   "Minimum_Wage_Min": 0.0465,
  //   "Bigmac": 3.2665275,
  //   "minute_mac": 70.24790323,
  //   "Lat": 55.169438,
  //   "Lon": 23.881275,
  //   "location": [55.169438,23.881275]
  // },
  // {
  //   "Country": "Brazil",
  //   "Minimum_Wage_hour": 1.43,
  //   "Minimum_Wage_Min": 0.023833333,
  //   "Bigmac": 4.545515674,
  //   "minute_mac": 190.72094,
  //   "Lat": -14.235004,
  //   "Lon": -51.92528,
  //   "location": [-14.235004,-51.92528]
  // },
  // {
  //   "Country": "Russia",
  //   "Minimum_Wage_hour": 0.94,
  //   "Minimum_Wage_Min": 0.015666667,
  //   "Bigmac": 1.652095674,
  //   "minute_mac": 105.4529131,
  //   "Lat": 61.52401,
  //   "Lon": 105.318756,
  //   "location": [61.52401,105.318756]
  // },
  // {
  //   "Country": "Ukraine",
  //   "Minimum_Wage_hour": 0.84,
  //   "Minimum_Wage_Min": 0.014,
  //   "Bigmac": 1.942446043,
  //   "minute_mac": 138.7461459,
  //   "Lat": 48.379433,
  //   "Lon": 31.16558,
  //   "location": [48.379433,31.16558]
  // },
  // {
  //   "Country": "Moldova",
  //   "Minimum_Wage_hour": 0.77,
  //   "Minimum_Wage_Min": 0.012833333,
  //   "Bigmac": 2.317094364,
  //   "minute_mac": 180.5528122,
  //   "Lat": 47.411631,
  //   "Lon": 28.369885,
  //   "location": [47.411631,28.369885]
  // }
];

// Loop through the cities array and create one marker for each city object
for (var i = 0; i < cities.length; i++) {
  L.circle(cities[i].location, {
    fillOpacity: 0.75,
    color: "white",
    fillColor: "purple",
    // Setting our circle's radius equal to the output of our markerSize function
    // This will make our marker's size proportionate to its population
    radius: markerSize(cities[i].minute_mac)
  }).bindPopup("<h1>" + cities[i].Country + "</h1> <hr> <h3>minute_mac: " + cities[i].minute_mac + "</h3>").addTo(myMap);
}