FROM node:latest-alpine as base
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      yarn
USER node

WORKDIR /home/node
COPY --chown=node:node ./package.json ./package.json
COPY --chown=node:node ./package-lock.json ./package-lock.json
COPY --chown=node:node . .
ENV NODE_ENV=development
RUN npm cache verify
RUN npm install -g nodemon && npm install
CMD ["node", "www"]

EXPOSE 3000

#FROM base as production
#ENV NODE_ENV=production
#RUN npm install docker-ci
#RUN npm install
#COPY --chown=node:node . .
#CMD ["node", "www"]

#FROM base as dev
#USER root

