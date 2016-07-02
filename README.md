# nginxconf

Utility for create nginx configuration file (.conf) on ubuntu easily.

Nginxconf create and enable nginx .conf files based on models.

## How to install

```bash
sudo npm install -g nginxconf
```

## How to use

```bash
sudo nginxconf
```

Nginxconf create and enable nginx .conf files based on templated models in models folder (ex : /usr/lib/node_modules/nginxconf/lib/models).

### Exemple model file for reverse-proxy :

(in ex : /usr/lib/node_modules/nginxconf/lib/models/reverse.conf)

reverse.conf
```
server {
    listen *:<%= listen %>;

    server_name www.<%= server_name %> <%= server_name %>;

    location / {
        proxy_pass <%= proxy_pass %>;
	proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Connection 'upgrade';
        proxy_set_header X-Forwarded-For $remote_addr;
    }
}
```

nginxconf has 3 preset models : angular.conf, http-static.conf and reverse.conf in models folder, you can make your model and put it in models folder, mark your variables in your model for use in nginxconf ```<%= YOUR_VAR %>```
