FROM node:alpine
WORKDIR "/app"
COPY "./package.json" "./"
RUN npm install
COPY "./src" "./src"
COPY "./test" "./test"
COPY "./.babelrc" "./"
COPY "./tsconfig.json" "./"
CMD ["npm", "run", "start"]
