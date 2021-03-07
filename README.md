# Expose requester's IP address to your Feathers services

With feathers-express-ip you can make your own solution for:
- Rate limiting per IP address
- Tracing the request by IP

## Installation
```
npm install feathers-express-ip --save
```

```
yarn add feathers-express-ip
```

## Example usage
Import package
```typescript
import { feathersIp, feathersIpSocketIO } from 'feathers-express-ip';
```

For working with socket connections:
```typescript
// Replace following line in src/app.ts:
app.configure(socketio());

// With following code:
app.configure(socketio(function (io) {
  feathersIpSocketIO(io, 'ip');
}));
```

For working with standard HTTP requests:
```typescript
// After following line in src/app.ts:
app.configure(express.rest());

// Add following line:
app.use(feathersIp('ip'));
```

Read provided IP address in Feathers hook:
```typescript
(context: HookContext) => {
  console.log(context.params.ip);
}
```

## Using with reverse proxy
Reverse proxies not only hide IP address of your app from the user, they also hide the user's IP address from the app.
If you want to get user's IP address while using reverse proxy such as Nginx, you will need configure your Nginx server accordingly.

[Read explanation on Nginx website](https://www.nginx.com/resources/wiki/start/topics/examples/forwarded/)

In short, you can add following code in your Nginx config to set the headers:
```
proxy_pass_header  Set-Cookie;

proxy_set_header   Host               $host;
proxy_set_header   X-Real-IP          $remote_addr;
proxy_set_header   X-Forwarded-Proto  $scheme;
proxy_set_header   X-Forwarded-For    $proxy_add_x_forwarded_for;
```

_______
_This package is developed by TAPPYSOFT LTD, Cyprus_
