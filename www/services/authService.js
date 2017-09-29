(function () {
    'use strict';
    angular.module("travlendarApp").service("authService", authService);
    authService.$inject = ['$q', '$rootScope', '$http'];

    function authService($q, $rootScope, $http) {
        var vm = this;
        vm.authenticate = authenticate;
        vm.refresh = refresh;
        vm.logout = logout;

        function findGetParameter(parameterName) {
            var result = null,
                tmp = [];
            location.search
                .substr(1)
                .split("&")
                .forEach(function (item) {
                    tmp = item.split("=");
                    if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
                });
            return result;
        }

        function authenticate() {
            var deferred = $q.defer();
            if (localStorage.getItem("tvIDToken" + STAGE)) {
                $rootScope.idToken = localStorage.getItem("tvIDToken" + STAGE);
                deferred.resolve(true);
            } else {
                var code = findGetParameter("code");
                if (code) {
                    var settings = {
                        "async": true,
                        "crossDomain": true,
                        "url": "https://travlendar.auth.us-west-2.amazoncognito.com/oauth2/token",
                        "method": "POST",
                        "headers": {
                            "content-type": "application/x-www-form-urlencoded",
                            "cache-control": "no-cache"
                        },
                        "data": {
                            "grant_type": "authorization_code",
                            "client_id": CLIENT_ID,
                            "redirect_uri": REDIRECT_URI,
                            "code": code
                        }
                    }

                    $.ajax(settings).done(function (response) {
                        localStorage.setItem("tvIDToken" + STAGE, response.id_token);
                        localStorage.setItem("tvRefreshToken" + STAGE, response.refresh_token);
                        $rootScope.idToken = response.id_token;
                        deferred.resolve(true);
                    }).fail(function (error) {
                        window.location.replace(AUTH_URL + REDIRECT_URI + "&response_type=code");
                        deferred.reject(false);
                    });
                } else {
                    window.location.replace(AUTH_URL + REDIRECT_URI + "&response_type=code");
                    deferred.reject(false);
                }
            }
            return deferred.promise;
        }

        function logout() {
            localStorage.removeItem("tvIDToken" + STAGE);
            localStorage.removeItem("tvRefreshToken" + STAGE);
            window.location.replace(DOMAIN_URL + "logout?client_id=" + CLIENT_ID + "&logout_uri=" + AUTH_URL + REDIRECT_URI + "&response_type=code");
        }

        function refresh() {
            var deferred = $q.defer();
            var payload = {
                idToken: $rootScope.idToken,
                refreshToken: localStorage.getItem("tvRefreshToken" + STAGE)
            }
            $http.post("https://xbfmz7x8c7.execute-api.us-west-2.amazonaws.com/dev/refresh", payload).then(function(data){
                localStorage.setItem("tvIDToken" + STAGE, data.data.AuthenticationResult.IdToken);
                $rootScope.idToken = data.data.AuthenticationResult.IdToken;
                deferred.resolve(data);
            })
            return deferred.promise;
        }
    }
})();
