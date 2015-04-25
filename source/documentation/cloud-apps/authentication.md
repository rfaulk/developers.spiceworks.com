# Authentication

Typical web sites and web applications identify and authenticate users
by using email- or username-based logins with passwords, or they delegate
part of this responsibility to an OAUTH2 provider like Facebook Login
or Google+ Sign-In.

While your cloud app is free to implement its own forms-based or OAUTH2
registration and login system, this doc will cover how to use the
Spiceworks SDK to authenticate users and altogether avoid login forms
and login buttons.

By following the steps in this guide, you cloud app will be able to
authenticate a login session for the Spiceworks user accessing your app.
Further, if your cloud app costs money in the Spiceworks App Center,
following the steps of this guide will ensure the user accessing your
app is authorized to do so.

### Prerequisite: Allow Spiceworks to embed your app

Your cloud app built for Spiceworks is a web application that will be
embedded within the Spiceworks Desktop application (a.k.a. the host
application) within an &lt;iframe&gt;. From within this container, your
JavaScript can leverage the Spiceworks SDK to obtain information from
the Spiceworks host application about its environment.
Because Spiceworks Desktop applications can be installed on any host
URI within any corporate domain, you must not set the `X-Frame-Options`
HTTP header.

### Step 1: Trust the Spiceworks host application

Not setting the `X-Frame-Options` header allows any Spiceworks host application
to embed your cloud app in an &lt;iframe&gt;. This also means that any web site
anywhere can also embed your cloud app in an &lt;iframe&gt;. How can you distinguish
between valid Spiceworks host applications and evil hacker empires? It starts
with your JavaScript!

The first step to authenticating access to your cloud app is to request
the application environment information using the Spiceworks SDK:

```js
var card = new SW.Card();
card.services('environment').request('environment').then(
  function(environment){
    /* success! */
  ),
  function(errors){
    /* danger! danger! */
  });
```

The Spiceworks SDK will communicate between the &lt;iframe&gt; containing your
cloud app and the parent window of the Spiceworks host application.
Using its own cryptographic verification, the SDK will authenticate
the hosting application. If all goes well, the JavaScript promise is fulfilled
and your first function is called with the `environment` object. If not,
the promise is rejected and your second function is called with error
information.

### Step 2: Obtain the current user identifier

Identifying the currently logged in Spiceworks user in your canvas app
requires your JavaScript to extract the user information via the Spiceworks SDK.
Luckily, this information is already provided to your app via the
`environment` object obtained in the previous step.

```json
{
  "app_host":
    {
      "auid": "92a450d9a3e596d7bef9ed9853b6a454"
    },
  "user":
    {
      "id": 159,
      "user_auid": "e34e59c92f43b49f9725a29f86632c12",
      "first_name": "Jolly",
      "last_name": "Fellow"
    }
}
```

**_Note:_** *Additional details omitted from the JSON above.*

#### Environment

Using the `environment` object, you can now uniquely identify the hosting
application and/or the Spiceworks user of your cloud app.

Name|Type|Description
----|----|-----------
`app_host.auid`|`string`|Uniquely identifies the Spiceworks app into which your cloud app is installed
`user.user_auid`|`string`|Uniquely identifies the Spiceworks user accessing your cloud app
`user.id`|`integer`|Identifies the Spiceworks user, but scoped only to this Spiceworks host application
`user.first_name`|`string`|The user's first name
`user.last_name`|`string`|The user's last name

Both `auid` and `user_auid` are application-unique identifiers. This means they
are unique to your cloud app alone. If the same real-life user installs your
cloud app into a different installation of Spiceworks, you will see
a different `auid` but the same `user_auid`. Also, if you build more than one
cloud app, the same real-life user from the same install of Spiceworks will be
identified with a different pair of values to each of your two cloud apps.

### Step 3: Obtain an OAUTH2 access token

An OAUTH2 access token is like a temporary password granted to your cloud app
on behalf of the Spiceworks user without the Spiceworks user having to
give you his or her password directly.

Using the `Login` object while inside of a Spiceworks host application will
automatically grant you an OAUTH2 access token without forcing the user to
reauthenticate with Spiceworks:

```js
var login = new SW.Login({appId: "your-oauth2-application-id"});
login.request('login').then(
  function(access_token){
    /* success! */
  },
  function(errors){
    /* oh no! */
  });
```

##### Login parameters

Parameter|Type|Description
---------|----|-----------
`appId`|`string`|The OAUTH2 application identifier generated for you when you first created your cloud app with Spiceworks

> **Note:** Handle the returned `access_token` with care and never request access
> tokens unnecessarily. OAUTH2 requires that you __always use HTTPS/SSL__ when
> transmitting access tokens. Never transmit an access token "in the clear".

### Step 4: Use the OAUTH2 token to authenticate the user

At this point, your JavaScript is free to use the Spiceworks SDK to do
cool and amazing things inside the browser. However, at some point you're
going to want the user to access some protected area of your cloud app,
and that means using the details collected earlier to complete a login.

