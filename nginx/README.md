# Proxy Server

When sending requests from a page accessed via SSL to a VPN-connected host, an error is thrown because it is not HTTPS, so we proxy on the server side via nginx.

# Configuration

```sh
cp default.conf.template.sample default.conf.template
```

Execute the above command to create a template containing environment variables.
You can embed environment variables here. (If you need to handle shell script special characters such as `$`, edit `entrypoint.sh` and replace them with sed.)
