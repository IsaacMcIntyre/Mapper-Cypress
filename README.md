# Cypress-Dependencies
Dependencies for running Cypress on a container.

```bash
docker build --tag cypress-dependencies .
```

```bash
docker run --name cd cypress-dependencies
```

```bash
export CYPRESS_baseUrl=http://frontend:3000
export FRONTEND_LINK=/
```