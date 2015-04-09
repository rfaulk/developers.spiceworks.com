### Updating Plugins for Helpdesk v2
This document will aim to assist plugin authors in process of updating classic helpdesk plugins to work with Helpdesk v2.


### Example: Modifying the Helpdesk once it's ready
Below is a typical example of how to modify the helpdesk once it is ready using the classic helpdesk APIs:

~~~javascript
  SPICEWORKS.app.helpdesk.ready(function () {
    // do something to decorate the helpdesk after it's loaded
  });
~~~

For Helpdesk v2 this would become


~~~javascript
  $UI.app.pluginEventBus.on('app:primary:show', function () {
    // do something to decorate the primary section of the page.
    // In the case of the helpdesk, the tickets table
  });
~~~

or possibly

~~~javascript
  $UI.app.pluginEventBus.on('app:secondary:show', function () {
    // do something to decorate the secondary section of the page.
    // In the case of the helpdesk, the section of the page where tickets are loaded.
  });
~~~


### Example: Modifying the Helpdesk in response to events
There are cases where we might want to do something when a certain event occurred. For example, when a ticket is closed or opened we might want to update a counter to show the new count. Another case might be restyling a ticket's row when a ticket's due date is modified. A classic helpdesk plugin might look something like this:

~~~javascript
  SPICEWORKS.observe('app:helpdesk:ticket:closed', function () {
    // update the ticket counter
  });

  SPICEWORKS.observe('app:helpdesk:ticket:opened', function(){
    // update the ticket counter
    // re-apply styles to the ticket table for the newly added ticket
  });
~~~

This might now look something like:

~~~javascript
  $UI.app.pluginEventBus.on('app:helpdesk:ticket:change:status', function (ticket) {
    // update the ticket counter
    if (ticket.status == 'open') {
       // re-apply styles to the ticket table for thew newly added ticket
    }
  });
~~~

### Example: Modifying helpdesk comments

Let's say in the classic helpdesk a plugin changed the color of comments like so:

~~~javascript
  SPICEWORKS.app.helpdesk.ticket.ready(function(){
    // change the comment background color.
  });
~~~

We will now need to listen for an event that adds the ticket pane to the DOM. In addition, if you wanted to change the color of a comment once it is added to a ticket, you can:

~~~javascript
  (function($){
    $UI.app.pluginEventBus.on('app:secondary:show', changeCommentColor)
                          .on('app:helpdesk:ticket:comment:show', changeCommentColor);

    function changeCommentColor () {
      $('.activity-event').css('background', 'yellow');
    }
  })(window.jQuery);
~~~
