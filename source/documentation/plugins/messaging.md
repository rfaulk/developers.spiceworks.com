### Adding A Message To Spiceworks With Plugins
In this tutorial, you’re going to learn how to put a message at the top of the Spiceworks application page, so that you have a way to inform your fellow admins of something important without using those annoying alert popups we covered in the [Hello World tutorial](/docs/in-spiceworks/creating-your-first-plugin-tutorial).

* Create a new plugin [as before](/docs/in-spiceworks/creating-your-first-plugin-tutorial)
* Insert the following code

~~~ javascript
  SPICEWORKS.app.messaging.push('Hello World');
~~~

* In another tab, load any page in Spiceworks
* Notice that your message was added to the top of the page
Note that if there is a SpiceTip at the top of the page, your message will not display until the SpiceTip is closed.

### What's going on here?
While you can notify people about changes in the system through **alert()** boxes, that's typically not the best way.  They're ugly and take over the screen.  In most cases, you just want to tell the user about something in a very temporary way.  The above code does just that.

If you want to take the message down, then you'll need to capture the return value of the call to **push()** and pass that to the **pop()** method.

~~~ javascript
  var messageId = SPICEWORKS.app.messaging.push('Hello World');
  setTimeout( function () {
    SPICEWORKS.app.messaging.pop(messageId);
  }, 3000);
~~~

In this case, we're just waiting 3 seconds and removing the message.  If that's really all you need to do, then you can also pass options to the <tt>push()</tt> call.

~~~ javascript
  SPICEWORKS.app.messaging.push('Message Text', {selfRemoving: true,     timeoutSeconds:3} );
~~~
