// https://www.amcharts.com/demos/us-heat-map/

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

function CreateVisitorHeatMap(data) {
  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end

  // Create map instance
  var chart = am4core.create("chartdiv", am4maps.MapChart);

  // Set map definition
  chart.geodata = am4geodata_usaLow;

  // Set projection
  chart.projection = new am4maps.projections.AlbersUsa();

  // Create map polygon series
  var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

  // Set min/max fill color for each area
  polygonSeries.heatRules.push({
    property : "fill",
    target : polygonSeries.mapPolygons.template,
    min : chart.colors.getIndex(1).brighten(1),
    max : chart.colors.getIndex(1).brighten(-0.3)
  });

  // Make map load polygon data (state shapes and names) from GeoJSON
  polygonSeries.useGeodata = true;

  // Set heatmap values for each state
  polygonSeries.data = data;

  // Set up heat legend
  let heatLegend = chart.createChild(am4maps.HeatLegend);
  heatLegend.series = polygonSeries;
  heatLegend.align = "right";
  heatLegend.valign = "bottom";
  heatLegend.width = am4core.percent(20);
  heatLegend.marginRight = am4core.percent(4);
  heatLegend.minValue = 0;
  heatLegend.maxValue = 40000000;

  // Set up custom heat map legend labels using axis ranges
  var minRange = heatLegend.valueAxis.axisRanges.create();
  minRange.value = heatLegend.minValue;
  minRange.label.text = "Little";
  var maxRange = heatLegend.valueAxis.axisRanges.create();
  maxRange.value = heatLegend.maxValue;
  maxRange.label.text = "A lot!";

  // Blank out internal heat legend value axis labels
  heatLegend.valueAxis.renderer.labels.template.adapter.add(
      "text", function(labelText) { return ""; });

  // Configure series tooltip
  var polygonTemplate = polygonSeries.mapPolygons.template;
  polygonTemplate.tooltipText = "{name}: {value}";
  polygonTemplate.nonScalingStroke = true;
  polygonTemplate.strokeWidth = 0.5;

  // Create hover state and set alternative fill color
  var hs = polygonTemplate.states.create("hover");
  hs.properties.fill = am4core.color("#3c5bdc");
}

var visitorsRef = db.ref().child("visitors/");
visitorsRef.once("value", function(snapshot) {
  // list of objects looking like {id : "US-NM", value : 1819046}
  let visitorChartData = [];
  snapshot.forEach(function(child) {
    if (child.key.startsWith("US-")) {
      visitorChartData.push({id : child.key, value : child.val().count});
    }
  });
  am4core.ready(() => CreateVisitorHeatMap(visitorChartData));
});
