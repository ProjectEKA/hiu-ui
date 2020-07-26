FROM node:8 as build-deps
WORKDIR /app
COPY . ./
RUN npm install

ARG BACKEND_BASE_URL='http://host.docker.internal:8003'
ARG BASE_NAME='@'
ARG BACKEND_API_PATH='/'
ARG DICOM_SERVER_PATH='/'
ARG VIEWER_PAGE='/viewer/'
ARG TITLE='NCG'

ENV BACKEND_BASE_URL=${BACKEND_BASE_URL}
ENV BASE_NAME ${BASE_NAME}
ENV BACKEND_API_PATH ${BACKEND_API_PATH}
ENV DICOM_SERVER_PATH ${DICOM_SERVER_PATH}
ENV REACT_APP_SITE_TITLE=${TITLE}
ENV DICOM_VIEWER_PAGE=${VIEWER_PAGE}
RUN npm run build

# stage: 2 — the production environment
FROM node:13.12.0-alpine
RUN npm install -g serve
COPY --from=build-deps /app/dist/ dist/
EXPOSE 5000
CMD ["serve", "dist/", "-l",  "5000"]