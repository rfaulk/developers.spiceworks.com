### Adding Navigational Elements
This plugin tutorial will show you how to create a separate page of information within Spiceworks. This page will be accessible through the My Tools section of the Inventory drop-down menu.

* Create a new plugin [as before](/docs/in-spiceworks/creating-your-first-plugin-tutorial)
* Roll over the "Insert Code" button in the toolbar and select "Navigation Item".  The following code should be entered for you:

~~~ javascript
  SPICEWORKS.app.navigation.addItem({
    name: 'my_page',
    label: 'My Page',
    update: function (element) {
      /*update the element with information*/
      element.innerHTML = 'Hello World';
     }
  });
~~~

* Click **Save**
* Load any page in Spiceworks in another browser window
* Mouse over the Inventory navigation menu and click **My Tools**
* Select "My Page" from the page you are taken to

### What's going on here?
This is very similar to a new Widget Type.  It's just a bit simpler.  In this case, there's no icon or preferences to worry about.  Only a name, label and update function.  The update function works in exactly the same way (only you have a much larger space to fill).

Each Navigation Item requires a few things:

* name - this is a string that can be used as an html or javascript ID.  It should be only characters and underscores (no spaces or odd characters).  The Name is never shown to the end user, it's only used internally.
* label - This is how your item will be displayed on the **My Tools** page.
* update - This is the function that will be called to render your item.  The element passed to the function is where the content should be rendered.  This is typically done by setting the innerHTML attribute of the element.  There are no options passed to this update method (navigation items are not configurable).
