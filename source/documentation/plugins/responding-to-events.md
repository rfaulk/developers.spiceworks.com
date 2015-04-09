### Have Plugins Cause Spiceworks To Respond To Events Within The Application
There are plenty of times you would want actions only to occur when certain events happen. This tutorial will show you the basics of how to use the Spiceworks APIs to achieve this.

* Create a new plugin [as before](/docs/in-spiceworks/creating-your-first-plugin-tutorial)
* Add the following code:

~~~ javascript
  SPICEWORKS.portalv2.ready(function () {
    alert('Welcome to the IT Portal');
  });
~~~

* In another browser instance, go to your help desk portal.  Notice that you get an alert box welcoming you.
* In another browser instance, go to any page in the Spiceworks app.  Notice that you DO NOT get an alert box welcoming you.

### What's going on here?
In this example, we're showing you how to respond to an event in Spiceworks.  In this case, the event is that the user portal is "ready", that is to say, it is done loading and ready for whatever action you want to take.

Events like this one exist throughout the app.  For a full list of events, check out the [Spiceworks plugin API](/docs/in-spiceworks/plugin-api-overview-reference).

Some actions, like adding a widget type or navigation item, will be automatically scoped to the appropriate areas of the product.  But sometimes, a plugin author will need to really dig into some particular area of the product in order to add a feature.  Responding to events will allow them to do this.

Other events that might be helpful (copied from the official list in the Spiceworks Plugin API:

~~~ javascript
  // Global Event
  SPICEWORKS.ready(callback);
  // Application is ready
  SPICEWORKS.app.ready(callback);
  // Dashboard is ready (any of them)
  SPICEWORKS.app.dashboard.ready(callback);
  // Help Desk Events
  SPICEWORKS.app.helpdesk.ready(callback);
  SPICEWORKS.app.helpdesk.newTicket.ready(callback);
  SPICEWORKS.app.helpdesk.ticket.ready(callback);
  // Inventory Events (top level)
  SPICEWORKS.app.inventory.ready(callback);
  SPICEWORKS.app.inventory.environment.ready(callback);
  // Inventory Events (device groups)
  SPICEWORKS.app.inventory.group.ready(callback);
  SPICEWORKS.app.inventory.group.environment.ready(callback);
  SPICEWORKS.app.inventory.group.device.ready(callback);
  // Inventory Events (software groups)
  SPICEWORKS.app.inventory.softwareGroup.ready(callback);
  SPICEWORKS.app.inventory.softwareGroup.environment.ready(callback);
  SPICEWORKS.app.inventory.softwareGroup.software.ready(callback);
  SPICEWORKS.app.inventory.softwareGroup.hotfix.ready(callback);
  SPICEWORKS.app.inventory.softwareGroup.service.ready(callback);
  // Settings
  SPICEWORKS.app.settings.ready(callback);
  SPICEWORKS.app.settings.plugin.ready(callback);
  SPICEWORKS.app.settings.plugin.editor.ready(callback);
  // Portal Loaded
  SPICEWORKS.portal.ready(callback);
~~~
