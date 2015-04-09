var developers = developers || {};

onReady = {
  exec: function( pageName ) {
    var ns = developers,
    parts = pageName.split('_'),
    obj = ns;

    while(parts.length){
      obj = obj[parts.shift()];
      if ( typeof obj === "undefined") {
        return;
      } else if( typeof obj.init === "function"){
        obj.init();
      }
    }
  },

  init: function() {
    var classList = document.body.className.split(' ');
    onReady.exec( classList[classList.length - 1] );
  }
};

jQuery( document ).ready( onReady.init );
