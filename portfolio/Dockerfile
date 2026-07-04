FROM node:22-alpine AS build

ARG VITE_API_URL
ARG VITE_CLIENT_ID
ARG VITE_TENANT_ID
ARG VITE_REDIRECT_URI

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_CLIENT_ID=$VITE_CLIENT_ID
ENV VITE_TENANT_ID=$VITE_TENANT_ID
ENV VITE_REDIRECT_URI=$VITE_REDIRECT_URI

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]