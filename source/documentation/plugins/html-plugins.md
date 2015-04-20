Separating your HTML source from your JavaScript will help make your code esaier to reuse and maintain.

This tutorial will show you how to add a separate HTML file to your plugin.

###**Create & Edit the Plugin**
Create a new plugin and access the editor (see [hello world plugin tutorial](/documentation/plugins/index.html)).

###**Add & Edit the HTML file**
* Click **Add** (1) and select **HTML** from the drop-down menu (2).

![add html](http://static.spiceworks.com/shared/post/0003/0620/add_html_plugin.png)

* Enter a name for this file; in this example, let's call it test.html. Click **Add Content**.


* Enter the code displayed below in the text editor for the html file:

~~~ html
<p>This is an html template demo.</p>

<p style="color:green">Welcome <b>#{name}</b>!</p>

<h2>Hey #{name}</h2>
<p>
    Did you know you can replace multiple variables?
    Like this #{variable}?
</p>
~~~

* Click **Save** in the bottom right corner.

###**Edit the JS File**
Now that the html file is ready, we just need the main plugin file to call them. The call you need is:

~~~
plugin.renderHtmlTemplate( name, map, callback )
~~~

* **name** is the name you chose when creating the html file (test.html in this example)
* **map** is a hash of template variable values you want to replace. The html template can have points where you want to substitute in context or values. This can be done in the html file with the convention **{variable_name}**.
* **callback** is the function callback that takes the rendered html content as a parameter and gives it back to you to display (or whatever else).

Now you're ready to enter the code:

* Click **initialize.js** under the Content menu on the left

![initialize js](http://static.spiceworks.com/shared/post/0003/0623/initialize_js.png)

* Edit the code to match the following:

~~~ javascript
SPICEWORKS.app.navigation.addItem({
 name: 'HTML Demo',
 label: 'HTML Demo',
 update: function (element) {
  var name_input = window.prompt('What is your name?', '');

  plugin.renderHtmlTemplate( 'test.html',
                             {name:name_input,
                              variable:'Spiceworks Plugins!'},
                             function(content) {
                               element.update(content);
                             } );
  }
});
~~~

* You can click **Check Syntax** at the top of the editor to have Spiceworks check to see if you have any syntax errors.
* Click **Save**.

###**View your masterpiece**
Now that everything is finished, just navigate to **My Tools** from the **Inventory** drop-down menu and you should see **HTML Demo** listed. Click that link to see your results.

![html final](http://static.spiceworks.com/shared/post/0003/0624/html_tutorial.png)
