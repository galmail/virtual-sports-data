// saveResults.js

if(typeof(virtualSportsAgent)!='object') virtualSportsAgent={};

virtualSportsAgent.saveResults = function(callback){
	
	console.log('Starting saveResults function.');

  if(virtualSportsAgent.xsrftoken == null || virtualSportsAgent.cookie == null){
    console.log("xsrftoken/cookie not found.");
    if(callback) callback(false);
    return;
  }

	var url = "https://www.betfair.com/sport/virtuals/football?modules=virtuals-latest-results&sport=SOCCER&action=update&lastId=1044&ts=1463963943720&alt=json&xsrftoken="+virtualSportsAgent.xsrftoken;

	try {
  	var httpCall = HTTP.call("GET",url,{
  		headers: {
  			"X-Requested-With": "XMLHttpRequest",
  			"Accept": "*/*",
				"Cookie": virtualSportsAgent.cookie
  		}
  	});
  	
    if(httpCall.statusCode != 200){
      console.log("httpCall.statusCode: " + httpCall.statusCode);
      if(callback) callback(false);
      return;
    }

    if(httpCall.content.indexOf('{"page":{"config"')>100){
      console.log("got a bad json result.");
      if(callback) callback(false);
      return;
    }

    var data = JSON.parse(httpCall.content);

    for(var i=0;i<data.page.config.instructions.length;i++){
      var htmlStr = data.page.config.instructions[i].arguments.html;
      if(!htmlStr) continue;
      
      var teams = htmlStr.match(/<div class="individual-team">.*?(?=<\/div>)/g);
      var scores = htmlStr.match(/<div class="score">.*?(?=<\/div>)/g);

      var homeTeam = teams[0].split('>')[1].trim();
      var homeGoals = parseInt(scores[0].split('>')[1].trim());
      var awayTeam = teams[1].split('>')[1].trim();
      var awayGoals = parseInt(scores[1].split('>')[1].trim());
      var match = homeTeam + ' v ' + awayTeam;

      var event = {
        match: match,
        homeTeam: homeTeam,
        homeGoals: homeGoals,
        awayTeam: awayTeam,
        awayGoals: awayGoals,
        totalGoals: homeGoals+awayGoals,
        homeWin: homeGoals>awayGoals,
        awayWin: homeGoals<awayGoals,
        draw: homeGoals==awayGoals
      };

      //console.log(event);

      var obj = Events.findOne({match: match},{sort: {date: -1}});
      if(obj!=null){
        Events.update({_id: obj._id}, {$set: event});
        console.log(_.extend(obj,event));
      }

    }

    console.log('Finished saveResults function.');
    if(callback) callback(true);

  } catch (e) {
    // Got a network error, time-out or HTTP error in the 400 or 500 range.
    console.log("error",e);
    if(callback) callback(false);
  }
	
};
