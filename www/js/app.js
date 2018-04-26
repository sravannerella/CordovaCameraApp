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
		$scope.base64 = "";
		$scope.complete = complete;
		$scope.isShowing = false;
		$scope.hasDetails = false;

		function getExif(img) {
			EXIF.getData(img, function() {
				var allMetaData = EXIF.getAllTags(this);

				$scope.hasDetails = true;
				$scope.details = allMetaData;

				var canvas = document.createElement("canvas");
				canvas.width = img.width;
				canvas.height = img.height;
				var ctx = canvas.getContext('2d');
				ctx.drawImage(img, 0, 0);
				var dataUri = canvas.toDataURL('image/jpeg');
				$scope.base64 = dataUri;

				$scope.$apply();
			});
		}

		function complete() {
			$scope.isPhotoTaken = false;
			$scope.photo = "";
			$scope.base64 = "";
			$scope.details = "";
			$scope.isShowing = false;
			$scope.hasDetails = false;
			$scope.displayImg = "http://siliconcoast.net/images/featured/Lasership-thumb.jpg";

			$cordovaCamera.cleanup().then(function(data){
				console.log("CAMERA CLEAN UP");
			}, function(err) {
				console.log("CAMERA FAILED CLEAN UP");
			});
		}

		function snap() {
			$scope.isPhotoTaken = true;
			$scope.isShowing = true;
			var options = {
				quality: 50,
				allowEdit: false,
				targetWidth: 300,
				targetHeight: 400,
				cameraDirection: "BACK",
				destinationType: Camera.DestinationType.FILE_URI,
				encodingType: Camera.EncodingType.JPEG,
				correctOrientation: true,
				saveToPhotoAlbum: false
			};

			$cordovaCamera.getPicture(options).then(function (data) {
				$scope.photo = data;
				$scope.displayImg = data;
				$scope.isShowing = false;
				
				setTimeout(function(){
					getExif(document.getElementById('imag'));
				}, 1000);
			}, function (err) {
				console.log("ERROR: ", err);
			});

		}

	});

	app.run(function ($ionicPlatform) {
		$ionicPlatform.ready(function () {
			if (window.StatusBar) {
				StatusBar.styleDefault();
			}
		});
	});

})();