#### Step 4a. Submit the login details to your server

A typical form-based login passes a username and password securely
to the server where it is verified. In this case, the "username" is
the combination of `environment.app_host.auid` and
`environment.user.user_auid`, and the "password" is the
`access_token` provided by the `Login` object.

##### Example with jQuery AJAX

```js
$.post('https://your-server/sign_in', {
    auid: environment.app_host.auid,
    user_auid: environment.user.user_auid,
    access_token: access_token
  });
```

##### Example with JavaScript and an HTML FORM

```html
<form id="login-form" action="https://your-server/sign_in" method="post">
  <input type="hidden" id="login-auid" name="auid">
  <input type="hidden" id="login-user_auid" name="user_auid">
  <input type="hidden" id="login-access_token" name="access_token">
</form>
```
```js
document.getElementById('login-auid').value = environment.app_host.auid;
document.getElementById('login-user_auid').value = environment.user.user_auid;
document.getElementById('login-access_token').value = access_token;
document.getElementById('login-form').submit();
```

#### Step 4b. Verify the OAUTH2 token with Spiceworks

Recall that an OAUTH2 access token is like a temporary password granted
to your cloud app. Even if it were the real user's password, you would
need to "ask" Spiceworks whether the password was right before trusting the
user. OAUTH2 is no different; your server needs to verify the authenticity
of the access token with Spiceworks.

Once the credentials have been passed to your server,
**your server submits them to Spiceworks** for verification at
https://frontend.spiceworks.com/appcenter/api/app_user_authorization
by passing the following parameters:

Key|Value
---|-----
`host_auid`|The host identifier obtained from `environment.app_host.auid` in step 2
`user_auid`|The user identifier obtained from `environment.user.user_auid` in step 2
`access_token`|The access token obtained from the `Login` object in step 3
`app_secret`|The OAUTH2 secret key generated for you when you first created your cloud app with Spiceworks

> **Note:** Your OAUTH2 `app_secret` must be protected as confidentially as
> possible! Never embed this value in a public code repository, do not log
> this value in your log files, and never pass this value to any service besides
> Spiceworks. __The only time you will ever use this value in production is to
> authenticate your application's identity to Spiceworks, and only over HTTPS/SSL.__

In response, you will receive an `HTTP 200 OK` result with authorization information:

```json
{
 "authorization":
   {
     "namespace": "your-app-namespace",
     "host_auid": "92a450d9a3e596d7bef9ed9853b6a454",
     "user_auid": "e34e59c92f43b49f9725a29f86632c12"
   }
}
```

If the user is not authorized you will receive an `HTTP 403 Forbidden` result with error information:

```json
{
 "errors": ["User is not authorized for your application"]
}
```


##### Example with cURL

```bash
$ curl -G -X GET -H "Accept: application/json" -d "access_token=814bd50cb926cfaebea353dd8b5f704def9e04b77372eed01f0d26f1d602e108" -d "app_secret=bfda03b8c726a62309fe624f0ba4228b6a2e0cd8c5c4d518ded4758e43ac21c3" -d "host_auid=92a450d9a3e596d7bef9ed9853b6a454" https://frontend.spiceworks.com/appcenter/api/app_user_authorization
```

##### Example with Ruby

```ruby
JSON.parse Net::HTTP.get(URI.parse('https://frontend.spiceworks.com/appcenter/api/app_user_authorization.json?' + {access_token: '814bd50cb926cfaebea353dd8b5f704def9e04b77372eed01f0d26f1d602e108', app_secret: 'bfda03b8c726a62309fe624f0ba4228b6a2e0cd8c5c4d518ded4758e43ac21c3', host_auid: '92a450d9a3e596d7bef9ed9853b6a454'}.to_query))
```

### Best practices

#### Cookie-based sessions

While it's technically possible to use the Spiceworks SDK on every web page of
your canvas app to request an access token and validate it with Spiceworks,
you probably wouldn't do that if every attempt forced the user to supply his
password, right? No! You'd probably authenticate the user's password once, and
then you'd probably use some sort of browser cookie-based mechanism for
maintaining a "login session" with your web site.

OAUTH2-based login systems should be no different.

Once you have completed steps 1-4 above, you have established authenticity
of the Spiceworks host application and of the current user logged into Spiceworks.
At this point, please establish a trusted cookie with the browser to maintain
the login session, at least for a reasonable period of time.

#### Authorization

Usually when developers talk about authentication, a conversation about
authorization is not too far away. Within Spiceworks host applications,
the options are effectively limited to combinations of the following
two authorization schemes. How you decide to authorize users inside of
your cloud app probably depends on whether you want users sharing
information or not.

##### 1. Per-user

One option is that each user is authorized to create, update, delete, or
otherwise interact with resources specific to him- or herself.

##### 2. Per-Spiceworks host application

Another option is that every user within the same Spiceworks host application
(as identified by the `environment.app_host.host_auid` value) shares access
rights with the other users of the same Spiceworks host application.

### Further reading
