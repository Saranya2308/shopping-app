@Library('jenkins-shared-library') _

pipeline {
    agent any

    environment {
        SERVICES = 'cart-service, payment-service, order-service, notification-service, product-service'
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
                    def services = SERVICES.split(', ')
                    services.each { service ->
                        echo "🔧 Building ${service}"
                        def serviceDir = "${service}/src"
                        if (fileExists("${serviceDir}/package.json")) {
                            echo "📦 Found package.json for ${service}. Installing dependencies..."
                            dir(serviceDir) {
                                if (isUnix()) {
                                    sh 'npm install'  // Install dependencies for Node.js on Unix
                                } else {
                                    bat 'npm install'  // Install dependencies for Node.js on Windows
                                }
                            }
                        } else {
                            echo "❌ No package.json found in ${serviceDir}. Skipping build."
                        }
                    }
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    def services = SERVICES.split(', ')
                    services.each { service ->
                        echo "🧪 Testing ${service}"
                        testApp(service)  // Assuming testApp is defined in the shared library
                    }
                }
            }
        }

        stage('Dockerize') {
            steps {
                script {
                    def services = SERVICES.split(', ')
                    services.each { service ->
                        echo "🐳 Dockerizing ${service}"
                        dockerBuildAndPush(service)  // Assuming dockerBuildAndPush is defined in the shared library
                    }
                }
            }
        }

        stage('Deploy to Staging') {
            steps {
                script {
                    def services = SERVICES.split(', ')
                    services.each { service ->
                        echo "🚀 Deploying ${service} to staging"
                        deployToEnv(service, 'staging')  // Assuming deployToEnv is defined in the shared library
                    }
                }
            }
        }
    }
}
