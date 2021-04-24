
### STAGE 1: Build ###
# We label our stage as 'builder'
FROM node:10-alpine as builder
WORKDIR /app
COPY package*.json /app/
RUN yarn install
COPY ./ /app/
ARG configuration=production
RUN yarn run build --prod

### STAGE 2: Setup ###
FROM nginx:1.13.3-alpine

# Set timezone to Asia/Manila
RUN apk add --no-cache tzdata
ENV TZ=Asia/Manila

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
