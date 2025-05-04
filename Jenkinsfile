@Library('jenkins-shared-library') _

def services = ['cart-service', 'product-service', 'notification-service', 'payment-service', 'order-service']

pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out application source...'
                checkout scm
            }
        }

        stage('Build') {
            steps {
                script {
                    services.each { service ->
                        echo "🔧 Building ${service}"
                        buildApp(service)
                    }
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    services.each { service ->
                        echo "🧪 Testing ${service}"
                        testApp(service)
                    }
                }
            }
        }

        stage('Dockerize') {
            steps {
                script {
                    services.each { service ->
                        echo "🐳 Dockerizing ${service}"
                        dockerBuildAndPush(service)
                    }
                }
            }
        }

        stage('Deploy to Staging') {
            steps {
                script {
                    services.each { service ->
                        echo "🚀 Deploying ${service} to staging"
                        deployToEnv(service, 'staging')
                    }
                }
            }
        }
    }
}
