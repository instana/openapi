pipeline {
    agent { label 'jenkins-worker0' }

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
                expression { return env.BRANCH_NAME == 'test-jenkins-workers' }
            }
            options {
                timeout(time: 10, unit: 'MINUTES')
            }
            steps {
                withCredentials([usernamePassword(credentialsId: 'delivery-instana-io-internal-project-artifact-read-writer-creds', 
                                                 usernameVariable: 'DELIVERY_INSTANA_USR', 
                                                 passwordVariable: 'DELIVERY_INSTANA_PWD'),
                               sshUserPrivateKey(credentialsId: 'id_openapi_public_github', keyFileVariable: 'SSH_KEY')]) {
                    sh '''
                            chmod 600 $SSH_KEY
                       '''
                    env.GIT_SSH_COMMAND = "ssh -i ${env.SSH_KEY} -o IdentitiesOnly=yes"
                    sh "echo 'Start DEBUG'"
                    sh "git --version"
                    sh "echo ${env.GIT_SSH_COMMAND}"
                    sh "echo 'End DEBUG'"
                    sh "./ci/publish.bash ${env.VERSION} ${env.BUILD_URL}"
                }
            }
        }

        stage('Trigger API end-to-end tests') {
            when {
                expression { return env.BRANCH_NAME == 'test-jenkins-workers' }
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
}
