do($ = jQuery) ->
  developers.support =
    faq:
      init: ->
        $('.faq').children('li').click ->
          $(@).toggleClass('on');
