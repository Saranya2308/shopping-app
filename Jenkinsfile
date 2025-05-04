@Library('jenkins-shared-library') _  // Import shared library

pipeline {
    agent any

    environment {
        // Define the services list
        services = ['cart-service', 'payment-service', 'order-service', 'notification-service', 'product-service']
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
                    services.each { service ->
                        echo "🔧 Building ${service}"
                        buildApp(service)  // Function from shared library
                    }
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    services.each { service ->
                        echo "🧪 Testing ${service}"
                        testApp(service)  // Function from shared library
                    }
                }
            }
        }

        stage('Dockerize') {
            steps {
                script {
                    services.each { service ->
                        echo "🐳 Dockerizing ${service}"
                        dockerBuildAndPush(service)  // Function from shared library
                    }
                }
            }
        }

        stage('Deploy to Staging') {
            steps {
                script {
                    services.each { service ->
                        echo "🚀 Deploying ${service} to staging"
                        deployToEnv(service, 'staging')  // Function from shared library
                    }
                }
            }
        }
    }
}
