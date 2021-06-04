FROM node:14.8.0-alpine3.11 AS build

# install tools and deps for node-gyp
RUN apk add --no-cache --virtual .gyp \
  python \
  make \
  g++

WORKDIR /build
COPY package.json yarn.lock ./
RUN yarn --prod

FROM node:14-alpine

ENV CHROME_BIN="/usr/bin/chromium-browser"\
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"

RUN set -x \
  && apk update \
  && apk upgrade \
  # replacing default repositories with edge ones
  && echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" > /etc/apk/repositories \
  && echo "http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories \
  && echo "http://dl-cdn.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories \
  \
  # Add the packages
  && apk add --no-cache dumb-init curl make gcc g++ python linux-headers binutils-gold gnupg libstdc++ nss chromium \
  \
  && npm install puppeteer@0.13.0 \
  \
  # Do some cleanup
  && apk del --no-cache make gcc g++ python binutils-gold gnupg libstdc++ \
  && rm -rf /usr/include \
  && rm -rf /var/cache/apk/* /root/.node-gyp /usr/share/man /tmp/* \
  && echo


ENV TZ Asia/Shanghai
ENV DEBUG=off \
  NODE_ENV=production \
  APP_PORT=80

RUN mkdir app
WORKDIR /app
COPY --from=build /build/node_modules node_modules/
COPY ./ ./

ENTRYPOINT ["/usr/bin/dumb-init"]

# Start
CMD ["npm", "run", "server"]
