// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require underscore
//= require bootstrap
//= require on_ready
//= require_tree vendor
//= require_tree .

$(function(){
  //hack to make nav sticky
  $('nav.domestic-nav').affix({ offset: {top: 42}});

  //hack to add sign up button in main nav
  var html  = '<li class="guest-user-navmenu menu">';
      // html += ' <a href="#" data-modal-name="login" data-target="#" data-toggle="modal"><span>Login</span></a>';
      html += ' <a href="#" data-modal-name="join" data-target="#sign-up-modal" data-toggle="modal" class="join-button"><span>Sign Up</span></a>';
      html += '</li>';

  $('.global-nav .menus').append(html);
});
