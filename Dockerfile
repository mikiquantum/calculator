FROM nginx:1.12-alpine

COPY ./build_webpack /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]