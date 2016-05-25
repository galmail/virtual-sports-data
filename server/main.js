import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  
  // Load the libraries

  Fiber = Meteor.npmRequire('fibers');
  Phantom = Meteor.npmRequire('phantom');

  // Initialize the Collections

  Events = new Mongo.Collection("events");

});

if(typeof(virtualSportsAgent)!='object') virtualSportsAgent={};

/////// APIs ///////

Meteor.methods({

	startVirtualSportsAgent: function(){

    var pollingInterval = 60 * 1000; // every minute
    var attempts = 3;

    try {

      var tryLogin = function(intents,cbk,_i){
        virtualSportsAgent.login(function(logged){
          if(_i==null) _i=0;
          if(logged) return cbk(true);
          if(_i>=intents) return cbk(false);
          _i++;
          tryLogin(intents,cbk,_i);
        });
      };

      var start = function(){
        tryLogin(attempts,function(logged){
          if(!logged){
            console.log("Failed to login 3 times.");
            return false;
          }
          var saveData = function(){
            Fiber(function(){
              virtualSportsAgent.loadEvents(function(ok){
                if(!ok) return start();
                virtualSportsAgent.saveResults(function(ok){
                  if(!ok) return start();
                  setTimeout(saveData,pollingInterval);
                });
              });
            }).run();
          };
          saveData();
        });
      };

      start();

    } catch(e) {
      console.log("error: ", e);
    }

    return { res: "success" };
  },

  login: function(callback){
    try {
      virtualSportsAgent.login(callback);
    } catch(e) {
      console.log("error: ", e);
    }
    return { res: "success" };
  },

  loadEvents: function(){
    try {
      virtualSportsAgent.loadEvents();
    } catch(e) {
      console.log("error: ", e);
    }
    return { res: "success" };
  },

  saveResults: function(){
    try {
      virtualSportsAgent.saveResults();
    } catch(e) {
      console.log("error: ", e);
    }
    return { res: "success" };
  },

  saveMarketPrices: function(){
    try {
      virtualSportsAgent.saveMarketPrices();
    } catch(e) {
      console.log("error: ", e);
    }
    return { res: "success" };
  }

});

