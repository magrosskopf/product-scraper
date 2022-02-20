FROM node:16.13.0-alpine

USER node

WORKDIR /home/node
COPY --chown=node:node ./package.json ./package.json
COPY --chown=node:node ./package-lock.json ./package-lock.json
RUN npm install --production
COPY --chown=node:node . .
EXPOSE 3000
CMD ["node", "bin/www"]

#FROM base as production
#ENV NODE_ENV=production
#RUN npm install docker-ci
#RUN npm install --production
#COPY --chown=node:node . .
#CMD ["node", "bin/www"]
#
#FROM base as dev
#ENV NODE_ENV=development
#RUN npm install -g nodemon && npm install
#COPY --chown=node:node . .
#CMD ["nodemon", "bin/www"]