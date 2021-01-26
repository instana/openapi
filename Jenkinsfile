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
      if (env.BRANCH_NAME == 'master') {
        sh "./ci/publish.bash ${env.VERSION} ${env.BUILD_URL}"
      }
    }
  }
}

stage ('Trigger API end-to-end tests') {
  timeout(time: 30, unit: 'MINUTES') {
    if (env.BRANCH_NAME == 'master') {
      def versionParts = env.VERSION.tokenize('.')
      def releaseNumber = versionParts[1]

      build job: '/tests/rest-api-e2e-tests', parameters: [
          string(name: 'BRANCH_NAME', value: "release-${releaseNumber}"),
          string(name: 'ENVIRONMENT', value: 'preview-instana'),
          string(name: 'OPSGENIE_BASE_PATH', value: 'https://api.eu.opsgenie.com')
      ]
    }
  }
}
