// loadEvents.js

if(typeof(virtualSportsAgent)!='object') virtualSportsAgent={};

virtualSportsAgent.loadEvents = function(callback){
	
	console.log('Starting loadEvents function.');

	var url = "https://www.betfair.com/sport/virtuals/football?modules=virtuals-marketview&openDate=1463706240000&action=virtualMarketViewNextEvents&lastId=1044&ts=1463705310646&alt=json&xsrftoken="+virtualSportsAgent.xsrftoken;

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
    
    if(httpCall.statusCode != 200){
      if(callback) callback(false);
      return;
    }

    if(httpCall.content.indexOf('{"page":{"config"')>100){
      if(callback) callback(false);
      return;
    }

    var data = JSON.parse(httpCall.content);

    var htmlStr = data.page.config.instructions[0].arguments.contentHtml;

    //console.log(htmlStr);


    var eventsId = htmlStr.match(/<div class="content .*? data-eventId="\d+/g);
    var eventsName = htmlStr.match(/<div class="event-name">.*?(?=<\/div>)/g);
    var eventsDescription = htmlStr.match(/<div class="event-description">.*?(?=<\/div>)/g);

    if(eventsId.length == 0 || eventsId.length != eventsName.length || eventsName.length != eventsDescription.length){
      console.log("json parse error");
      return;
    }

    for(var i=0;i<eventsId.length;i++){
      var id = eventsId[i].split('data-eventId="')[1];
      var league = eventsDescription[i].split('>')[1];

      var name = eventsName[i].split('>')[1].split(' ');
      var time = name[0];
      name.splice(0,1);
      var match = name.join(' ').trim();

      var event = {
        id: id,
        date: new Date(),
        time: time,
        match: match,
        league: league
      };

      //console.log(event);
      Events.upsert({id: id}, {$set: event });
    }

    console.log('Finished loadEvents function.');
    if(callback) callback(true);

  } catch (e) {
    // Got a network error, time-out or HTTP error in the 400 or 500 range.
    console.log("error",e);
    if(callback) callback(false);
  }
  //}).run();
	
};
