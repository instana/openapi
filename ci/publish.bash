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
BRANCH_NAME=${BRANCH_NAME:='master'}
SCRIPT_ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )/.."

echo "Downloading new OpenAPI spec..."
curl -u "${DELIVERY_INSTANA_USR}:${DELIVERY_INSTANA_PWD}" \
    -o ${SCRIPT_ROOT_DIR}/spec/openapi.yaml \
    https://delivery.instana.io/artifactory/int-maven-backend-local/com/instana/openapi/${VERSION}/openapi-${VERSION}.yaml

echo "Installing dependencies..."
source $HOME/.nvm/nvm.sh
nvm install
nvm use
npm install

if [ -z "$(which yarn)" ]; then
  npm install -g yarn@1.22.22
fi

echo "Generating spec descriptions..."
yarn build

echo "Commit and push changes to ${BRANCH_NAME}"
git checkout $BRANCH_NAME
git add -A
git diff-index --quiet HEAD || git commit -q -a -m "Added generated spec files, see ${BUILD_URL}"
git push -q origin $BRANCH_NAME

echo "Publish changes to gh-pages"
yarn gh-pages
