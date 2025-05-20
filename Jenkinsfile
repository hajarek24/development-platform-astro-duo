pipeline {
  agent any

  environment {
    NODE_VERSION = '18'
  }

  stages {
    stage('Build Backend') {
      agent {
        docker {
          image 'maven:3.9.6-eclipse-temurin-17'
          args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
      }
      steps {
        dir('backend') {
          sh 'mvn clean package'
        }
      }
    }

    stage('Build Frontend') {
      agent {
        docker {
          image 'node:18'
        }
      }
      steps {
        dir('frontend') {
          sh '''
            npm install
            npm run build
          '''
        }
      }
    }

    stage('Docker Build & Push') {
      steps {
        sh 'docker build -t yourrepo/backend:latest ./backend'
        sh 'docker build -t yourrepo/frontend:latest ./frontend'
        // sh 'docker push yourrepo/backend:latest'
        // sh 'docker push yourrepo/frontend:latest'
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        sh 'kubectl apply -f k8s/'
      }
    }
  }
}
