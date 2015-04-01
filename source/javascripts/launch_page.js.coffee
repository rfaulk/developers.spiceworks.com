# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

do($ = jQuery) ->
  getErrorText = (key, errors) ->
    if errors[key]?.length
      return "#{_.str.titleize(key)} #{_.first(errors.email)}"
    else
      return "Something went wrong"

  developers.home = 
    init: ->  
      $('.email-form')
      .on 'submit', ->
        $emailForm = $(@)
        $messagesId = $emailForm.data('messages-id')
      
        $emailForm
          .find('.inputs-wrap')
            .removeClass('has-error')
          .end()
          .siblings('.email-form-messages')
            .find('.form-message')
              .removeClass('in')
        Ladda.create( $emailForm.find('.btn-primary')[0] ).start()
    
      .on 'ajax:success', (e, xhr, status) ->
        $emailForm = $(@)

        $emailForm
          .hide()
          .siblings('.email-form-messages') 
            .find('.success-message')
              .addClass('in')
          
    
      .on 'ajax:error', (e, xhr, status) ->
        errors = $.parseJSON(xhr.responseText).errors
        $emailForm = $(@)

        $emailForm
          .find('.inputs-wrap')
            .addClass('has-error')
          .end()
          .siblings('.email-form-messages')
            .find('.email-error-message')
              .text(getErrorText("email", errors))
            .end()
            .find('.failure-message')
              .addClass('in')
    
      .on 'ajax:complete', (e, xhr, status) ->
        Ladda.create( $(@).find('.btn-primary')[0] ).stop()


      $('.sign-up-link').on 'click', (e)->
        e.preventDefault()

        $(@)
          .hide()
          .parent()
            .siblings(".form-wrapper")
              .show()
              .find('input[type="email"]')
                .focus()
