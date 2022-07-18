FROM node:16-alpine3.15 as base
RUN apk add \
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
COPY --chown=node:node . .
RUN npm install


EXPOSE 3000
CMD ["node", "www"]
