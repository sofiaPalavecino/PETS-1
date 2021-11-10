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
      
     
     stage('remove whitelist') {
     steps {
        sh 'ionic cordova plugin rm cordova-plugin-whitelist'
     }
   }
      
     stage('Android Build') {
     steps {
        sh 'ionic cordova build android --verbose'
     }
   }
      
      
      
}
}

