FROM node:20.16.0-alpine3.20 AS sk-build
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN npm install
RUN npm run build

FROM node:20.16.0-alpine3.20
WORKDIR /usr/src/app

COPY --from=sk-build /usr/src/app/package.json /usr/src/app/package.json
COPY --from=sk-build /usr/src/app/package-lock.json /usr/src/app/package-lock.json
RUN npm i --only=production

COPY --from=sk-build /usr/src/app/build /usr/src/app/build

# ENV HOST_HEADER=x-forwarded-host
# ENV PROTOCOL_HEADER=x-forwarded-proto
ENV ORIGIN=https://felixtjernberg.se
# ENV ADDRESS_HEADER=True-Client-IP
# ENV XFF_DEPTH=2

EXPOSE 3000
CMD ["node", "build/index.js"]