def nextVersion = ""
def gitOwner = ""
def gitRepo = ""
pipeline {
    agent any

    parameters { choice(name: 'TYPE_CHANGE', choices: ['small', 'feature', 'major'], description: 'Tipo de cambio') }

    stages {
        stage('Prepared') {
            steps {
                script {
                    def d = [version: '0.0.1']
                    def props = readProperties defaults: d, file: 'gradle.properties'
                    echo "Current version ${props.version}"
                    def numVer = props.version.split('\\.')
                    if (params.TYPE_CHANGE.equals('small')) {
                        numVer[2] = numVer[2].toInteger() + 1
                    } else if (params.TYPE_CHANGE.equals('feature')) {
                        numVer[1] = numVer[1].toInteger() + 1
                    } else {
                        numVer[0] = numVer[0].toInteger() + 1
                    }
                    nextVersion = numVer.join('.')
                    echo "Next version ${nextVersion}"
                    gitOwner = GIT_URL.tokenize('/')[2]
                    gitRepo = GIT_URL.tokenize('/').last().split("\\.")[0]
                }
            }
        }
        stage('Build') {
            steps {
                sh "./gradlew clean build -Dorg.gradle.project.version=${nextVersion}"
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Release') {
            steps {
                echo 'Release....'
                script {
                    def response = httpRequest httpMode: 'POST',
                        url: "https://api.bitbucket.org/2.0/repositories/${gitOwner}/${gitRepo}/downloads",
                        authentication: 'Bitbucket',
                        customHeaders: [[name: 'Content-Disposition:', value: "form-data; name='${gitRepo}-boot-${nextVersion}.zip'; filename='${gitRepo}-boot-${nextVersion}.zip'"]]
                        uploadFile: "build/distributions/${gitRepo}-boot-${nextVersion}.zip"
                    echo '${response.status}'
                }
            }
        }
    }
}