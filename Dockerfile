FROM node:14.8.0-alpine3.11 AS build

# install tools and deps for node-gyp
RUN apk add --no-cache --virtual .gyp \
  python \
  make \
  g++

WORKDIR /build
COPY package.json yarn.lock ./
RUN yarn --prod

FROM buildkite/puppeteer:9.1.1

RUN sed -i 's/deb.debian.org/mirrors.163.com/g' /etc/apt/sources.list && \
    apt update && \
    apt-get install -y dpkg wget unzip
    #fonts-droid fonts-arphic-ukai fonts-arphic-uming
RUN cd /tmp && wget http://ftp.cn.debian.org/debian/pool/main/f/fonts-noto-cjk/fonts-noto-cjk_20170601+repack1-3_all.deb && \
    dpkg -i fonts-noto-cjk_20170601+repack1-3_all.deb    && \
    wget https://github.com/adobe-fonts/source-sans-pro/releases/download/2.040R-ro%2F1.090R-it/source-sans-pro-2.040R-ro-1.090R-it.zip && \
    unzip source-sans-pro-2.040R-ro-1.090R-it.zip && cd source-sans-pro-2.040R-ro-1.090R-it  && mv ./OTF /usr/share/fonts/  && \
    fc-cache -f -v

ENV TZ Asia/Shanghai
ENV DEBUG=off \
  NODE_ENV=production \
  APP_PORT=80

RUN mkdir app
WORKDIR /app
COPY --from=build /build/node_modules node_modules/
COPY ./ ./

# Start
CMD ["npm", "run", "server"]
