### Using Multiple files within a plugin
There are advantages to separating things into multiple files.  When it comes to writing code, one big thing is not necessarily better than a collection of things that can comprise the whole.  In any case you can read the section referenced above to see the advantages of splitting things into multiple files.  Or, if you’re just going to trust me to tell you it is a good thing, let’s move on to the tutorial to learn how you can accomplish this.

* First, create a new plugin [as before](/documentation/plugins/your-first-plugin.html).
* Edit the plugin to get in there and add the multiple files.
We'll break this tutorial up differently than we have to make it easier to follow and explain what's happening as we go.

### Adding an image:
The most important (and probably hardest) part of a plugin that adds an image to your background is choosing the image you want displayed. Once you get past that, adding it is simple:

* Click **Add** in the bottom left corner of the editing window.
* Click **Upload File** in the bottom left corner of the Add Content window.
* Click **Choose File**, select your file, click **Open**, then click **Upload**.

### Adding and editing CSS file:
You should now see your image file listed on the lefthand side underneath the <tt>initialize.js</tt> file. Now it's time to create a CSS file to store your style info.

* Click **Add** and select **CSS Styles** from the drop-down menu. Click **Add Content**.
   * You can add CSS styles, JSON, Javascript, Configuration information, or built-in plugins from this menu.
* Enter the following code in the text editor for the css file:

~~~ CSS
  body{ background:black url(imagename.type) repeat-x top left }
~~~

   * Replace imagename.type with the name of the image you uploaded, as it is listed in the column of file names on the left of the plugin editing window. i.e. Spiceworks.png
   * you can substitute any color for black, edit the repeat options (no-repeat, repeat-x, repeat-y, repeat), and edit the positioning (top right, center left, center center, bottom center, 50% 50%, 100px center, 50%, 100px, etc ...)
* Click **Save** in the bottom right corner.

### Editing the JS file:
Now that the image and style files are ready, we just need the main plugin file to call them.

* Click on initialize.js on the left side.
   * This is where you enter the meat and potatoes of your plugin. For this example, there is not much to enter here, but more complex plugins will primarily use this location.
* Enter the following code in the text editor:

~~~ javascript
  plugin.includeStyles();
~~~

* You can click **Check Syntax** at the top of the editor to have Spiceworks check to see if you have any syntax errors.
* Click **Save**.

### View your masterpiece:
Now that everything is finished, you just need to click on a link in Spiceworks and view your new background image.
