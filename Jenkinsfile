pipeline {
   agent {
      environment {
         PATH='/usr/local/bin:/usr/bin:/bin'
      }
 
   stages {
      
      stage('Install node') {
      steps {
         sh 'npm install'
      }
   }

      stage('rInstall Cordova') {
      steps {
         sh 'npm install -g cordova'
      }
   }

      stage('Install app dependencies') {
      steps {
         sh 'npm install'
      }
   }
   
   
      stage('Add Android platform') {
      steps {
         sh 'ionic cordova platform add android@9'
      }
   }
   

      stage('x') {
      steps {
         sh 'ionic cordova plugin rm cordova-plugin-whitelist'
      }
   }
   
  
      stage('Setup Android SDK') {
      steps {
         sh 'android-actions/setup-android@v2'
      }
   }
   
 
     stage('Android Build') {
     steps {
        sh 'ionic cordova build android'
     }
   }
      
}
}
}
