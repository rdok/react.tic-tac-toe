pipeline {
    agent { label "linux" }
    triggers { cron('H H(18-19) * * *') }
    options { buildDiscarder( logRotator( numToKeepStr: '30' ) ) }
    environment {
        VIRTUAL_HOST = credentials('virtual-host-tic-tac-toe-react')
        VIRTUAL_PORT = credentials('virtual-port-tic-tac-toe-react')
        LETSENCRYPT_HOST = credentials('letsencrypt-host-tic-tac-toe-react')
        LETSENCRYPT_EMAIL = credentials('rdok-email')
        DEFAULT_EMAIL = credentials('rdok-email')
    }
    stages {
        stage('Test') { steps { 
            sh '''
            docker run -e CI=true --rm -v $(pwd):/app -w /app node:12-alpine \
                sh -c \
            "yarn install; yarn run test  --coverage --coverageDirectory='./report' --ci"
            '''
        } }
        stage('Deploy') {
            agent { label "rdok.dev" }
            steps { sh '''
            docker run --rm -v $(pwd):/app -w /app node:12-alpine sh -c \
                "yarn install; yarn run build"
            docker-compose build --pull 
            docker-compose down
            docker-compose up -d
            ''' }
        }
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
