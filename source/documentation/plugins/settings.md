### Creating Configurable Plugins
Most plugins you'll want to make (or use) are going to have configurable options for the admin to set. Whether it's color schemes in a theme plugin, or display messages in a user portal plugin, these configurable options will make it easier to maintain than having to go into the code every time.

* Create a new plugin [as before](/documentation/plugins/your-first-plugin.html).
* Enter the following text in the box and click "Save" in the toolbar:

~~~ javascript
  plugin.configure({
    settingDefinitions:[
      { name:'greeting',
        label:'Greeting',
        type:'string',
        defaultValue:'Hello',
        example:'Hello, Hi There, etc.'},
      { name:'area',
        label:'Area',
        type:'enumeration',
        defaultValue:'World',
        options:['World', 'Country', 'City']}
    ]
  });
  SPICEWORKS.app.messaging.push(plugin.settings.greeting + " " + plugin.settings.area);
~~~

* Open another browser window pointing at any Spiceworks page.
* Check out the nice message.
* Go to the Manage Extensions settings page.
* Mouse over the plugin you created and click the "configure" link.
* Edit the settings then save and reload the page to see the message change.

NOTE: the "plugin.configure()" call must come before any use of "plugin.settings"

### What's going on here?
Often times, when you're building a plugin to share with others, there's certain data that will need to be configured on-site.  Asking an end user to edit a script creates a number of problems.  First, it's just a pain for anyone that's not accustomed to editing scripts.  Second, and perhaps more importantly, it makes it really hard to upgrade your plugin in the future.  If the user has modified your plugin, even to just change some settings, then any future updates will have to take that into consideration.

If you design your plugin using the configuration options, then your users will be able to configure  your plugin and get updates as they become available.
