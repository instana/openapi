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
