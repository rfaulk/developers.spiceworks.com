Each of the following types can be called with additional parameters to determine what's returned.  All the return types are JSON objects and the best way to introspect the data is Firebug. It makes it really easy to try out. Just open firebug on a page with Spiceworks loaded and type in the javascript fragment.

Each type can be called with additional parameters to determine what's returned.  With Tickets, for exmaple:

~~~ javascript
  // All unassigned tickets
  SPICEWORKS.data.Ticket.find('all', {filter:'unassigned_tickets'});

  // All open tickets    SPICEWORKS.data.Ticket.find('all', {filter:'open'});
~~~

### Tickets
To return data about the tickets in the system you can make the following calls:

**Note**: These calls will only return 100 tickets. In order to view additional tickets, you will have to use the page_size and page commands. As an example, to view open ticket number 101-150, you would use the command:

~~~ javascript
	SPICEWORKS.data.Ticket.find('all', {filter:'open', page_size:50, page:3});
~~~

Unfortunately there is currently not a way to get the total count, but this is under development. [See here](http://community.spiceworks.com/topic/73154) for a workaround to gather ticket counts.

* **Open Tickets:** `SPICEWORKS.data.Ticket.find( 'all', {filter:'open'});`
* **Closed Tickets:** `SPICEWORKS.data.Ticket.find( 'all', {filter:'closed'});`
* **Unassigned Tickets:**  `SPICEWORKS.data.Ticket.find( 'all', {filter:'unassigned'});`
* **Past Due Tickets:**  `SPICEWORKS.data.Ticket.find( 'all', {filter:'past_due'});`
* **Recent Tickets:**  `SPICEWORKS.data.Ticket.find( 'all', {filter:'recent'});`
* **Assigned Tickets:**  `SPICEWORKS.data.Ticket.find( 'all', {filter:'assigned'});`
* **Tickets Requiring A Purchase:**  `SPICEWORKS.data.Ticket.find( 'all', {filter:'requiring_purchase'});`
* **Tickets By Email Address:**  `SPICEWORKS.data.Ticket.find( 'all', {filter:'email'});`
* **Tickets Opened & Assigned To A Certain User ID:**  `SPICEWORKS.data.Ticket.find( 'all', {filter:'open_and_assigned_to'});`
* **Tickets Opened & Assigned To The Current User:**  `SPICEWORKS.data.Ticket.find( 'all', {filter:'open_and_assigned_to_current_user'});`
* **Tickets Assigned To A Certain User And Have Not Been Viewed:**  `SPICEWORKS.data.Ticket.find( 'all', {filter:'assigned_to_user_and_has_not_been_viewed'});`

### Devices
To return data about the devices in the system you can make the following calls:

* **Devices By Hostname (where host_name is the Hostname):** There are many options when searching by hostname.
  * **Disks:** `SPICEWORKS.data.Device.find('all', {hostname:'host_name', method:'disks'});`
  * **Attachments:** `SPICEWORKS.data.Device.find('all', {hostname:'host_name', method:'attachments'});`
  * **Notes:** `SPICEWORKS.data.Device.find('all', {hostname:'host_name', method:'note'});`
  * **Webservers:** `SPICEWORKS.data.Device.find('all', {hostname:'host_name', method:'webservers'});`
  * **Scan Alerts:** `SPICEWORKS.data.Device.find('all', {hostname:'host_name', method:'scan_alerts'});`
  * **Network Adaptors:** `SPICEWORKS.data.Device.find('all', {hostname:'host_name', method:'network_adapters'});`
  * **Events:** `SPICEWORKS.data.Device.find('all', {hostname:'host_name', method:'events'});`
  * **VLAN Ports:** `SPICEWORKS.data.Device.find('all', {hostname:'host_name', method:'vlan_ports'});`
  * **Interfaces:** `SPICEWORKS.data.Device.find('all', {hostname:'host_name', method:'interfaces'});`
  * **Categories:** `SPICEWORKS.data.Device.find('all', {hostname:'host_name', method:'categories'});`
  * **Anti-Virus Products:** `SPICEWORKS.data.Device.find('all', {hostname:'host_name', method:'anti_virus_products'});`
  * **Service Installations:** `SPICEWORKS.data.Device.find('all', {hostname:'host_name', method:'service_installations'});`
  * **Services:** `SPICEWORKS.data.Device.find('all', {hostname:'host_name', method:'services'});`
  * **Local Disks:** `SPICEWORKS.data.Device.find('all', {hostname:'host_name', method:'local_disks'});`
  * **Software Installations:** `SPICEWORKS.data.Device.find('all', {hostname:'host_name', method:'software_installations'});`
  * **Software:** `SPICEWORKS.data.Device.find('all', {hostname:'host_name', method:'software'});`
  * **Hotfix Installations:** `SPICEWORKS.data.Device.find('all', {hostname:'host_name', method:'hotfix_installations'});`
  * **Hotfixes:** `SPICEWORKS.data.Device.find('all', {hostname:'host_name', method:'hotfixes'});`
  * **Shares:** `SPICEWORKS.data.Device.find('all', {hostname:'host_name', method:'shares'});`
  * **Open Shares:** `SPICEWORKS.data.Device.find('all', {hostname:'host_name', method:'open_shares'});`
  * **Network Users:** `SPICEWORKS.data.Device.find('all', {hostname:'host_name', method:'network_users'});`
  * **Printers:** `SPICEWORKS.data.Device.find('all', {hostname:'host_name', method:'printers'});`
  * **Firewall Products:** `SPICEWORKS.data.Device.find('all', {hostname:'host_name', method:'firewall_products'});`
  * **Memory Slots:** `SPICEWORKS.data.Device.find('all', {hostname:'host_name', method:'memory_slots'});`
  * **Microsoft Exchange:** `SPICEWORKS.data.Device.find('all', {hostname:'host_name', method:'microsoft_exchange'});`
  * Microsoft Exchange Counter:** `SPICEWORKS.data.Device.find('all', {hostname:'host_name', method:'microsoft_exchange_counter'});`
  * **Microsoft Exchange Mailboxes:** `SPICEWORKS.data.Device.find('all', {hostname:'host_name', method:'microsoft_exchange_mailboxes'});`
  * **Video Controllers:** `SPICEWORKS.data.Device.find('all', {hostname:'host_name', method:'video_controllers'});`
  * **Desktop Monitors:** `SPICEWORKS.data.Device.find('all', {hostname:'host_name', method:'desktop_monitors'});`
  * **Comparable Disks:** `SPICEWORKS.data.Device.find('all', {hostname:'host_name', method:'comparable_disks'});`
  * **Comparable Services:** `SPICEWORKS.data.Device.find('all', {hostname:'host_name', method:'comparable_services'});`
  * **Comparable Software:** `SPICEWORKS.data.Device.find('all', {hostname:'host_name', method:'comparable_software'});`
  * **Comparable Hotfixes:** `SPICEWORKS.data.Device.find('all', {hostname:'host_name', method:'comparable_hotfixes'});`
  * **Monitor Alerts:** `SPICEWORKS.data.Device.find('all', {hostname:'host_name', method:'monitor_alerts'});`
  * **Tickets:** `SPICEWORKS.data.Device.find('all', {hostname:'host_name', method:'tickets'});`
  * **Activities:** `SPICEWORKS.data.Device.find('all', {hostname:'host_name', method:'activities'});`

* **Devices in a Specific Group:** `SPICEWORKS.data.Device.find('all', {category: 'inventory_group'});`

* **Devices By IP Address (where ip_address is the actual IP address and you can use any of the methods listed above):** `SPICEWORKS.data.Device.find('all', {ip:'ip_address', method:'from_above'});`


### Alerts
To return data about an alert, you can make the following calls:

* **Alerts By Data Monitor ID(where desired_id is the id you want to search for:** `SPICEWORKS.data.Alert.find('all', {data_monitor_id:'desired_id'});`
* **Active Monitor Alerts:** `SPICEWORKS.data.Alert.find('all', {filter:'active'});`
* **Recent Alerts:** `SPICEWORKS.data.Alert.find('all', {filter:'recent'});`
* **External Alerts:** `SPICEWORKS.data.Alert.find('all', {filter:'external'});`

There are more specific that I don't understand.

### Data Monitors
To return data from monitors, you can make the following calls: (I'm not really sure what this is)

* **Find All Data Monitors By Model:** `SPICEWORKS.data.DataMonitor.find('all', {model:'enter_model'});`
* **Find All Data Monitors By ID:** `SPICEWORKS.data.DataMonitor.find('all', {id:'enter_id'});`
* **Find All Active Data Monitors:** `SPICEWORKS.data.DataMonitor.find('all', {filter:'active'});`
* **Find All Data Monitors Set To Notify User:** `SPICEWORKS.data.DataMonitor.find('all', {filter:'notify_user'});`
* **Find All Data Monitors By Name:** `SPICEWORKS.data.DataMonitor.find('all', {name:'enter_name'});`
* **Find All Data Monitors By Criteria:** `SPICEWORKS.data.DataMonitor.find('all', {criteria:'enter_criteria'});`
* **Find All Data Monitors By Qualifier:** `SPICEWORKS.data.DataMonitor.find('all', {qualifier:'enter_qualifier'});`

### Groups
Make the following calls to return data about groups:

* **Return a collection of all Groups:** `SPICEWORKS.data.Group.find('all');`

### Software
Make the following calls to return software data:

* **Find Software By Vendor:** `SPICEWORKS.data.Software.find('all', {vendor:'enter_vendor'});`
* **Find Software By Name:** `SPICEWORKS.data.Software.find('all', {name:'enter_name'});`
* **Find Software By Statistics:** `SPICEWORKS.data.Software.find('all', {method:'statistics'});`
* **Find Software By Computer:** `SPICEWORKS.data.Software.find('all', {method:'computers'});`
* **Find Software By Installations:** `SPICEWORKS.data.Software.find('all', {method:'installations'});`
* **Find Software By Alerts:** `SPICEWORKS.data.Software.find('all', {method:'alerts'});`

### Services
The following calls will return data about services:

* **Find Services By Name:** `SPICEWORKS.data.Service.find('all', {name:'enter_name'});`
* **Find Services By Statistics:** `SPICEWORKS.data.Service.find('all', {method:'statistics'});`
* **Find Services By Computer:** `SPICEWORKS.data.Service.find('all', {method:'computers'});`
* **Find Services By Installation:** `SPICEWORKS.data.Service.find('all', {method:'installations'});`

### Hotfixes
Return data about hotfixes with the following calls:

* **Find Hotfixes By Name:** `SPICEWORKS.data.Hotfix.find('all', {name:'enter_name'});`
* **Find Hotfixes By Statistics:** `SPICEWORKS.data.Hotfix.find('all', {method:'statistics'});`
* **Find Hotfixes By Computer:** `SPICEWORKS.data.Hotfix.find('all', {method:'computers'});`
* **Find Hotfixes By Installation:** `SPICEWORKS.data.Hotfix.find('all', {method:'installations'});`

### Users
Return user data by making the following calls:

* **Find Users By ID:** `SPICEWORKS.data.User.find('all', {id:'enter_id'});`
* **Find Users By Email Address:** `SPICEWORKS.data.User.find('all', {email:'enter_email_address'});`
* **Find Users By First Name:** `SPICEWORKS.data.User.find('all', {first_name:'enter_name'});`
* **Find Users By Last Name:** `SPICEWORKS.data.User.find('all', {last_name:'enter_name'});`

### Reports
Make the following calls to return report data:

* **Find Reports By ID:** `SPICEWORKS.data.Report.find('all', {id:'enter_id'});`
* **Find Reports By Description:** `SPICEWORKS.data.Report.find('all', {description:'enter_description'});`
* **Find The Last Run Report:** `SPICEWORKS.data.Report.find('all', {last_run:''});`
* **Find Reports By Name:** `SPICEWORKS.data.Report.find('all', {name:'enter_name'});`
