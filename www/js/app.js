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
		$scope.takePic = takePic;
		
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

		function takePic() {
			var captureOptions = {
				width: 300,
				height: 400,
				quality: 75
			}

			CameraPreview.takePicture(captureOptions, function(imgData){
				CameraPreview.hide();
				$scope.photo = imgData[0];
				console.log(imgData[0]);
				$scope.$apply(function(){
					$scope.displayImg = "data:image/jpeg;base64," + $scope.photo;

					setTimeout(function(){
						getExif(document.getElementById('imag'));
					}, 3000);

				});
			});
		}

		function snap() {
			$scope.isPhotoTaken = true;

			let options = {
				x: 0, 
				y: 0, 
				camera: CameraPreview.CAMERA_DIRECTION.BACK, 
				width: window.screen.width, 
				height: window.screen.height - 150, 
				toBack: false,  // Takes the whole camera to back of html
				previewDrag: false, 
				tapFocus: true,
				disableExifHeaderStripping: true
			}

			CameraPreview.startCamera(options);

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
