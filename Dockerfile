FROM node:16.13.0-alpine

RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

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