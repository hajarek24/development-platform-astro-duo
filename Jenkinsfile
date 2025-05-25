pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY = 'hajarek24' // Your Docker Hub username
        BACKEND_IMAGE = "${DOCKER_REGISTRY}/backend:${BUILD_NUMBER}"
        FRONTEND_IMAGE = "${DOCKER_REGISTRY}/frontend:${BUILD_NUMBER}"
        // DOCKER_HUB_CREDS_ID = 'dockerhub-credentials' // ID of your Docker Hub credentials in Jenkins
        // KUBECONFIG_CREDS_ID = 'kubeconfig' // ID of your Kubernetes config secret file credential in Jenkins
    }
    
    stages {
        stage('Verify Tools') {
            steps {
                sh 'docker --version'
                sh 'which docker'
                sh 'mvn --version'
                // Optional: Add node version verification if needed
                // sh 'node -v'
                // sh 'npm -v'
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
        
        stage('Build Frontend') {
            agent {
                docker { image 'node:18-alpine' }
            }
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
            post {
                 always {
                     // Archive frontend artifacts if they exist
                     archiveArtifacts artifacts: 'frontend/dist/**/*', fingerprint: true, allowEmptyArchive: true
                 }
            }
        }
        
        stage('Docker Build & Push') {
            steps {
                script {
                    // Build backend image
                    def backendImage = docker.build("${BACKEND_IMAGE}", "./backend")
                    
                    // Build frontend image (assuming a Dockerfile exists in ./frontend)
                    // def frontendImage = docker.build("${FRONTEND_IMAGE}", "./frontend")

                    // Push images to Docker Hub
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') { // Use your Docker Hub credentials ID
                        backendImage.push()
                        // Optional: push also with 'latest' tag
                        // backendImage.push("${DOCKER_REGISTRY}/backend:latest")

                        // If you have a frontend image:
                        // frontendImage.push()
                        // Optional: push also with 'latest' tag
                        // frontendImage.push("${DOCKER_REGISTRY}/frontend:latest")
                    }
                    
                    echo "Backend image built and pushed: ${BACKEND_IMAGE}"
                    // If frontend image is built:
                    // echo "Frontend image built and pushed: ${FRONTEND_IMAGE}"
                }
            }
        }
        
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) { // Use your Kubernetes config secret file credential ID
                        // Check if kubectl is available
                        sh 'kubectl version --client || echo "kubectl not available, skipping deployment"'
                        
                        // Ensure KUBECONFIG is set for kubectl commands
                        def kubectl_cmd = "KUBECONFIG=${KUBECONFIG} kubectl"

                        // Update image tags in Kubernetes manifests if they exist
                        sh '''
                            if [ -d "k8s" ]; then
                                find k8s/ -name "*.yaml" -o -name "*.yml" | while read file; do
                                    # Update backend image tag
                                    sed -i "s|image: hajarek24/backend:.*|image: ${BACKEND_IMAGE}|g" "$file"
                                    # Update frontend image tag (if frontend deployment manifest exists)
                                    sed -i "s|image: hajarek24/frontend:.*|image: ${FRONTEND_IMAGE}|g" "$file" || true # Use || true to ignore errors if frontend image not found
                                done
                                
                                # Apply Kubernetes manifests
                                ${kubectl_cmd} apply -f k8s/ || echo "Kubernetes deployment failed or not configured"

                                # Apply ServiceMonitor if it exists (part of monitoring config)
                                if [ -f k8s/servicemonitor.yaml ]; then
                                    ${kubectl_cmd} apply -f k8s/servicemonitor.yaml || echo "ServiceMonitor deployment failed or not configured"
                                fi

                            else
                                echo "No k8s directory found, skipping Kubernetes deployment"
                            fi
                        '''
                    }
                }
            }
        }
        
        stage('Cleanup') {
            steps {
                sh '''
                # Clean up Docker images to save space (optional, use with caution)
                # docker image prune -f || true
                # docker builder prune -f || true
                '''
                cleanWs() // Clean the Jenkins workspace
            }
        }
    }
    
    post {
        always {
            echo "Pipeline finished."
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed! Check the logs above for details.'
        }
    }
}