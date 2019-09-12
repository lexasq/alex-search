'use strict';

angular.module('chatService', [])
    .service('ChatService', ['$http', function(http) {
    this.letMeGoogleForYou = (query) => {
        return http.get('https://www.googleapis.com/customsearch/v1?' +
            'key=AIzaSyBfO8TuXVrY4yLItTA8tUd3642O5PE1hAk&' +
            'cx=000275431653845686315:vifgu7jteor' +
            '&q=' + query);
    };
}]);
