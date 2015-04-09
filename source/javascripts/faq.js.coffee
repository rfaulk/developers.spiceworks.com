do($ = jQuery) ->
  developers['how-it-works'] =
    faq:
      init: ->
        $('.faq').children('li').click ->
          $(@).toggleClass('on');
