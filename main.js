// main.js

Router.route('/', function(){
  this.render('main');
});

Router.route('/start',function(){
	Meteor.call("login");
	this.render('start');
});



Router.route('/stop');

