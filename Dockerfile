FROM node:8.12.0-alpine
ADD . /code
WORKDIR /code
RUN npm install -g yarn
RUN yarn install
RUN npx lerna bootstrap
CMD ["npm", "run", "dev"]