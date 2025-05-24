pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY = 'yourrepo' // Replace with your actual Docker registry
        BACKEND_IMAGE = "${DOCKER_REGISTRY}/backend:${BUILD_NUMBER}"
    }
    
    stages {
        stage('Verify Tools') {
            steps {
                sh 'docker --version'
                sh 'which docker'
                sh 'docker info'
                sh 'mvn --version'
            }
        }
        
        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'mvn clean package -DskipTests'
                }
            }
            post {
                always {
                    // Archive backend artifacts if they exist
                    archiveArtifacts artifacts: 'backend/target/*.jar', fingerprint: true, allowEmptyArchive: true
                }
            }
        }
        
        stage('Test Backend') {
            steps {
                dir('backend') {
                    sh 'mvn test'
                }
            }
            post {
                always {
                    // Publish test results using junit step
                    junit 'backend/target/surefire-reports/*.xml'
                }
            }
        }
        
        stage('Docker Build & Push') {
            steps {
                script {
                    // Build backend image
                    def backendImage = docker.build("${BACKEND_IMAGE}", "./backend")
                    
                    // Push images (uncomment when ready to push)
                    /*
                    docker.withRegistry('https://your-registry-url', 'docker-registry-credentials') {
                        backendImage.push()
                        backendImage.push('latest')
                    }
                    */
                    
                    echo "Backend image built: ${BACKEND_IMAGE}"
                }
            }
        }
        
        stage('Deploy to Kubernetes') {
            when {
                // Only deploy if k8s directory exists
                expression {
                    return fileExists('k8s/')
                }
            }
            steps {
                script {
                    // Check if kubectl is available
                    sh 'kubectl version --client || echo "kubectl not available, skipping deployment"'
                    
                    // Update image tags in Kubernetes manifests if they exist
                    sh '''
                        if [ -d "k8s" ]; then
                            find k8s/ -name "*.yaml" -o -name "*.yml" | while read file; do
                                sed -i "s|image: .*backend.*|image: ${BACKEND_IMAGE}|g" "$file"
                            done
                            
                            kubectl apply -f k8s/ || echo "Kubernetes deployment failed or not configured"
                        else
                            echo "No k8s directory found, skipping Kubernetes deployment"
                        fi
                    '''
                }
            }
        }
    }
    
    post {
        always {
            // Clean up Docker images to save space
            sh '''
                docker image prune -f || true
                docker builder prune -f || true
            '''
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed! Check the logs above for details.'
        }
    }
}