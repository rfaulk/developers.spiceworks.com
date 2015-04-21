(function($) {
  'use strict';

  developers.downloads = {
    onLogin: function () {
      if (typeof this.downloadUrl !== 'undefined') {
        window.location.href = this.downloadUrl;
      }
    },

    init: function () {
      var login = new SW.Login({clientId: 'bfe9764216a6762c790e314923e277fd23064dc2c7f424c5fe930a9379f4bb71'});
      var that = this;
      $('.download-dev-edition-button').on('click', function (e) {
        e.preventDefault();
        that.downloadUrl = this.href;
        login.request('login').then(that.onLogin.bind(that));
      });
    }
  };

}(jQuery));
