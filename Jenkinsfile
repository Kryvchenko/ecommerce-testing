pipeline {
  agent any
  tools {nodejs "18.10.0"}
  stages {
    stage('preflight') {
      steps {
        script {
            if (isUnix()) {
                 sh 'node -v'
            } else {
                bat 'node -v'
            }
        }
      }
    }
    stage('build') {
      steps {
        script {
        if (isUnix()) {
                 sh 'npm install'
            } else {
                bat 'npm install'
            }
        }
      }
    }
     stage('test choice') {
      steps {
        script {
           properties([
                parameters([
                    choice (
                        choices: ['store-test', 'smoke-suite', 'wdio'], 
                        name: 'TEST_SELECTION',
                        description: 'Please select the test to run'
                          )   
                          ]
                        )]
                    )
        }
      }
    }
    stage('test') {
      steps {
        script {
        if (isUnix()) {
                 sh 'npm run ${TEST_SELECTION}'
            } else {
                bat 'npm run %TEST_SELECTION'
            }
       }
      }
    } 
  }
}

