pipeline {
    agent any

    parameters {
        string(name: 'IMAGE_TAG', defaultValue: 'latest', description: 'Docker image tag to deploy')
    }

    environment {
        KUBECONFIG = '/var/jenkins_home/.kube/config'
        AWS_ACCOUNT_ID = '673436240700'
        AWS_REGION = 'us-west-1'
        BACKEND_IMAGE = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/backend:${params.IMAGE_TAG}"
        FRONTEND_IMAGE = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/frontend:${params.IMAGE_TAG}"
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

        stage('Debug Tag') {
            steps {
                echo "================================="
                echo "Deploying IMAGE_TAG: ${params.IMAGE_TAG}"
                echo "================================="
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh """
                    kubectl set image deployment/backend backend=${BACKEND_IMAGE}
                    kubectl set image deployment/frontend frontend=${FRONTEND_IMAGE}
                """
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                    kubectl rollout status deployment/backend --timeout=180s
                    kubectl rollout status deployment/frontend --timeout=180s
                    kubectl get pods
                '''
            }
        }
    }

    post {
        failure {
            echo 'Deployment failed! Rolling back...'
            sh 'kubectl rollout undo deployment/backend || true'
            sh 'kubectl rollout undo deployment/frontend || true'
        }
    }
}