angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http, Yelp, $cordovaGeolocation, $ionicModal) {

$ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };


    $scope.currentCard = 0;
    $scope.loader = false
    if ($scope.currentCard === 0) {
        $scope.loader = true
    }
    var posOptions = {
        timeout: 10000,
        enableHighAccuracy: false
    };
    $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function(position) {
            $scope.lat = position.coords.latitude
            $scope.long = position.coords.longitude
            //start of prayer timingss
             prayTimes.setMethod('ISNA');
            var times = prayTimes.getTimes(new Date(), [$scope.lat, $scope.long], 'auto', 'auto', '12h')
            console.log(times)

            $scope.imsak = times.imsak;
            $scope.fajr = times.fajr;
            $scope.dhuhr = times.dhuhr;
            $scope.asr = times.asr;
            $scope.maghrib = times.maghrib;
            $scope.isha = times.isha;
            $scope.sunrise = times.sunrise;
            $scope.sunset = times.sunset;

            //end of prayer timeings



              //start of masjid finder
            $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + $scope.lat + ',' + $scope.long + '&sensor=true').then(function(res) {
                $scope.ourPosition = res.data.results[0].formatted_address
                console.log($scope.ourPosition, 'position')
                Yelp.getYelp($scope.ourPosition).then(function(data) {
                    $scope.cards = data.data.businesses
                    console.log($scope.cards)
                })

            });
        }, function(err) {
          console.log(err, 'error occured')
            // error
        });

           //end of masjid finder
    $scope.onSwipeRight = function() {
        $scope.currentCard -= 1;
    }
    $scope.onSwipeLeft = function() {
        $scope.currentCard += 1;
    }
})

// .controller('prayTimeCtrl', function($scope, $cordovaGeolocation) {
//     var posOptions = {
//         timeout: 10000,
//         enableHighAccuracy: false
//     };
//     $cordovaGeolocation
//         .getCurrentPosition(posOptions)
//         .then(function(position) {
//             $scope.lat = position.coords.latitude
//             $scope.lon = position.coords.longitude
//             prayTimes.setMethod('ISNA');
//             var times = prayTimes.getTimes(new Date(), [$scope.lat, $scope.long], 'auto', 'auto', '12h')
//             console.log(times)
//             $scope.imsak = times.imsak;
//             $scope.fajr = times.fajr;
//             $scope.dhuhr = times.dhuhr;
//             $scope.asr = times.asr;
//             $scope.maghrib = times.maghrib;
//             $scope.isha = times.isha;
//             $scope.sunrise = times.sunrise;
//             $scope.sunset = times.sunset;

//         })

// });

