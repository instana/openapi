#!groovy

// define global vars for use in later stages
def gitCommitId = null

stage('Checkout') {
  node {
    deleteDir()

    checkout scm

    gitCommitId = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()

    currentBuild.displayName = "#${env.BUILD_NUMBER}:${env.VERSION}"
  }
}

stage ('Generate and publish OpenAPI specs') {
  node {
    timeout(time: 10, unit: 'MINUTES') {
      sh "./ci/publish.bash ${env.VERSION} ${env.BUILD_URL}"
    }
  }
}

stage ('Trigger API end-to-end tests') {
  timeout(time: 30, unit: 'MINUTES') {
    if (env.BRANCH_NAME == 'master') {
      withCredentials([string(credentialsId: 'internal-instanaops-instana-api-token', variable: 'INSTANA_API_TOKEN')]) {
        build job: '/tests/rest-api-e2e-tests', parameters: [
            string(name: 'BRANCH_NAME', value: 'develop'),
            string(name: 'OPENAPI_URL', value: 'https://instana.github.io/openapi/openapi.yaml'),
            string(name: 'INSTANA_API_URL', value: 'https://internal-instanaops.instana.io/'),
            string(name: 'INSTANA_API_TOKEN', value: "${INSTANA_API_TOKEN}"),
            string(name: 'OPSGENIE_BASE_PATH', value: 'https://api.eu.opsgenie.com')
        ]
      }
    }
  }
}
