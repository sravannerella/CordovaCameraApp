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
		
		function getExif(img) {
			console.log(img);
			EXIF.getData(img, function() {
				var allMetaData = EXIF.getAllTags(this);
				var make = EXIF.getTag(this, "Make");
				var model = EXIF.getTag(this, "Model");

				console.log(allMetaData);
				var allMetaDataSpan = document.getElementById("allMetaDataSpan");
				allMetaDataSpan.innerHTML = JSON.stringify(allMetaData, null, "\t");
			});
		}

		function snap() {

			// CameraPreview.takePicture(captureOptions, function(imgData){
			// 	CameraPreview.hide();
			// 	$scope.photo = imgData[0];
			// 	console.log(imgData[0]);
			// 	$scope.$apply(function(){
			// 		$scope.displayImg = "data:image/jpeg;base64," + $scope.photo;

			// 		setTimeout(function(){
			// 			getExif(document.getElementById('imag'));
			// 		}, 1000);

			// 	});
			// });
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

			var objCanvas = document.getElementById("camera");
			CanvasCamera.initialize(objCanvas);
			console.log(CanvasCamera);

			let options = {
				quality : 75, 
				destinationType : CanvasCamera.DestinationType.DATA_URL,
				sourceType : CanvasCamera.PictureSourceType.CAMERA,
				allowEdit : false,
				encodingType: CanvasCamera.EncodingType.JPEG,
				correctOrientation: true,
				saveToPhotoAlbum: false,
				width: 300,
				height: 400
			}
			
			// CanvasCamera.setCameraPosition(CanvasCamera.CameraPosition.BACK);
			// CanvasCamera.setFlashMode(CanvasCamera.FlashMode.ON);
			CanvasCamera.start(options);

			CanvasCamera.takePicture(function(data){
				console.log(data);
			});

		});
	});

})();
