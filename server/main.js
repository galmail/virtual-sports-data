import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  
  // Load the libraries

  Fiber = Meteor.npmRequire('fibers');
  Phantom = Meteor.npmRequire('phantom');

});

if(typeof(virtualSportsAgent)!='object') virtualSportsAgent={};

/////// APIs ///////

Meteor.methods({

	startVirtualSportsAgent: function(){
    //virtualSportsAgent.login();
    return { res: "success" };
  },

  login: function(){
    virtualSportsAgent.login();
    return { res: "success" };
  },

  loadEvents: function(){
    virtualSportsAgent.loadEvents();
    return { res: "success" };
  },

  saveResults: function(){
    virtualSportsAgent.saveResults();
    return { res: "success" };
  },

  saveMarketPrices: function(){
    virtualSportsAgent.saveMarketPrices();
    return { res: "success" };
  }

});

