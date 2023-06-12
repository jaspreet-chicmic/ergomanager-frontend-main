ARG NODE_IMAGE
ARG NGINX_BASE_IMAGE_TAG
ARG WEB_APP_DIR

LABEL author="Vasilis Giannoulis" email="vgiannoul@2square.gr" 

FROM ${NODE_IMAGE} as node

FROM wodby/nginx:${NGINX_BASE_IMAGE_TAG}

COPY --from=node --chown=wodby:wodby /usr/src/app/build /var/www/html/docroot/web
