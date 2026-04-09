pipeline {
    agent any

    environment {
        KUBECONFIG = '/var/jenkins_home/.kube/config'
    }

    stages {
        stage('Pull Code') {
            steps {
                checkout scm
            }
        }

        stage('Verify Cluster') {
            steps {
                sh 'kubectl get nodes'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f infra/k8s/'
            }
        }

        stage('Restart Deployments') {
            steps {
                sh 'kubectl rollout restart deployment backend'
                sh 'kubectl rollout restart deployment frontend'
            }
        }

        stage('Verify Deployment') {
            steps {
                sh 'kubectl get pods'
            }
        }
    }

    post {
        failure {
            echo 'Deployment failed! Rolling back...'
            sh 'kubectl rollout undo deployment backend || true'
            sh 'kubectl rollout undo deployment frontend || true'
        }
    }
}