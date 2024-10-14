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

        stage('Install Dependencies') {
            steps {
                script {
                    sh '''
                    # Check if NVM is already installed
                    if [ ! -d "$HOME/.nvm" ]; then
                        echo "Installing NVM"
                        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
                        nvm use system
                        npm uninstall -g a_module
                        export NVM_DIR="$HOME/.nvm"
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                        echo "Now using node version: $(node -v)"
                        echo "Now using npm version: $(npm -v)"
                    else
                        echo "NVM version $(node -v) is already installed"
                    fi
                    '''
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
                                                 passwordVariable: 'DELIVERY_INSTANA_PWD'),
                               sshUserPrivateKey(credentialsId: 'id_openapi_public_github', keyFileVariable: 'SSH_KEY')]) {
                    sh '''
                            chmod 600 $SSH_KEY
                       '''
                    sh "GIT_SSH_COMMAND=\"ssh -i ${env.SSH_KEY} -o IdentitiesOnly=yes\" ./ci/publish.bash ${env.VERSION} ${env.BUILD_URL}"
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
}
