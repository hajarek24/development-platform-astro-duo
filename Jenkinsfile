pipeline {
  agent any

  environment {
    DOCKER_IMAGE_BACKEND = "hajarek24/development-platform-backend:${BUILD_NUMBER}"
    DOCKER_IMAGE_FRONTEND = "hajarek24/development-platform-frontend:${BUILD_NUMBER}"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Backend') {
      steps {
        dir('backend') {
          sh 'mvn clean package'
        }
      }
    }

    stage('Build Frontend') {
      steps {
        dir('frontend') {
          sh 'npm install'
          sh 'npm run build'
        }
      }
    }

    stage('Docker Build & Push') {
      environment {
        DOCKER_CREDENTIALS = credentials('dockerhub-credentials')
      }
      steps {
        script {
          // Build and push backend
          sh "docker build -t ${DOCKER_IMAGE_BACKEND} ./backend"
          docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {
            sh "docker push ${DOCKER_IMAGE_BACKEND}"
          }

          // Build and push frontend
          sh "docker build -t ${DOCKER_IMAGE_FRONTEND} ./frontend"
          docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {
            sh "docker push ${DOCKER_IMAGE_FRONTEND}"
          }
        }
      }
    }

    stage('Deploy to Kubernetes') {
      when { expression { return fileExists('k8s/deployment.yaml') } }
      steps {
        withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
          sh '''
            sed -i "s|image:.*backend.*|image: ${DOCKER_IMAGE_BACKEND}|" k8s/deployment.yaml
            sed -i "s|image:.*frontend.*|image: ${DOCKER_IMAGE_FRONTEND}|" k8s/deployment.yaml
            kubectl --kubeconfig=$KUBECONFIG apply -f k8s/deployment.yaml
          '''
        }
      }
    }
  }

  post {
    always {
      cleanWs()
    }
    success {
      echo 'Pipeline completed successfully!'
    }
    failure {
      echo 'Pipeline failed!'
    }
  }
}
