// saveMarketPrices.js

if(typeof(virtualSportsAgent)!='object') virtualSportsAgent={};

virtualSportsAgent.saveMarketPrices = function(){
	
	console.log('Inside saveMarketPrices function !!!!!!!!!');

	var url = "https://www.betfair.com/www/sports/fixedodds/readonly/v1/getMarketPrices?_ak=FIhovAzZxtrvphhu&priceHistory=0&xsrftoken="+virtualSportsAgent.xsrftoken;

	//Fiber(function(){
	try {
  	var httpCall = HTTP.call("POST",url,{
  		headers: {
  			"X-Requested-With": "XMLHttpRequest",
  			"Accept": "application/json",
        "Content-Type": "application/json",
				"Cookie": virtualSportsAgent.cookie
  		},
      data: {
        "alt": "json",
        "currencyCode": "GBP",
        "locale": "en_GB",
        "marketIds": ["924.52836406","924.52836411"]
      }
  	});
  	console.log("httpCall.statusCode: ", httpCall.statusCode);
  	console.log("httpCall.content", httpCall.content);
  	if(httpCall.statusCode != 200) return;

  } catch (e) {
    // Got a network error, time-out or HTTP error in the 400 or 500 range.
    console.log("error",e);
  }
  //}).run();
	
};
