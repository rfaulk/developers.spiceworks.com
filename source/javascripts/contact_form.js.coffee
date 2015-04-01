do($ = jQuery) ->
  developers.contact_form = 
    init: ->
      getErrorText = (key, errors) ->
        if errors[key]?.length
          return "#{_.str.titleize(key)} #{_.first(errors[key])}"
        else
          return "Something went wrong"

      $contactForm = $('.contact-support form')
      $formMessages = $('.contact-support .contact-support-form-messages')
      formSubmit = Ladda.create( $contactForm.find('.btn-primary')[0] )

      $contactForm
      .on 'submit', ->
        $contactForm = $(@)
        $contactForm.find('.has-error').removeClass('has-error')
        $formMessages.find('.form-message').removeClass('in')
        formSubmit.start()
  
      .on 'ajax:success', (e, xhr, status) ->
        $contactForm = $(@)
        $formMessages.find('.success-message').addClass('in')
        $contactForm[0].reset()
  
      .on 'ajax:error', (e, xhr, status) ->
        errors = $.parseJSON(xhr.responseText).errors
        firstErrorKey = _.chain(errors).keys().first().value()
        $contactForm = $(@)
  
        $contactForm.find(":input[name='#{firstErrorKey}']")
          .closest('.field').addClass('has-error')
        $formMessages.find('.contact-support-form-error-message')
          .text(getErrorText(firstErrorKey, errors))
        $formMessages.find('.failure-message').addClass('in')
  
      .on 'ajax:complete', (e, xhr, status) ->
        formSubmit.stop()