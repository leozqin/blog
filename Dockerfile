#####################################################################

#                            Build Stage                            #

#####################################################################

FROM node:22-alpine as build
COPY . /app
WORKDIR /app
RUN npm ci && npm run build

#####################################################################

#                            Final Stage                            #

#####################################################################

FROM nginx:stable-alpine

# Copy the generated files to keep the image as small as possible.

COPY --from=build /app/dist /usr/share/nginx/html
