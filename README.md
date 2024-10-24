# Xenoblade Chronicles Unique Monster Name Generator API
# 🚧 Under Construction 🚧
## Deployment: [https://xc-unique-name-api.habmin.workers.dev/](https://xc-unique-name-api.habmin.workers.dev/)
## Endpoints
### GET /
Returns a random epiteth and random name, with a `full_name` fields concatinating the strings.
### GET /:custom_name
Returns a random epiteth and concats with the `custom_name` parameter into `full_name`.
## Parameters
### ?pretty
Formats response JSON