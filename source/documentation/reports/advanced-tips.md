###Use "Time Worked" In Reports
Reporting on how much time has been worked by admins in Spiceworks can be a little tricky. Here are the column names that relate to this topic and what information they provide:

* **time spent by user:** this shows the single most amount of time worked on the ticket by each admin. You should combine this with the **Worked By** column for it to make sense. Even though it isn't really that useful...  

* **total time spent by user:** this will show the total time spent by each user. You should pair this with the **Worked By** column for this to be useful in multi-admin environments.  

* **time spent:** This is used to display the total amount of time worked on the ticket by all admins.

###Some Reporting Tricks And Examples

* **Using relative dates:** You can add relative dates such as 7 days ago, today, last week, etc. in the date boxes instead of traditional dates.  Using this, you could run a report with all tickets less than a week old by displaying all tickets where the create date is between **7 days ago** and **today**. **NOTE: The earlier date must always be listed first.**

* **Searching for devices that do not contain specific software:** Let's say you want to run a report to find out which devices do not have Microsoft Office 2007 installed. The best way to do this is to start with [this shared report](http://community.spiceworks.com/reports/1031) and simply change one line of the SQL to contain the name of the software you are looking for.

###Using SQL Reports
Spiceworks gives you the power to script your own reports using SQL.  This option will be useful for advanced users who can work with SQL.

For more information on how to use SQL and learning tools, check out [this site](http://www.w3schools.com/sql/ )

**Note:** Since the SQL reports run against the Spiceworks database schema it is possible that your reports might break if and when the Spiceworks schema changes. You may have to change your report in this case.

To build a report using SQL:

* Click **Reporting** under any of the navigation drop-downs.
* Click the **New Report** button in the toolbar.
* Enter a name and description for the report.
* Click the checkbox **Build this report using SQL**
* You can have the report available as a [[My_Spiceworks_Dashboard_Overview widget for your dashboard]] by checking the corresponding box.
* Choose whether to have the results displayed in a bar graph or pie chart.
* Write your SQL code
* Click either **Save** or **Save and Run**.

Spiceworks uses SQLite as a database. You can explore the database with one of the many free tools available - just be sure not to edit/write changes to the database!
We recommend [SQLite Manager - Firefox add-on](http://code.google.com/p/sqlite-manager/). Please be sure to **backup your database** before using these tools.

**SQL reports and graphs:**
Currently our Pie/Bar Charts only support single-series data, Only the first two columns of the sql report are used for charting. The first column specified in your SQL statement is the **label**, the second column the **value**. For eg: If you write a report to show number of tickets by users make sure the first column is the name of the user and the second column is the number of tickets. Otherwise the graph will not display data.

**Potential problems with SQL reports**
As Spiceworks evolves over time, so does our Database. Sometimes, we need to make changes in order to support new features and functionality.  To see changes that have been made to the database over time, visit [this page][Potential_Reporting_SQL_Errors].

###Using Specific & Relative Dates And Times
When creating reports, you can use both specific and relative dates and times. So if you want to view tickets closed between 3 weeks ago and today, just use those words. Spiceworks uses the Chronic language which works with Ruby. You can view Chronic's documentation [here](http://chronic.rubyforge.org/).

Some examples:

* yesterday at 4:00
* 7 days from now
* 3rd thursday this September
* January 5 at 7pm
* There are many more examples located at Chronic's site linked to above.

[Potential_Reporting_SQL_Errors]: /docs/in-spiceworks/potential-report-sql-errors
