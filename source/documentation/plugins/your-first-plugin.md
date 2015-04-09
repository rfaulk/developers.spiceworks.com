### Hello World Alert Plugin
Every great endeavor starts with humble beginnings. Welcome, friend, to the Hello World plugin. In this example, we're going to create a very basic plugin, which will set the foundation for anything else you may want to do in a plugin. And perhaps even some things you don't really want to do.

### Creating A New Plugin

* Navigate to **Settings** &rarr; **Manage Extensions**
* Click on the **New Extension** drop-down and select **New Plugin**
* Enter a name and description for the plugin and click **Save**
* Now, to add content to the plugin, you'll want to make sure the box to the left of the plugin name is checked and then click the **edit** link on the right.

### Adding Content
For this simple example, we are just going to use an **alert()** statement, which will open up a popup with the message you specify. As a warning, if you were to do this in a real plugin, you'd probably annoy everyone using your Spiceworks installation, as it will pop up on every page. Or, perhaps, you just really, really want them to see your message.

* Within the plugin editor, enter the following text in the box and click **Save** at the bottom:

~~~ javascript
  alert('hello world');
~~~

* Open another browser window pointing at any Spiceworks page.

Congratulations, you’ve just written your first plugin!  Feel warm and fuzzy with your accomplishment as you are greeted with a message on each page load.  And don’t turn your back on any of your other Spiceworks Admins, lest they wish to exact their revenge for being greeted with a popup on every page.

### What's going on here?
What you've just done is define code to be executed each and every time a Spiceworks page is loaded.  In this case, we're not really doing anything interesting, but this gets the general point across.  In future tutorials, we'll show you how to create code that actually affects the current page in interesting ways.


Since having this popup appear on every page load may get very annoying very quickly, you can disable your new plugin by unchecking the box to the left of the plugin name on the **Manage Extensions** screen. Even when disabled, you can still edit a plugin. When you want to re-enable it, just recheck the box again.
If you want, you can go ahead and delete this plugin; or, you can keep it and use it for the other tutorials.

### Using Javascript

Spiceworks plugins are written in Javascript and jQuery and executed within the loaded browser page. There are lots of resources available online for learning more about how to write Javascript and jQuery, so we are not going to cover that specifically here.
It is important to note, however, that since plugins are only executed within the browser, they do not have the ability to execute any code outside it.  This means that if you attempt to do something like create a variable in memory or write data to a file, this information would not exist for a different user using another browser instance.  Only calls utilizing the Spiceworks API will have the ability to persist and retrieve data from the server.  
