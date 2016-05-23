// saveResults.js

if(typeof(virtualSportsAgent)!='object') virtualSportsAgent={};

virtualSportsAgent.saveResults = function(){
	
	console.log('Inside saveResults function !!!!!!!!!');

	var url = "https://www.betfair.com/sport/virtuals/football?modules=virtuals-latest-results&sport=SOCCER&action=update&lastId=1044&ts=1463963943720&alt=json&xsrftoken="+virtualSportsAgent.xsrftoken;

	//Fiber(function(){
	try {
  	var httpCall = HTTP.call("GET",url,{
  		headers: {
  			"X-Requested-With": "XMLHttpRequest",
  			"Accept": "*/*",
				"Cookie": virtualSportsAgent.cookie
  		}
  	});
  	console.log("httpCall.statusCode: ", httpCall.statusCode);
  	console.log(httpCall.content.indexOf('{"page":{"config"'));
  	if(httpCall.statusCode != 200) return;

  } catch (e) {
    // Got a network error, time-out or HTTP error in the 400 or 500 range.
    console.log("error",e);
  }
  //}).run();
	
};
