pipeline {
  agent {
    docker {
      image 'maven:3.9.6-eclipse-temurin-17'
      args '-v /var/run/docker.sock:/var/run/docker.sock'
    }
  }
  environment {
    NODE_VERSION = '18'
  }
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
          // Installe Node.js 18 si besoin
          sh '''
            if ! command -v node || [ "$(node -v | cut -d. -f1 | tr -d v)" -lt "$NODE_VERSION" ]; then
              curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
              apt-get install -y nodejs
            fi
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