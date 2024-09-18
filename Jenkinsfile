pipeline {
    agent any

    environment {
        // Define global variables here if needed
        GIT_COMMIT_ID = ''
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    deleteDir()
                    checkout scm

                    env.GIT_COMMIT_ID = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()
                    currentBuild.displayName = "#${env.BUILD_NUMBER}:${env.VERSION}"
                }
            }
        }

        stage('Generate and publish OpenAPI specs') {
            when {
                expression { return env.BRANCH_NAME == 'master' }
            }
            options {
                timeout(time: 10, unit: 'MINUTES')
            }
            steps {
                withCredentials([usernamePassword(credentialsId: 'delivery-instana-io-internal-project-artifact-read-writer-creds', 
                                                 usernameVariable: 'DELIVERY_INSTANA_USR', 
                                                 passwordVariable: 'DELIVERY_INSTANA_PWD')]) {
                    sh "./ci/publish.bash ${env.VERSION} ${env.BUILD_URL}"
                }
            }
        }

        stage('Trigger API end-to-end tests') {
            when {
                expression { return env.BRANCH_NAME == 'master' }
            }
            options {
                timeout(time: 30, unit: 'MINUTES')
            }
            steps {
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

    post {
        always {
            // Actions to perform after the pipeline completes, such as cleanup or notifications
        }
    }
}
