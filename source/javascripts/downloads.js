(function($) {
  'use strict';

  developers.downloads = {
    init: function () {
      var login = new SW.Login({clientId: 1234});

      $('.download-dev-edition-button').on('click', function (e) {
        e.preventDefault();
        login.request('login').then(function () {
          debugger;
          // logged in
        });
      });
    }
  };

}(jQuery));
