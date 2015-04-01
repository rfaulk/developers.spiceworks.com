 //= require zclip.min
!function($){
  // var serializeTopics = function(topics){
  //   return _.map(topics, function(topic){
  //     return {
  //       url: topic.url,
  //       title: topic.subject,
  //       author: topic.user.name,
  //       datetime: topic.last_post_created_at
  //     };
  //   });
  // };

  // var serializeBlogPosts = function(posts){
  //   return _.map(posts, function(post){
  //     return {
  //       url: 'http://community.spiceworks.com' + post.url,
  //       title: post.title,
  //       author: post.author,
  //       datetime: post.published_at
  //     }
  //   });
  // };

  // var renderTopics = function(topics){
  //   return JST['documentation/templates/forum_topics']({
  //     topics: topics
  //   });
  // };

  // var refreshScrollSpyData = function(){
  //   $('[data-spy="scroll"]').each(function (){
  //     var $spy = $(this).scrollspy('refresh');
  //   });
  // };

  // var setUpBootstrapScrollSpyAndAffix = function(){
  //   var $body = $(document.body),
  //       $sideBar = $('.sidebar'),
  //       sideBarMargin  = parseInt($sideBar.css('margin-top'), 10),
  //       mainHeaderHeight = $('.main-header .navbar').height();

  //   $body.scrollspy({
  //     target: '.sidebar',
  //     offset: sideBarMargin + mainHeaderHeight
  //   });

  //   $(window).on('load resize', function () {
  //     refreshScrollSpyData();
  //   });

  //   // back to top
  //   setTimeout(function () {
  //     $sideBar.affix({
  //       offset: {
  //         top: function () {
  //           var offsetTop = $sideBar.offset().top;
  //           return (this.top = offsetTop - sideBarMargin - mainHeaderHeight);
  //         },
  //         bottom: function () {
  //           return (this.bottom = $('footer').outerHeight(true))
  //         }
  //       }
  //     })
  //   }, 100)
  // };

  developers.documentation = {
    init: function(){
      // var NEW_POST_COUNT = 4;
      // setUpBootstrapScrollSpyAndAffix();
      developers.contact_form.init();

      // $.getJSON('http://community.spiceworks.com/api/forums/' +
      //   '314-extending-spiceworks.json?callback=?', function(data){
      //     var newTopics = _.first(data.latest_topics, NEW_POST_COUNT);
      //     $('.forum-info .loading')
      //       .replaceWith(renderTopics(serializeTopics(newTopics)));
      //   });

      // $.getJSON('/posts/blog', function(data){
      //     var newPosts = _.first(data, NEW_POST_COUNT);
      //     $('.blog-info .loading')
      //       .replaceWith(renderTopics(serializeBlogPosts(newPosts)));
      //   });
    },

    // 'on-your-site': {
    //   init: function( ){
    //     // var setupLoginWithSWForm = function(){
    //     //   var $form = $('.login-with-spiceworks-form'),
    //     //       submitButton = Ladda.create( $form.find('.btn-primary')[0] );

    //     //   $form
    //     //     .on('submit', function(){ submitButton.start(); })
    //     //     .on('ajax:success', showThankYouMsgForLoginSWBtn)
    //     //     .on('ajax:complete', function(){ submitButton.stop(); });
    //     // },

    //     // loadFollowButtonCode = function(){
    //     //   $('#follow-button-code')
    //     //     .val(getFollowButtonCode($('#vendor-name').val()));
    //     // },

    //     // getFollowButtonCode = function(vendorPage){
    //     //   vendorPage = typeof(vendorPage) === 'undefined' || vendorPage.length === 0 ? 'VENDOR_NAME' : vendorPage;
    //     //   return '<a href="http://community.spiceworks.com/pages/' + vendorPage + '/follow"><img src="http://static.spiceworks.com/share/follow.png" title="Follow us on Spiceworks" alt="Follow us on Spiceworks" /></a>';
    //     // },

    //     // loadGetSpiceButtonWithUrlCode = function(){
    //     //   $('#spice-button-with-url-code')
    //     //     .val(getSpiceButtonWithUrlCode($('#vendor-url').val()));
    //     // },

    //     // getSpiceButtonWithUrlCode = function(url){
    //     //   url = typeof(url) === 'undefined' || url.length === 0 ? 'URL_HERE' : url;
    //     //   return '<a href="http://community.spiceworks.com/info/addlink" class="spiceworks-share-button" data-url="' + url + '">Spice IT</a><script type="text/javascript" src="http://static.spiceworks.com/share/spice.js"></script>';
    //     // },

    //     // startListeningForCopyToClipboardClicks = function(){
    //     //   $('.copy-to-clipboard-btn').zclip({
    //     //     path:'http://www.steamdev.com/zclip/js/ZeroClipboard.swf',
    //     //     copy: function(){return $('#' + $(this).data('clipboard-source')).val();},
    //     //     afterCopy: function(){highlightElement($(this).data('clipboard-source'));}
    //     //   });
    //     // },

    //     // highlightElement = function(elementId){
    //     //   var el = $('#' + elementId);
    //     //   el.addClass('updated');
    //     //   setTimeout(function(){el.removeClass('updated');},200);
    //     // },

    //     // showThankYouMsgForLoginSWBtn = function(){
    //     //   $('#login-button-form-thank-you').show();
    //     //   $('#login-button-form').hide();
    //     // };

    //     //load code snippets in textareas
    //     // loadFollowButtonCode();
    //     // loadGetSpiceButtonWithUrlCode();

    //     //set up events for buttons
    //     // $('#update-follow-button-code').on('click', function(){
    //     //   loadFollowButtonCode();
    //     //   highlightElement($(this).data('target-element'));
    //     // });
    //     // $('#update-spice-button-with-url-code').on('click', function(){
    //     //   loadGetSpiceButtonWithUrlCode();
    //     //   highlightElement($(this).data('target-element'));
    //     // });
    //     // setupLoginWithSWForm();

    //     //set up zClip copy-to-clipboard functionality
    //     startListeningForCopyToClipboardClicks();
      // }
    // }
  }
}(jQuery);
