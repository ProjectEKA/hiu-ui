#!/bin/sh

file="/dist/bundle.js"
set -xe
: "${BACKEND_BASE_URL?BACKEND_BASE_URL is not defined}"
: "${BASE_NAME?BASE_NAME is not defined}"

sed -i 's|TITLE:[^,]*|TITLE: '\"$TITLE\"'|g' $file
sed -i 's|BACKEND_BASE_URL:[^,]*|BACKEND_BASE_URL: '\"$BACKEND_BASE_URL\"'|g' $file
sed -i 's|BACKEND_API_PATH:[^,]*|BACKEND_API_PATH: '\"$BACKEND_API_PATH\"'|g' $file
sed -i 's|BASE_NAME:[^,]*|BASE_NAME: '\"$BASE_NAME\"'|g' $file
sed -i 's|DICOM_VIEWER_PAGE:[^,]*|DICOM_VIEWER_PAGE: '\"$DICOM_VIEWER_PAGE\"'|g' $file
sed -i 's|DICOM_SERVER_PATH:[^,]*|DICOM_SERVER_PATH: '\"$DICOM_SERVER_PATH\"'|g' $file
sed -i 's|TIMEZONE_OFFSET:[^,]*|TIMEZONE_OFFSET: '\"$TIMEZONE_OFFSET\"'|g' $file


exec "$@"