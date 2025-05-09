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
            parallel (
                'cart-service': {
                    echo "🚀 Deploying cart-service to staging"
                    if (isUnix()) {
                        sh "./deploy.sh cart-service staging"
                        sh "cd cart-service/src && npm start"
                    } else {
                        bat "./deploy.bat cart-service staging"
                        bat "cd cart-service/src && npm start"
                    }
                },
                'payment-service': {
                    echo "🚀 Deploying payment-service to staging"
                    if (isUnix()) {
                        sh "./deploy.sh payment-service staging"
                        sh "cd payment-service/src && npm start"
                    } else {
                        bat "./deploy.bat payment-service staging"
                        bat "cd payment-service/src && npm start"
                    }
                },
                'order-service': {
                    echo "🚀 Deploying order-service to staging"
                    if (isUnix()) {
                        sh "./deploy.sh order-service staging"
                        sh "cd order-service/src && npm start"
                    } else {
                        bat "./deploy.bat order-service staging"
                        bat "cd order-service/src && npm start"
                    }
                },
                'notification-service': {
                    echo "🚀 Deploying notification-service to staging"
                    if (isUnix()) {
                        sh "./deploy.sh notification-service staging"
                        sh "cd notification-service/src && npm start"
                    } else {
                        bat "./deploy.bat notification-service staging"
                        bat "cd notification-service/src && npm start"
                    }
                },
                'product-service': {
                    echo "🚀 Deploying product-service to staging"
                    if (isUnix()) {
                        sh "./deploy.sh product-service staging"
                        sh "cd product-service/src && npm start"
                    } else {
                        bat "./deploy.bat product-service staging"
                        bat "cd product-service/src && npm start"
                    }
                }
            )
        }
    }
}
