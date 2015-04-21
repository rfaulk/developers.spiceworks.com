### Using Plugins To Run Reports
This tutorial will show you how to have Spiceworks run a report and display the data using a plugin. In this case, we'll just be creating a page in the My Tools section of Spiceworks that will always display a certain report.

* Create a new plugin [as before](/documentation/plugins/your-first-plugin.html).
* There is a code snippit for running a report and processing its results, but for now, just copy the following code into your plugin.  This example builds a navigation item that runs a report when clicked.

~~~ javascript
  SPICEWORKS.app.navigation.addItem({
    name: 'my_report_page',
    label: 'My Report Page',
    update: function (element) {
      var table = new Element('table');
      element.insert(table);
      SPICEWORKS.data.runReport( 15, function (response) {
        var header_row = new Element('tr');
        table.insert(header_row);
        response.columns.each(function(colname){
          var header_col = new Element('th');
          header_row.insert(header_col);
          header_col.update(colname);
        });
        response.items.each(function (item) {
          var row = new Element('tr');
          table.insert(row);
          response.columns.each(function(colname){
            var col = new Element('td');
            row.insert(col);
            col.update(item[colname]);
          });
        });
     });
   }
});
~~~

* Now open a new tab pointed at any Spiceworks page and select "My Tools" from the "Inventory" menu in the nav bar.
* Click "My Report Page" to view the report that the plugin generated.

### What's going on here?
This is the most complex example that we've created so far, so let's go through it one piece at a time.

First, let's add a new navigation item

~~~ javascript
  SPICEWORKS.app.navigation.addItem({
    name: 'my_report_page',
    label: 'My Report Page',
    update: function (element) {
~~~

This is covered in some detail in the previous tutorial, so I won't go into much detail here.  Just to say that when running a report, it's important to understand where the report data will GO.  In this case, we're loading the report data into a full page view.  We could, however, have also loaded this report into a widget.

Next, let's just create a simple table to hold our data.  This is using a Prototype.js api to create new page elements.  Prototype is used by Spiceworks and is therefore also available for use by plugin writers.  For more information on Prototype, check out there website: http://www.prototypejs.org/

~~~ javascript
  var table = new Element('table');
  element.insert(table);
~~~

After creating the new table, we inserted it into the element passed to the update function.

Next, we need to actually tell Spiceworks to run a report for us.  Currently, you need to pass the id of the report to be run, but in future versions (or even the next beta) you should be able to use the report name directly instead of the id.  The <tt>runReport</tt> method takes two parameters, the id of the report to run and a function that will process the results.

~~~ javascript
  SPICEWORKS.data.runReport( 15, function (response) {
~~~

The response object contains a couple of properties:

* columns - an array of the column names
* items - an array of objects.  Each object will contain a value for each column.

Next, we'll create a header row and insert the column names into the rows.  

~~~ javascript
  var header_row = new Element('tr');
   table.insert(header_row);
   response.columns.each(function(colname){
     var header_col = new Element('th');
     header_row.insert(header_col);
     header_col.update(colname);
  });
~~~

Now, let's process the actual data from this report.  This time, however, we'll scan through each of the items, adding them one by one to the table we created before.

~~~ javascript
  response.items.each(function (item) {
    var row = new Element('tr');
    table.insert(row);
    response.columns.each(function(colname){
      var col = new Element('td');
      row.insert(col);
      col.update(item[colname]);
    });
  });
});
}
});
~~~

And finally, we close up all the brackets and curly braces.

Reports are a very powerful way for plugin writers to get complex data out of Spiceworks and then process it in new and interesting ways.
