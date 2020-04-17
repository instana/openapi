#!/usr/bin/env bash
set -e
set -Euo pipefail

if [ "$#" -ne 2 ]; then
  echo "Usage: ${0} <VERSION> <BUILD_URL>"
  echo ""
  echo "Example: ${0} \"1.175.567\" \"https://dev-jenkins.instana.io/job/openapi-deploy/77/\""
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

SPEC_OLD="spec/openapi.yaml"
SPEC_NEW="spec/openapi-${VERSION}.yaml"

echo "Downloading new OpenAPI spec"
mvn -q org.apache.maven.plugins:maven-dependency-plugin:2.8:get -Dartifact="com.instana:openapi:${VERSION}:yaml" -Ddest="${SPEC_NEW}"

# Replace version placeholder if necessary
if grep -q 'INSTANA_BACKEND_BUILD_VERSION' "${SPEC_NEW}" ; then
  sed -i '' -e "s/INSTANA_BACKEND_BUILD_VERSION/${VERSION}/g" "${SPEC_NEW}"
fi

# Run openapi-diff if Docker is available
if command -v docker >/dev/null ; then
  echo "Finding differences between old and new OpenAPI spec"
  docker pull -q joschi/openapi-diff:latest
  if [ ! -d './spec/changelog' ]; then
    mkdir -p './spec/changelog'
  fi
  docker run -v "$(pwd)":/workspace:ro -v "$(pwd)/spec/changelog":/out:rw joschi/openapi-diff:latest --markdown "/out/changelog-${VERSION}.md" "/workspace/${SPEC_OLD}" "/workspace/${SPEC_NEW}"
fi

mv -f "${SPEC_NEW}" "${SPEC_OLD}"

# Load nvm if necessary
if ! command -v nvm >/dev/null ; then
  if command -v brew > /dev/null && brew --prefix nvm > /dev/null ; then
    NVM_DIR=${NVM_DIR:-"$HOME/.nvm"}
    export NVM_DIR
    # shellcheck disable=SC1090
    . "$(brew --prefix nvm)/nvm.sh"
  else
    # shellcheck disable=SC1090
    . "${NVM_DIR:-"$HOME/.nvm"}/nvm.sh"
  fi
fi

nvm install
nvm use

if ! command -v yarn >/dev/null ; then
  npm install -g yarn@1.9.4
fi

# TODO: Why not `yarn install`?
npm install

yarn build

git checkout master
git commit -q -a -m "Added generated spec files, see ${BUILD_URL}"
git push -q origin master

yarn gh-pages
