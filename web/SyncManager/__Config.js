/**
 * Configuracion Angularjs a Server
 */

app.config(function ($routeProvider, $httpProvider, $provide, $interpolateProvider, $locationProvider) {
    $interpolateProvider.startSymbol('[[').endSymbol(']]');
    $provide.factory('httpInterceptor', function ($q, $rootScope) {
        $rootScope.countRequests = 0;
        $rootScope.superload = true;
        return {
            'request': function (config) {
                console.log("Request");
                $rootScope.countRequests++;
                $rootScope.miniload = true;
                $rootScope.$broadcast('httpRequest', config);
                return config || $q.when(config);
            },
            'response': function (response) {
                console.log("Response");
                $rootScope.$broadcast('httpResponse', response);
                $rootScope.$broadcast('finishResponse');
                return response || $q.when(response);
            },
            'requestError': function (rejection) {
                console.log("RequestError");
                //console.log(" -> httpRequestError");
                $rootScope.$broadcast('httpRequestError', rejection);
                $rootScope.$broadcast('finishResponse');
                return $q.reject(rejection);
            },
            'responseError': function (rejection) {
                console.log("ResponseError");
                //console.log(" -> httpResponseError");
                $rootScope.$broadcast('httpResponseError', rejection);
                $rootScope.$broadcast('finishResponse');
                return $q.reject(rejection);
            }
        };
    });
    $httpProvider.interceptors.push('httpInterceptor');


    $routeProvider
        .when('/', {
            templateUrl: 'home.html',
            controller: 'HomeController'
        })
        .when('/event/', {
            templateUrl: 'home.html',
            controller: 'EventListController'
        })
        .when('/event/:event/', {
            templateUrl: 'home.html',
            controller: 'EventController'
        })
        .when('/event/:event/people/', {
            templateUrl: 'home.html',
            controller: 'PeapleController'
        })
        .when('/event/:event/people/assistants/', {
            templateUrl: 'home.html',
            controller: 'PeapleAssistantsController'
        })
        .when('/event/:event/people/prescribed/', {
            templateUrl: 'home.html',
            controller: 'PeaplePrescribedController'
        })
        .when('/event/:event/people/inscribed/', {
            templateUrl: 'home.html',
            controller: 'PeapleInscribedController'
        })
        .when('/event/:event/seccion/', {
            templateUrl: 'home.html',
            controller: 'SeccionController'
        })
        .when('/event/:event/ticket/', {
            templateUrl: 'home.html',
            controller: 'TicketController'
        })
        .when('/event/:event/sponsor/', {
            templateUrl: 'home.html',
            controller: 'SponsorController'
        })
        .when('/event/:event/user/', {
            templateUrl: 'home.html',
            controller: 'UsersController'
        })
        .when('/event/:event/document/', {
            templateUrl: 'home.html',
            controller: 'DocumentsController'
        })
        .when('/event/:event/landingpage/', {
            templateUrl: 'home.html',
            controller: 'LandingPageListController'
        })
        .when('/event/:event/config/', {
            templateUrl: 'home.html',
            controller: 'ConfigEventController'
        })
        .when('/event/:event/config/insctruction/', {
            templateUrl: 'home.html',
            controller: 'ConfigInscriptionsController'
        })
        .otherwise({reditrectTo: "/"});
    $locationProvider.hashPrefix("!");
});
