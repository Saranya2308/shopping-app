pipeline {
    agent any

    environment {
        SERVICES = 'cart-service, payment-service, order-service, notification-service, product-service'
    }

    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

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
                        def serviceDir = "${service}/src"
                        if (fileExists("${serviceDir}/package.json")) {
                            dir(serviceDir) {
                                if (isUnix()) {
                                    sh 'npm test'  // Run tests on Unix
                                } else {
                                    bat 'npm test'  // Run tests on Windows
                                }
                            }
                        } else {
                            echo "❌ No tests found for ${service}. Skipping."
                        }
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
                        def serviceDir = "${service}/src"
                        if (fileExists("${serviceDir}/Dockerfile")) {
                            sh "docker build -t your-docker-repo/${service}:${env.BUILD_ID} ${serviceDir}"
                            sh "docker push your-docker-repo/${service}:${env.BUILD_ID}"
                        } else {
                            echo "❌ No Dockerfile found for ${service}. Skipping Docker build."
                        }
                    }
                }
            }
        }

        stage('Deploy to Staging') {
            parallel {
                script {
                    def services = SERVICES.split(', ')
                    services.each { service ->
                        echo "🚀 Deploying ${service} to staging"
                        // Example: Run deployment script for each service
                        if (isUnix()) {
                            sh "./deploy.sh ${service} staging"  // For Unix-based systems
                            sh "cd ${service}/src && npm start"  // Start the service after deployment
                        } else {
                            bat "./deploy.bat ${service} staging"  // For Windows-based systems
                            bat "cd ${service}/src && npm start"  // Start the service after deployment
                        }
                    }
                }
            }
        }
    }
}
