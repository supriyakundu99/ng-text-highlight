pipeline {
    agent {
        docker {
            image 'node:lts-bullseye-slim'
            args '-p 3000:3000'
        }
    }
    stages {
        stage('Initialize') {
            steps {
                echo 'Node & NPM'
                sh 'node -v'
                sh 'npm -v'
            }
        }
        // stage('Checkout code from Github') {
        //     steps {
        //         git url: 'https://github.com/supriyakundu99/main-app.git',
        //             branch: 'master'
        //     }
        // }
        stage('Install Node-modules') {
            steps{
                sh 'npm install'
            }
        }
        stage('Build Angular App') {
            steps{
                sh 'npm run build'
            }
        }
        stage('Finish') {
            steps{
                sh 'pwd'
                sh 'ls'
                echo 'Build Finish'
            }
        }
    }
}