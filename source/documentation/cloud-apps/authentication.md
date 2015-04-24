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
embedded within the Spiceworks application within of an <iframe>.
From within this container, your JavaScript can leverage the Spiceworks SDK
to obtain information from the hosting Spiceworks application.
Because Spiceworks applications can be installed behind firewalls inside
of any corporate domain, you must not set the `X-Frame-Options` HTTP header.

### Step 1: Trust the Spiceworks application

Not setting the `X-Frame-Options` header allows any Spiceworks application
to embed your cloud app in an <iframe>. This also means that any web site
anywhere can also embed your cloud app in an <iframe>. How can you distinguish
between valid Spiceworks applications and evil hacker empires? It starts with
your JavaScript!

The first step to authenticating access to your cloud app is to request
the application environment information using the Spiceworks SDK:

```js
card.services('environment').request('environment').then(
  function(environment){
    /* success! */
  ),
  function(errors){
    /* danger! danger! */
  });
```

The Spiceworks SDK will communicate between the <iframe> containing your
cloud app and the parent window of the Spiceworks application.
Using its own cryptographic verification, the SDK will authenticate
the hosting application. If all goes well, the JavaScript promise is fulfilled
and your first function is called with the `environment` object. If not,
the promise is rejected and your second function is called with error
information.

### Step 2: Obtain an OAUTH2 access token

An OAUTH2 access token is like a temporary password granted to your cloud app
on behalf of the Spiceworks user without the Spiceworks user having to
give you his or her password directly.

Lucky for you, requesting the environment information automatically
grants you an OAUTH2 access token via the `environment` object:

```json
{
  "app_host":
    {
      "auid": "92a450d9a3e596d7bef9ed9853b6a454"
    },
  "user":
    {
      "user_auid": "e34e59c92f43b49f9725a29f86632c12",
      "access_token": "814bd50cb926cfaebea353dd8b5f704def9e04b77372eed01f0d26f1d602e108"
    }
}
```

**_Note:_** *Additional details omitted from the JSON above.*

#### Environment

Using the `environment` object, you can now uniquely identify the hosting
application and Spiceworks user of your cloud app.

Name|Type|Description
----|----|-----------
`environment.app_host.auid`|`string`|Uniquely identifies the Spiceworks app into which your cloud app is installed
`environment.user.user_auid`|`string`|Uniquely identifies the Spiceworks user accessing your cloud app
`environment.user.access_token`|`string`|OAUTH2 access token

Both `auid` and `user_auid` are application-unique identifiers. This means they
are unique to your cloud app alone. If the same real-life user installs your
cloud app into a different installation of Spiceworks, you will see
a different `auid` but the same `user_auid`. Also, if you build more than one
cloud app, the same real-life user from the same install of Spiceworks will be
identified with a different pair of values to each of your two cloud apps.

### Step 3: Use the OAUTH2 token to authenticate the user

At this point, your JavaScript is free to use the Spiceworks SDK to do
cool and amazing things inside the browser. However, at some point you're
going to want the user to access some protected area of your cloud app,
and that means leveraging the `environment` details to complete a login.

#### Step 3a. Submit the login details to your server

A typical form-based login passes a username and password securely
to the server where it is verified. In this case, the "username" is
the combination of `environment.app_host.auid` and
`environment.user.user_auid`, and the "password" is
`environment.user.access_token`.

**Note:** OAUTH2 is 101% predicated on __always using HTTPS/SSL__ when transmitting access tokens. Never transmit an access token "in the clear".

##### Using JavaScript and jQuery

```js
$.post('https://your-server/sign_in', {
    auid: environment.app_host.auid,
    user_auid: environment.user.user_auid,
    access_token: environment.user.access_token
  });
```

##### Using JavaScript and an HTML FORM

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
document.getElementById('login-access_token').value = environment.user.access_token;
document.getElementById('login-form').submit();
```

#### Step 3b. Verify the OAUTH2 token with Spiceworks

Recall that an OAUTH2 access token is like a temporary password granted
to your cloud app. Even if it were the real user's password, you would
need to "ask" Spiceworks whether the password was right before trusting the
user. OAUTH2 is no different; your server needs to verify the authenticity
of the access token with Spiceworks.

Once the credentials have been passed to your server, submit them to
Spiceworks for verification at
https://frontend.spiceworks.com/appcenter/api/app_user_authorization
by passing the following parameters:

Key|Value
---|-----
`access_token`|The access token originally obtained from `environment.user.access_token`
`host_auid`|The host identifier originally obtained from `environment.app_host.auid`
`app_secret`|The OAUTH2 secret key generated for you when you first created your cloud app with Spiceworks

**Note:** You are not sending the `user_auid`.

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

Verify that these 3 values match your expectation.

If the user is not authorized you will receive an `HTTP 403 Forbidden` result with error information:

```json
{
 "errors": ["User is not authorized for your application"]
}
```


##### Testing with cURL

```bash
$ curl -G -X GET -H "Accept: application/json" -d "access_token=814bd50cb926cfaebea353dd8b5f704def9e04b77372eed01f0d26f1d602e108" -d "app_secret=bfda03b8c726a62309fe624f0ba4228b6a2e0cd8c5c4d518ded4758e43ac21c3" -d "host_auid=92a450d9a3e596d7bef9ed9853b6a454" https://frontend.spiceworks.com/appcenter/api/app_user_authorization
```

##### Ruby

```ruby
JSON.parse Net::HTTP.get(URI.parse('https://frontend.spiceworks.com/appcenter/api/app_user_authorization.json?' + {access_token: '814bd50cb926cfaebea353dd8b5f704def9e04b77372eed01f0d26f1d602e108', app_secret: 'bfda03b8c726a62309fe624f0ba4228b6a2e0cd8c5c4d518ded4758e43ac21c3', host_auid: '92a450d9a3e596d7bef9ed9853b6a454'}.to_query))
```

### Best practices

* Creating cookie-based sessions
* Spiceworks app authorization versus user authorizations

### Further reading
