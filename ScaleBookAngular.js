/*
  ScaleBook
  ScaleBookAngular.js
  v1.0.0
  Copyright (c) Leland Jansen 2015. All rights reserved.
*/






// searchApp
var searchApp = angular.module("searchApp", ["filters", "ngRoute", "ngCookies"]);

searchApp.controller("searchController", ["$scope", "$location", "$cookies", function($scope, $location, $cookies) {

	$scope.searchField = $cookies.get("userInputCookie");

	$scope.$watch(function($scope) {
		$scope.hashValue = location.hash;
	});

	$scope.submit = function(userInput) {

		$cookies.put("userInputCookie", userInput);

		var parsedInput	= parseUserInput(userInput);
		var action			= parsedInput[2];
		var noteName		= parsedInput[3];
		var scaleName		= parsedInput[4];

		switch (action) {
			case "answer":
				window.location.href = ("/#/answer");
				document.getElementById("searchField").focus();
				break;
			case "scale":
				window.location.href = ("/scale" + "?/" + noteName + "/#/" + scaleName.replace(/\s+/g, ""));
				document.getElementById("searchField").focus();
				break;
			case "error":
				window.location.href = ("https://github.com/lelandjansen/ScaleBook/issues");
				document.getElementById("searchField").focus();
				break;
			case "cpanel":
				window.open("http://cpanel.scalebook.org", "_blank");
				break;
			case "github":
				window.open("https://github.com/lelandjansen/ScaleBook", "_blank");
				break;
		}

	};

	$scope.main = function($scope) {
		if (location.hash === "#/answer") {
			window.location.href = ("/#/");
			document.getElementById("searchField").focus();
		}
	};

	$scope.reset = function() {
		$cookies.put("userInputCookie", "");
		window.location.href = ("/#/");
		$scope.searchField = "";
		document.getElementById("searchField").focus();
		$scope.searchForm.$setPristine();
	};

}]);


angular.module("filters", ["ngSanitize"])
	// interpreter filter
	// Run parseUserInput (given userInput from searchField)
	// Return interpretation
	.filter("interpreter", function() {
		return function(userInput) {
			return parseUserInput(userInput)[0];
		};
	})
	.filter("answer", function() {
		return function(userInput) {
			return parseUserInput(userInput)[1];
		};
	})
	.filter("textStyle", function() {
		return function(string) {
			return string
				// Replace hyphen with space
				.replace(/-/g, " ")
				// Replace " sharps or flats" with " #/b"
				.replace(/ sharps or flats/g, "<span class='musicText'>#</span>/<span class='musicText'>b</span>")
				// Replace " flats or sharps" with " #/b"
				.replace(/ flats or sharps/g, "<span class='musicText'>b</span>/<span class='musicText'>#</span>")
				// Replace "sharps" with "#"
				.replace(/ sharps/g, "<span class='musicText'>#</span>")
				// Replace " sharp" with "#"
				.replace(/ sharp/g, "<span class='musicText'>#</span>")
				// Replace " flats" with "b"
				.replace(/ flats/g, "<span class='musicText'>b</span>")
				// Replace " flat" with "b"
				.replace(/ flat/g, "<span class='musicText'>b</span>");
		};
	})
	.filter("capitalizeFirstLetter", function() {
		return function(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		};
	})
	.filter("trustAsHTML", ["$sce", function($sce) {
		return function(string) {
			return $sce.trustAsHtml(string);
		};
	}]);



searchApp.config(function ($routeProvider) {
	$routeProvider
		.when("/", {
			templateUrl: "partials/main.html",
		})
		.when("/answer", {
			templateUrl: "partials/answer.html",
		})
		/*
		.when("/error", {
			templateUrl: "partials/error/error.html",
		})
		*/
		.when("/400", {
			templateUrl: "partials/error/400.html",
		})
		.when("/401", {
			templateUrl: "partials/error/401.html",
		})
		.when("/403", {
			templateUrl: "partials/error/403.html",
		})
		.when("/404", {
			templateUrl: "partials/error/404.html",
		})
		.when("/405", {
			templateUrl: "partials/error/405.html",
		})
		.when("/500", {
			templateUrl: "partials/error/500.html",
		})
		.otherwise({
			redirectTo: "/404",
		});
});



// scaleApp
var scaleApp = angular.module("scaleApp", ["filters", "ngRoute", "ngCookies"]);



