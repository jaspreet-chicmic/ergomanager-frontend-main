ARG NODE_BASE_IMAGE_TAG

FROM wodby/node:${NODE_BASE_IMAGE_TAG}
LABEL author="Vasilis Giannoulis" email="vgiannoul@2square.gr" 

USER root

COPY --chown=node:node docroot/ /usr/src/app/

USER node
RUN cd /usr/src/app/ && yarn install  && next build
