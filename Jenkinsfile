pipeline {
    agent any

    environment {
        // Set any environment variables if required
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    deleteDir()
                    checkout scm

                    gitCommitId = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()
                    currentBuild.displayName = "#${env.BUILD_NUMBER}:${env.VERSION}"
                }
            }
        }

        stage('Generate and publish OpenAPI specs') {
            when {
                expression { env.BRANCH_NAME == 'master' }
            }
            steps {
                timeout(time: 10, unit: 'MINUTES') {
                    script {
                        withCredentials([usernamePassword(
                            credentialsId: 'delivery-instana-io-internal-project-artifact-read-writer-creds',
                            usernameVariable: 'DELIVERY_INSTANA_USR',
                            passwordVariable: 'DELIVERY_INSTANA_PWD'
                        )]) {
                            sh "./ci/publish.bash ${env.VERSION} ${env.BUILD_URL}"
                        }
                    }
                }
            }
        }

        stage('Trigger API end-to-end tests') {
            when {
                expression { env.BRANCH_NAME == 'master' }
            }
            steps {
                timeout(time: 30, unit: 'MINUTES') {
                    script {
                        def versionParts = env.VERSION.tokenize('.')
                        def releaseNumber = versionParts[1]

                        build job: '/tests/rest-api-e2e-tests', parameters: [
                            string(name: 'BRANCH_NAME', value: "release-${releaseNumber}"),
                            string(name: 'ENVIRONMENT', value: 'preview-instana')
                        ]
                    }
                }
            }
        }
    }
}
