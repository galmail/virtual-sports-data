// login.js

if(typeof(virtualSportsAgent)!='object') virtualSportsAgent={};

virtualSportsAgent.login = function(callback){
	
	console.log('Inside login function !!!!!!!!!');
	
	virtualSportsAgent.url = "https://www.betfair.com/sport/virtuals/football";
	virtualSportsAgent.testindex = 0;
	virtualSportsAgent.loadInProgress = false;

	Phantom.create("--web-security=no", "--ignore-ssl-errors=yes",{},function (ph) {
	  ph.createPage(function(page){
	  	
	  	page.onConsoleMessage = function(msg) {
			  console.log(msg);
			};

			page.onLoadStarted = function() {
			  virtualSportsAgent.loadInProgress = true;
			  console.log("load started");
			};

			page.onLoadFinished = function() {
			  virtualSportsAgent.loadInProgress = false;
			  console.log("load finished");
			};

			virtualSportsAgent.steps = [

				////////// Step 1 - Open Virtual Sports Page //////////

			  function() {
			    console.log("opening page: " + virtualSportsAgent.url);
			    page.open(virtualSportsAgent.url);
			  },

			  ////////// Step 2 - Login //////////

			  function() {
			    page.evaluate(function() {
			      document.getElementById("ssc-liu").value="guli@tocarta.es";
			      document.getElementById("ssc-lipw").value="guliguli1";
			      var theForm = document.getElementsByClassName("ssc-lif")[0];
			      theForm.submit();
			    });
			  },

			  ////////// Step 3 - Save Cookie //////////

			  function() {
			    page.evaluate(function() {
			    	var res = "";
			    	if(document.cookie!=null) res = document.cookie;
			      return res;
			    }, function(cookie){
			    	if(cookie==null || cookie==""){
			    		console.log("not logged!");
			    		virtualSportsAgent.logged = false;
			    		return false;
			    	}
		    		virtualSportsAgent.cookie = cookie;
		    		var xsrftokenStr = cookie.match(/xsrftoken=[a-z0-9-]+/g)[0];
		    		if(xsrftokenStr!=null && xsrftokenStr!=""){
		    			virtualSportsAgent.xsrftoken = xsrftokenStr.split("xsrftoken=")[1];
		    			console.log("logged successful!");
		    			virtualSportsAgent.logged = true;
		    			return true;
		    		}
		    		else {
		    			console.log("not logged!");
		    			virtualSportsAgent.logged = false;
		    			return false;
		    		}
			    });
			  }

			];


			virtualSportsAgent.interval = setInterval(function() {
			  if (!virtualSportsAgent.loadInProgress && typeof virtualSportsAgent.steps[virtualSportsAgent.testindex] == "function") {
			    console.log("step " + (virtualSportsAgent.testindex + 1));
			    virtualSportsAgent.steps[virtualSportsAgent.testindex]();
			    virtualSportsAgent.testindex++;
			  }
			  if (typeof virtualSportsAgent.steps[virtualSportsAgent.testindex] != "function") {
			    clearInterval(virtualSportsAgent.interval);
			    console.log("test complete!");
			    ph.exit();
			    setTimeout(function(){
			    	if(callback) callback(virtualSportsAgent.logged);
			    },2000);
			  }
			}, 2000);

	  });
	});

};

