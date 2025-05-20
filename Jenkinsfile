// filepath: Jenkinsfile
pipeline {
  agent any
  stages {
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
      steps {
        sh 'docker build -t yourrepo/backend:latest ./backend'
        sh 'docker build -t yourrepo/frontend:latest ./frontend'
        // Ajoute ici le push vers ton registre Docker
      }
    }
    stage('Deploy to Kubernetes') {
      steps {
        sh 'kubectl apply -f k8s/'
      }
    }
  }
}