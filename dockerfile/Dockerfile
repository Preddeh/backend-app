FROM node:alpine
WORKDIR /backend
COPY package.json package-lock.json ./
RUN npm install
RUN npm ci
COPY . /backend
CMD ["npm","start"]