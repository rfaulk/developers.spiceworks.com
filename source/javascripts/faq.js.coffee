do($ = jQuery) ->
  developers.faq = 
    init: ->
      $('.faq').children('li').click ->
        $(@).toggleClass('on');