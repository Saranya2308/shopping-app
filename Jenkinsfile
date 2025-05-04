@Library('jenkins-shared-library') _

pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                script {
                    echo "Checking out application source..."
                    checkout scm  // This checks out your actual app repo
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    echo "Workspace contents:"
                    if (isUnix()) {
                        sh 'ls -alh'
                    } else {
                        bat 'dir'
                    }

                    echo "Checking for build files..."
                    if (isUnix()) {
                        sh 'ls -alh'
                    } else {
                        bat 'dir'
                    }

                    echo "Running the build process..."
                    // Pass the directory to buildApp
                    buildApp('shopping-app')
                }
            }
        }

        stage('Test') {
            steps {
                runTests()
            }
        }

        stage('Dockerize') {
            steps {
                dockerBuildAndPush()
            }
        }

        stage('Deploy to Staging') {
            steps {
                deployToEnv('staging')
            }
        }
    }
}