scaleApp.config(function ($routeProvider) {
	$routeProvider
		.when("/major", {
			templateUrl: "partials/scale/major.html",
		})
		.when("/minor", {
			templateUrl: "partials/scale/minor.html",
		})
		.when("/ionian", {
			templateUrl: "partials/scale/ionian.html",
		})
		.when("/dorian", {
			templateUrl: "partials/scale/dorian.html",
		})
		.when("/phrygian", {
			templateUrl: "partials/scale/phrygian.html",
		})
		.when("/lydian", {
			templateUrl: "partials/scale/lydian.html",
		})
		.when("/mixolydian", {
			templateUrl: "partials/scale/mixolydian.html",
		})
		.when("/aeolian", {
			templateUrl: "partials/scale/aeolian.html",
		})
		.when("/locrian", {
			templateUrl: "partials/scale/locrian.html",
		})
		.when("/blues", {
			templateUrl: "partials/scale/blues.html",
		})
		.when("/chromatic", {
			templateUrl: "partials/scale/chromatic.html",
		})
		.when("/pentatonic", {
			redirectTo: "/major", // Pentatonic scale is included in major scale page
		})
		.when("/wholetone", {
			templateUrl: "partials/scale/wholetone.html",
		})
		.otherwise({
			redirectTo: "/404", // Need to redirect to 404 page
		});
});


scaleApp.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {  //using success callback of route change
        if(current.$$route && current.$$route.title) {                           //Checking whether $$route is initialised or not
            $rootScope.title = current.$$route.title;
        }
    });
}]);



scaleApp.controller("scaleController", ["$scope", "$cookies", function($scope, $cookies) {


	$scope.miniSearchField = $cookies.get("userInputCookie");

	$scope.submit = function(userInput) {


		$cookies.put("userInputCookie", userInput);

		var parsedInput	= parseUserInput(userInput);
		var action			= parsedInput[2];
		var noteName		= parsedInput[3];
		var scaleName		= parsedInput[4];

		switch (action) {
			case "answer":
				window.location.href = ("/#/answer");
				document.getElementById("miniSearchField").focus();
				break;
			case "scale":
				window.location.href = ("/scale" + "?/" + noteName + "/#/" + scaleName.replace(/\s+/g, ""));
				document.getElementById("miniSearchField").focus();
				break;
			case "error":
				window.location.href = ("https://github.com/lelandjansen/ScaleBook/issues");
				document.getElementById("miniSearchField").focus();
				break;
			case "cpanel":
				window.open("http://cpanel.scalebook.org", "_blank");
				break;
			case "github":
				window.open("https://github.com/lelandjansen/ScaleBook", "_blank");
				break;
		}

	};

	$scope.main = function($scope) {
		if (location.hash === "#/answer") {
			window.location.href = ("/#/");
			document.getElementById("miniSearchField").focus();
		}
	};

	$scope.reset = function() {
		$cookies.put("userInputCookie", "");
		dow.location.href = ("/#/");
		$scope.miniSearchField = "";
		document.getElementById("miniSearchField").focus();
		$scope.searchForm.$setPristine();
	};






	$scope.$watch(function($scope) {
		$scope.noteName = location.search.replace(/\?/g, "").replace(/\//g, "");


		$scope.scale = location.hash.replace(/\#/g, "").replace(/\//g, "");
		if ($scope.scale === "wholetone") {
			$scope.scale = "whole tone";
		}

		var scalePattern;
		switch($scope.scale) {
			case "major":
				scalePattern = [2, 2, 1, 2, 2, 2, 1];
				break;
			case "minor": // natural minor
				scalePattern = [2, 1, 2, 2, 1, 2, 2];
				break;

			case "ionian":
				scalePattern = [2, 2, 1, 2, 2, 2, 1];
				break;
			case "dorian":
				scalePattern = [2, 1, 2, 2, 2, 1, 2];
				break;
			case "phrygian":
				scalePattern = [1, 2, 2, 2, 1, 2, 2];
				break;
			case "lydian":
				scalePattern = [2, 2, 2, 1, 2, 2, 1];
				break;
			case "mixolydian":
				scalePattern = [2, 2, 1, 2, 2, 1, 2];
				break;
			case "aeolian":
				scalePattern = [2, 1, 2, 2, 1, 2, 2];
				break;
			case "locrian":
				scalePattern = [1, 2, 2, 2, 1, 2, 2];
				break;

			case "blues": // hexatonic blues
				scalePattern = [3, 2, 1, 1, 3, 2];
				break;
			case "chromatic":
				scalePattern = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
				break;
			case "whole tone":
				scalePattern = [2, 2, 2, 2, 2, 2];
				break;
		}

		$scope.scaleArray = generateScale($scope.noteName, scalePattern);

		var noteNumber = whiteNoteNameToNumber($scope.noteName.charAt(0).toUpperCase());
		if ($scope.noteName.indexOf("sharp") > -1) {
			noteNumber += 1;
		}
		else if ($scope.noteName.indexOf("flat") > -1) {
			noteNumber -= 1;
		}

		$scope.keySignature = determineKeySignatureName(
														determineKeySignature(
															noteNumber,
															$scope.scale
																.replace("blues", "blue")
																.replace("whole tone", "whole")
														)
													)
												+ " "
												+	listKeySignatureNotes(
														determineKeySignature(
															noteNumber,
															$scope.scale
																.replace("blues", "blue")
																.replace("whole tone", "whole")
															)
														).replace("<br/>", "");

		$scope.enharmonicNoteName = determineEnharmonic($scope.noteName, $scope.scale);
	})
}]);
