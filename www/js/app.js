// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

(function () {
	
	'use strict';

	var app = angular.module('camera', ['ionic', 'ngCordova']);

	app.controller('cameraCtrl', function ($scope, $cordovaCamera, $ionicLoading){
		$scope.displayImg = "http://siliconcoast.net/images/featured/Lasership-thumb.jpg";

		$scope.snap = snap;
		$scope.isPhotoTaken = false;
		$scope.photo = "";
		$scope.isShowing = false;
		$scope.hasDetails = false;

		function snap() {
			$scope.isPhotoTaken = true;
			$scope.isShowing = true;
			var options = {
				quality: 75,
				allowEdit: false,
				targetWidth: 300,
				targetHeight: 400,
				cameraDirection: 0,
				destinationType: Camera.DestinationType.DATA_URL,
				encodingType: Camera.EncodingType.JPEG,
				correctOrientation: true,
				saveToPhotoAlbum: false
			};

			$cordovaCamera.getPicture(options).then(function (data) {
				console.log(data);
				// var data = JSON.parse(data);
				// var metadata = JSON.parse(data.json_metadata);
				// console.log(metadata);
				
				$scope.photo = data;
				$scope.displayImg = "data:image/jpeg;base64," + data;
				$scope.isShowing = false;

				// var img1 = document.getElementById("img1");
				// console.log(img1);

				EXIF.getData(data, function() {
					var make = EXIF.getTag(this, "Make");
					var model = EXIF.getTag(this, "Model");
					console.log(make, model);
					// var makeAndModel = document.getElementById("makeAndModel");
					// makeAndModel.innerHTML = `${make} ${model}`;
				});

				// $scope.hasDetails = true;
				// $scope.details = data.json_metadata;
			}, function (err) {
				console.log("ERROR: ", err);
			});

		}

	});

	app.run(function ($ionicPlatform) {
		$ionicPlatform.ready(function () {
			// if (window.cordova && window.cordova.plugins.Keyboard) {
			// 	cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			// 	cordova.plugins.Keyboard.disableScroll(true);
			// }
			if (window.StatusBar) {
				StatusBar.styleDefault();
			}
		});
	});

})();
