(function () {
    'use strict';
    angular.module("travlendarApp").service("authService", authService);
    authService.$inject = ['$q', '$rootScope'];

    function authService($q, $rootScope) {
        var vm = this;
        vm.authenticate = authenticate;
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
            if (localStorage.getItem("tvIDToken")) {
                $rootScope.idToken = localStorage.getItem("tvIDToken");
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
                        localStorage.setItem("tvIDToken", response.id_token);
                        localStorage.setItem("tvRefreshToken", response.refresh_token);
                        $rootScope.idToken = response.id_token;
                        deferred.resolve(true);
                    }).fail(function (error) {
                        window.location.replace(AUTH_URL + REDIRECT_URI);
                        deferred.reject(false);
                    });
                } else {
                    window.location.replace(AUTH_URL + REDIRECT_URI);
                    deferred.reject(false);
                }
            }
            return deferred.promise;
        }
        
        function logout(){
            localStorage.removeItem("tvIDToken");
            localStorage.removeItem("tvRefreshToken");
            window.location.replace(DOMAIN_URL + "logout?client_id=" + CLIENT_ID + "&logout_uri=" + AUTH_URL + REDIRECT_URI + "&response_type=code");
        }
    }
})();
