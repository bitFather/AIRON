'use strict';
var userService = function() {
/*
	gapi.load('auth2', function(){
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      console.log(333);
      auth2 = gapi.auth2.init({
        client_id: '947632009316-j0dfr2h3fef2ea35g7060dp8sos9ddpn.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      attachSignin(document.getElementById('customBtn'));
    });

	function attachSignin(element) {
	    console.log(element.id);
	    auth2.attachClickHandler(element, {},
	        function(googleUser) {
	          document.getElementById('name').innerText = "Signed in: " +
	              googleUser.getBasicProfile().getName();
	        }, function(error) {
	          alert(JSON.stringify(error, undefined, 2));
	        });
	  }

	var user = null;

	function onSignIn(googleUser) {
	  var profile = googleUser.getBasicProfile();
	  user = profile.getId()
	  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
	  console.log('Name: ' + profile.getName());
	  console.log('Image URL: ' + profile.getImageUrl());
	  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
	}

	function signOut() {
		var auth2 = gapi.auth2.getAuthInstance();
		auth2.signOut().then(function () {
		  user = null;
		  console.log('User signed out.');
		});
	}

	// googleAuthBtn

	gapi.load('auth2', function () {
        this.googleAuth = gapi.auth2.init({
          client_id: '947632009316-j0dfr2h3fef2ea35g7060dp8sos9ddpn.apps.googleusercontent.com',
        });
      }.bind(this));
*/

	var user = null;
	return {
        user: user,
    }
};
module.exports = userService;