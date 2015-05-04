(function($) {
  'use strict';

  developers.documentation = {
    share: {
      init: function () {
        var $sideBar = $('.aside-wrapper aside');

        $sideBar.affix({
          offset: {
            top: function () {
              var offsetTop = $sideBar.offset().top;
              var domesticNavHeight = $('.domestic-nav').outerHeight(true);
              var breadcrumbsMargin = parseInt($('.breadcrumbs').css('margin-bottom'), 10);
              return (this.top = offsetTop - domesticNavHeight - breadcrumbsMargin);
            },
            bottom: function () {
              return (this.bottom = $('footer').outerHeight(true))
            }
          }
        });

        $('body').scrollspy({
          target: '.aside-wrapper',
          offset: 0
        });
      }
    }
  };

}(jQuery));
