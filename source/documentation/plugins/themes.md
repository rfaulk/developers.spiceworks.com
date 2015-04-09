### Updating The Look Of Spiceworks With Plugins
You can also use plugins to change the aesthetic appeal of Spiceworks. We just won't tell the UI designers here what you're doing. Don't want to hurt their feelings or anything.

### Changing The Background To An Image

* Create a new plugin as before (see [Hello World Alert Plugin](/docs/in-spiceworks/creating-your-first-plugin-tutorial)).
* Enter the following text in the box and click "Save" in the toolbar:

~~~ javascript
  $(document.body).setStyle({backgroundImage: 'url(http:////static.spiceworks.com/assets/community/icons/medium/support-ac7d94e4ea599425f3a82389a22c9126.png)'});
~~~

* Open another browser window pointing at any Spiceworks page.
* Check out that background... (feel free to replace the above url with a link to whatever you like)

### What's going on here?
This code is setting the style of the document body to be a Spiceworks logo.  Any element on the page can be updated in this way.  With styles, you can affect things like background colors, fonts and borders.  That's really just the start, and this is a technique that will come in quite handy over time.


Next: [Hello World Widget Tutorial](/docs/in-spiceworks/widget-plugin-guide)
