FROM node:8 as build-deps
WORKDIR /app
COPY . ./
RUN npm install
RUN npm run build

# stage: 2 ?~@~T the production environment
FROM node:13.12.0-alpine
RUN npm install -g serve
COPY --from=build-deps /app/dist/ dist/
EXPOSE 5000

COPY entryPoint.sh /
RUN chmod +x entryPoint.sh
ENTRYPOINT ["/entryPoint.sh"]
CMD ["serve", "dist/", "-l",  "5000"]
