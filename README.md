# @36node/sniper

[![version][0]][1] [![downloads][2]][3]

## Development

```sh
# prepare service with docker
docker-compose -d

# install dependencies
yarn

# start service
yarn start

# if we want to start service as production
# NODE_ENV=production yarn start

# use postman to check api
yarn test:int
```

### Folder structures

```sh
├── Dockerfile
├── README.md
├── bin
│   ├── build-docker.sh
│   ├── bump.sh
│   ├── server.js
│   └── sync.js
├── docker-compose.yml
├── jest-mongodb-config.js
├── openapi.yml
├── package.json
├── src
│   ├── api
│   ├── app.js
│   ├── config
│   ├── constants.js
│   ├── index.js
│   ├── jobs
│   ├── lib
│   ├── middlewares
│   ├── models
│   └── services
├── ssl
│   ├── rsa_jwt.key
│   └── rsa_jwt.pub
└── test
    ├── env.json
    ├── jest.config.js
    ├── jest.setup.js
    ├── jest.teardown.js
    └── pet-curd
```

- bin: 防止入口文件以及一些编译辅助的脚本。
- src: source 目录只负责输出模块。
- src/api: 自动生成的 api 目录包含 koa 桩代码
- src/config: 配置入口，用 dotenv
- src/lib: 基础库
- src/middleware: koa 中间件
- src/services: api 的实现
- src/jobs: 实现 deamon 等任务逻辑
- src/app.js: 主程序
- src/index.js: 引用目录
- test: 集成测试
- openapi.yml: api 定义文件
- docker-compose.yml: 服务需要依赖的第三方服务

目录引用原则：

- config 被全局引用
- services and jobs 引用 models
- lib 目录可以被任何文件引用

### default token

`eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJ1c2VyIjp7InJvbGVzIjpbIkFETUlOIiwiVVNFUiJdfX0.XA1kE_UdbOsU0rfmG3g1y3SpJ5aFVzPGFBHihVXv58sNatweqLHPEUAwhqobgKgmAbaKa3dlYrXEpHESHZ7AJgQYCfSeVxtsKyoQmcq9OYA0iFcH5oCWQgYqfeWJPOroMlMdNQax5kG-GkuaFbIiwiw-9j_ACS8CSPO9Oq2dQCA`

visit [jwt.io](jwt.io) for more.

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022,
  "user": {
    "roles": ["ADMIN", "USER"]
  }
}
```

### postman

```sh
# 安装 fastman
yarn global add @36node/fastman

# You can get your key from the [integrations dashboard](https://go.postman.co/integrations/services/pm_pro_api)
fastman config -a <your-postman-api-key>

# list all your collections in your postman
fastman ls

# import file into postman, import data.json env.json by your self
fastman import ./test/xxxx/collection.json

# export file from postman
fastman export "Petstore Service" ./test/xxxx/collection.json
```

## Url Pattern

Find more in [@36node/sketch/docs/url.md](https://github.com/36node/sketch/blob/master/docs/url.md)

# 生成截图的 html 模板

这个目录防止生成截图的 html 模板，模板将会根据名字匹配，扩展名 html 省略。

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b feature/something`
3. Commit your changes: `git commit -am 'feat: something'`
4. Push to the branch: `git push -u origin feature/something`
5. Submit a pull request :D

## Reference

[0]: https://img.shields.io/npm/v/@36node/sniper.svg?style=flat
[1]: https://npmjs.com/package/@36node/sniper
[2]: https://img.shields.io/npm/dm/@36node/sniper.svg?style=flat
[3]: https://npmjs.com/package/@36node/sniper
