pipeline {
   agent any
      environment {
         PATH='/usr/local/bin:/usr/bin:/bin'
      }
 
   stages {
      
      stage('Install app dependencies') {
      steps {
         sh 'npm install'
      }
   }

     stage('Android Build') {
     steps {
        sh 'ionic cordova build android'
     }
   }
      
     stage('Android Build') {
     steps {
        sh 'ionic cordova platform add android@9 --verbose'
     }
   }
      
     stage('Android Build') {
     steps {
        sh 'ionic cordova plugin rm cordova-plugin-whitelist'
     }
   }
      
      
      
      
      
}
}
