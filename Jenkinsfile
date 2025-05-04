@Library('jenkins-shared-library') _

pipeline {
    agent any

    environment {
        // Define environment variables if needed here
        // For example:
        // MY_ENV_VAR = 'value'
    }

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
                    // Define services list here outside environment block
                    def services = ['cart-service', 'payment-service', 'order-service', 'notification-service', 'product-service']
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
                    def services = ['cart-service', 'payment-service', 'order-service', 'notification-service', 'product-service']
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
                    def services = ['cart-service', 'payment-service', 'order-service', 'notification-service', 'product-service']
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
                    def services = ['cart-service', 'payment-service', 'order-service', 'notification-service', 'product-service']
                    services.each { service ->
                        echo "🚀 Deploying ${service} to staging"
                        deployToEnv(service, 'staging')
                    }
                }
            }
        }
    }
}
