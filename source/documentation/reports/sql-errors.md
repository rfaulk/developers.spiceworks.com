###Introduction

As Spiceworks evolves over time, so does our Database.  Sometimes, we need to make changes in order to support new features and functionality.  This Page will document changes that may affect your custom SQL reports.  This page will go into some technical detail, so knowledge of SQL is a must.

###Spiceworks 6.2
There are a few substantial database changes in 6.2 that will affect existing SQL reports, mainly centered around ticketing

**remote_collectors.site_name**
The site_name column in the remote_collectors table has been renamed to just '''name'''

**due_date**
The due_date column in the tickets table has been renamed due_at

**tickets.time_spent**
time_spent has been removed from the db table in 6.2. Now, to make this call, you'll need to use a SUM expression. As an example:
 SELECT tickets.time_spent FROM tickets
will no longer work. In 6.2, you'll need to use:
 SELECT COALESCE(SUM(ticket_work.time_spent), 0) as time_spent
 FROM tickets LEFT OUTER JOIN ticket_work ON ticket_work.ticket_id = tickets.id
 GROUP BY tickets.id

**tickets.labor**
Along the same lines, "labor" has been removed from the db table in 6.2, so you'll need to use a SUM expression for this as well. Example:
 SELECT tickets.labor FROM tickets
will no longer work. In 6.2, you'll need to use:
 SELECT COALESCE(SUM(ticket_work.labor), 0) as labor
 FROM tickets LEFT OUTER JOIN ticket_work ON ticket_work.ticket_id = tickets.id
 GROUP BY tickets.id



###Spiceworks 4.0
The only major change in Spiceworks 4.0 that would affect SQL report writers is around how users are related to tickets and comments.

**tickets.submitted_by_email**

The column 'submitted_by_email' has been removed.  In previous versions, this column contained the email address of the external end user who created a ticket.  In Spiceworks 4.0, we have changed how users work slightly.  End users are now stored in the 'users' table with a role of 'end_user'.  They are not (yet) shown in the user management page.

If your report uses 'submitted_by_email', then you will need to update the SQL to instead join against the users table.  You can find the user id in the created_by field of tickets.

For example, if before you had:

~~~
SELECT summary, submitted_by_email
FROM tickets
~~~

You would need to modify it to:

~~~
SELECT tickets.summary, users.email
FROM tickets LEFT OUTER JOIN users ON users.id=tickets.created_by
~~~


**comments.submitted_by_email**

The comments table was change in exactly the same way as the tickets table.  Join against the users table on created_by in order to get user information.
