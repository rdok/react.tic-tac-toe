pipeline {
    agent { label "linux" }
    triggers { cron('H H(18-19) * * *') }
    options { buildDiscarder( logRotator( numToKeepStr: '30' ) ) }
    stages {
        stage('Build') { steps { 
            sh '''
            docker run --rm -v $(pwd):/app -w /app node:12-alpine yarn install
            '''
        } }
        stage('Test') { steps { ansiColor('xterm') {
            sh '''
            docker run -e CI=true -it --rm -v $(pwd):/app -w /app \
                node:12-alpine yarn run test  --coverage \
                --coverageDirectory='./report' --ci            
            '''
        } } }
    }
    post {
        failure {
            slackSend color: '#FF0000',
            message: "@here Failed: <${env.BUILD_URL}console | ${env.JOB_BASE_NAME}#${env.BUILD_NUMBER}>"
            emailext attachLog: true,
            body: """<p>View console output at <a href='${env.BUILD_URL}/console'>
                ${env.JOB_BASE_NAME}#${env.BUILD_NUMBER}</a></p>""",
            compressLog: true,
            recipientProviders: [[$class: 'DevelopersRecipientProvider']],
            subject: "Failed: <${env.BUILD_URL}console | ${env.JOB_BASE_NAME}#${env.BUILD_NUMBER}>"
        }
        fixed {
            slackSend color: 'good',
            message: "@here Fixed: <${env.BUILD_URL}console | ${env.JOB_BASE_NAME}#${env.BUILD_NUMBER}>"
        }
        success {
            slackSend message: "Stable: <${env.BUILD_URL}console | ${env.JOB_BASE_NAME}#${env.BUILD_NUMBER}>"
        }
        always {
            publishHTML([
            allowMissing: false,
            alwaysLinkToLastBuild: true,
            keepAll: false,
            reportFiles: 'index.html',
            reportName: 'Coverage Report',
            reportDir: 'report/lcov-report/'
            ])
        }
    }
}
