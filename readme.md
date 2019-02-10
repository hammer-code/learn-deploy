# learn-deploy

Learn deploy with Circle CI and now.sh

[![CircleCI](https://circleci.com/gh/hammer-code/learn-deploy.svg?style=svg)](https://circleci.com/gh/hammer-code/learn-deploy)

## Requirements
- Docker
- Node >=8.11
- Mongodb >=3.4.0

## Running Local
- create `.env` file based on `.env.example`. 
  ```sh
  cp ./apps/api/.env.example ./apps/api/.env
  ```
- `docker-compose up`

to halt the app
- `docker-compose down`
