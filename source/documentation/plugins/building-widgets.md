### Creating New Dashboard Widgets
This tutorial will show you how to use plugins to add new widgets types to your Spiceworks Dashboard

* Create a new plugin and access the editor [as before](/docs/in-spiceworks/creating-your-first-plugin-tutorial)
* Roll over the "Insert Code" button in the toolbar and select "Widget Type".  The following code should be entered for you. Make a few changes to have it look like this:

~~~ javascript
  SPICEWORKS.app.dashboard.addWidgetType({
    name: 'my_widget',
    label: 'My Widget',
    prefs: [
      {name: 'text', label: 'Widget Text Option', type: 'string', defaultValue: 'Hello World'}
    ],
    update: function (element, options) {
      element.innerHTML = options.text;
    }
  });
~~~

* Click "Save" in the toolbar.
* Open another browser window and go to the Spiceworks Dashboard.
* Click "Add Content" and click to add the "My Widget" widget.
* Once the widget is added to the page, you can click edit to see the "Widget Text Option" with default value "Hello World".  You can change this to whatever you want. Note that this will only be visible for you; your fellow admins won't have this widget visible on their Dashboard, and the text you edit only changes for you.

### What's going on here?
The above code registers a new type of widget with the dashboard infrastructure.  The new type of widget is defined using what's called "object notation" in Javascript.  All that means is that we're defining a new, simple object on the fly.

Each widget type requires a few things:

* name - this is a string that can be used as an html or javascript ID.  It should be only characters and underscores (no spaces or odd characters).  The name is never shown to the end user, it's only used internally.
* label - This is how the user will see the widget in the "Add Content" list.
* prefs - These are the widget preferences that should appear when the user clicks on   "edit" in the widget titlebar.  A **defaultValue** can be included for each type, if desired, as well as an **example**, which will appear as italicized text after the data entry point. The types supported include:
  * 'string'
  * 'checkbox'
  * 'enum', 'enumeration', or 'select', where options must be specified as an array. For  example:
~~~ javascript
{name: 'unit', label: 'Report Units:', type:'enum', options: ['Bytes','KB','MB','GB'], defaultValue:'KB, example:'disk size''}
~~~
Note that invalid types will not result in an error and are treated as type 'string'.

* update - This is the function that will be called to render your widget.  The element passed to the widget is where the content should be rendered.  This is typically done by setting the innerHTML attribute of the element.  **Options** is a simple object containing all of your preferences.  If you have a preference called "foo" then options.foo is where you'll find the value the user has set.

Optionally, you can also include:

* icon - URL to the icon which will be used in the top left of the widget and in the "Add Content" popup.  It should be 16px x 16px.  Spiceworks will not resize the image to fit.


Next: [Hello World Navigation Plugin Tutorial](/docs/in-spiceworks/navigation-plugin-guide)
