FROM node:18-alpine3.15 as base
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
COPY  ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY --chown=node:noe ./ ./
RUN npm cache verify
RUN  npm install


EXPOSE 3000
CMD ["node", "www"]
