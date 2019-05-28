var arrayLength = 30;
var eur = [];
var yen = [];
var gbp = [];
var inr = [];
var url = "";

function rand() {
	var min = -0.01;
    var max = 0.01;
    return (Math.random() * (+max - +min) + +min)/100;
}

function sleep(delay) {
	var start = new Date().getTime();
	while (new Date().getTime() < start + delay);
}

var time = new Date();
Plotly.plot('graph', [{
	x: [time],
	y: eur,
	name: 'EUR Basis points',
	mode: 'lines',
	line: {color: '#8055F6'}
},
{
	x: [time],
    y: yen,
	name: 'JPY Basis points',
    mode: 'lines',
    line: {color: '#800026'}
},
{
	x: [time],
    y: gbp,
	name: 'GBP Basis points',
    mode: 'lines',
    line: {color: '#FF0026'}
},
{
	x: [time],
    y: inr,
	name: 'INR Basis points',
    mode: 'lines',
    line: {color: '#FF33EE'}
}]);

var cnt = 0;
var series = [];
var closePrices = [];
var prevSeries = [];
var prevClosePrices = [];
var interval = setInterval(function() {

	var items = document.getElementsByName('currency');

	if(series.length > 0) {
		prevClosePrices = [...closePrices];
		prevSeries = [...series];
	}
	series = [];
	closePrices = [];
	var time = new Date();
	var xData = [];
	var yData = [];
	var rateOfChange = 0;
	for(var i=0; i<items.length; i++) {
		var denomination = items[i].value;
		var cp = [];
		if(items[i].type == 'checkbox' && items[i].checked == true) {
			series.push(i);
			var dataCsv;
			d3.csv(setUrl(denomination, (i + 1))).then(function(data, error) {
				if (error) { console.log(error); }
				var lastRefreshed = data['Meta Data']['4. Last Refreshed'];
		        var timeSeries = data['Time Series FX (1min)'];
		        var price = +timeSeries[lastRefreshed]['4. close'];
		        //closePrices.push(price);
		        cp.push(price);
		        console.log("closePrices (1): " + cp + "; series: " + series);
				console.log("closePrices (1.5): " + cp);
				closePrices = [...cp];
			});

            console.log("url: " + setUrl(denomination, (i + 1)) + "; closePrices (Ajax call 1): " + cp);
			closePrices.push(rand()*10);
		}
	}

	for(var i = 0; i < series.length; i++) {
		rateOfChange = 0;
		for(var j = 0; j < prevSeries.length; j++) {
			if(series[i] == prevSeries[j]) {
				rateOfChange = processData((closePrices[i] - prevClosePrices[j]) / prevClosePrices[j]);

				console.log("rateOfChange: " + rateOfChange + "; prevClosePrices[j]: " + prevClosePrices[j] +
							"; closePrices[i]: " + closePrices[i] +
							"; series: " + series[i]);
				break;
			}
		}

		xData.push([time]);
		yData.push([rateOfChange])
	}

	var olderTime = time.setMinutes(time.getMinutes() - 1);
	var futureTime = time.setMinutes(time.getMinutes() + 1);

	var minuteView = {
	    xaxis: {type: 'date', range: [olderTime, futureTime]}
	};
	var data_update = {x: xData, y: yData};
	Plotly.relayout('graph', minuteView);
	Plotly.extendTraces('graph', data_update, series);

	if(cnt === 100) clearInterval(interval);
}, 3000);

var lines = [];
$(document).ready(function() {
	console.log("   I: am I here? ");
    $.ajax({
        type: "GET",
        url: "../static/fx_intraday_1min_USD_EUR.csv",
        dataType: "text",
        success: function(data) {processData(data, lines);}
     });
     console.log("  II: am I here? ");
});
console.log(lines);
function processData(rateOfChange) {
    while(rateOfChange > 10) {
			rateOfChange = rateOfChange - 10;
	}
	while(rateOfChange < -10) {
		rateOfChange = rateOfChange + 10;
	}
	return rateOfChange/100;
}

function setUrl(to_symbol, i) {
	apiKey = ""
	if (i % 2 == 0)
		apiKey = apiKeyBabla;
	else
		apiKey = apiKeyKarthik;
	url = "https://www.alphavantage.co/query?function=FX_INTRADAY&datatype=json&from_symbol=USD&to_symbol=" + to_symbol +
			"&interval=1min&outputsize=compact&apikey=" + apiKey;
//	"https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=USD&to_symbol=" + to_symbol + "&interval=1min&outputsize=compact&apikey=" + apiKey;
//	console.log(url);
	return url;
}


