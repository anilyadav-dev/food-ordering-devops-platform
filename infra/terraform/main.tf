provider "aws" {
  region = "us-west-1"
}

resource "aws_ecr_repository" "backend" {
  name = "backend"
}

resource "aws_ecr_repository" "frontend" {
  name = "frontend"
}

resource "aws_iam_user" "devops_user" {
  name = "devops-user"
}