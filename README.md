# TaskPlus Server

## Description

TaskPlus application's backend server powered by NestJS.

## Todo

- [x] basic folder structure
- [x] basic auth(JWT)
- [x] database setup
- [x] business logic for single user
- [ ] business logic for multiple users
- [ ] fully tested(*black box* and *white box*)
- [ ] determine add ownership/participation process(API design, use id or object)

## Remarkable designs

- `EntityService<TEntity, TUpdateDto>`
- Impliment permission with bit operation

## Installation

```bash
# I prefer yarn
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# incremental rebuild (webpack)
$ yarn run webpack
$ yarn run start:hmr

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - syf
- WeChat - syf_0511

## License

  Nest is [MIT licensed](LICENSE).
