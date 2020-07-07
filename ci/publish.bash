#!/usr/bin/env bash

set -e
set -Euo pipefail

if [ "$#" -ne 2 ]; then
  echo "Usage: ${0} <VERSION> <BUILD_URL>"
  echo "Please specify a VERSION of the Instana backend and the corresponding openapi-deploy BUILD_URL"
  echo "Example: ${0} \"1.181.548\" \"https://dev-jenkins.instana.io/job/openapi-deploy/77/\""
  exit 1
fi

if ! command -v mvn >/dev/null ; then
  echo "Required command not found: mvn"
  exit 1
fi

if ! command -v git >/dev/null ; then
  echo "Required command not found: git"
  exit 1
fi

VERSION="${1}"
BUILD_URL="${2}"
SCRIPT_ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )/.."

echo "Downloading new OpenAPI spec..."
mvn org.apache.maven.plugins:maven-dependency-plugin:2.8:get \
    -Dartifact=com.instana:openapi:${VERSION}:yaml \
    -Ddest=${SCRIPT_ROOT_DIR}/spec/openapi.yaml

# Replace version placeholder
sed -i -e "s/INSTANA_BACKEND_BUILD_VERSION/${VERSION}/g" ${SCRIPT_ROOT_DIR}/spec/openapi.yaml

echo "Installing dependencies..."
source $HOME/.nvm/nvm.sh
nvm use
npm install

if [ -z "$(which yarn)" ]; then
  npm install -g yarn@1.9.4
fi

echo "Generating spec descriptions..."
yarn build

echo "Commit and push changes"
git checkout master
git add .
git commit -q -a -m "Added generated spec files, see ${BUILD_URL}"
git push -q origin master

echo "Publish changes to gh-pages"
yarn gh-pages
