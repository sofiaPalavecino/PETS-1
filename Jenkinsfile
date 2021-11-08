pipeline {
   agent any
      environment {
         PATH='/usr/local/bin:/usr/bin:/bin'
      }
   stages {
      stage('rename dx') {
      steps {
         sh 'mv /usr/local/lib/android/sdk/build-tools/31.0.0/d8 /usr/local/lib/android/sdk/build-tools/31.0.0/dx '
      }
   }
   stages {
      stage('rename dxJar') {
      steps {
         sh 'mv /usr/local/lib/android/sdk/build-tools/31.0.0/lib/d8.jar /usr/local/lib/android/sdk/build-tools/31.0.0/lib/dx.jar'
      }
   }
   stages {
      stage('rInstall Cordova') {
      steps {
         sh 'npm install -g cordova'
      }
   }
   stages {
      stage('Install Ionicdx') {
      steps {
         sh 'npm install -g @ionic/cli'
      }
   }
   stages {
      stage('Install app dependencies') {
      steps {
         sh 'npm install'
      }
   }
   stages {
      stage('Add Android platform') {
      steps {
         sh 'ionic cordova platform add android@9'
      }
   }
   stages {
      stage('x') {
      steps {
         sh 'ionic cordova plugin rm cordova-plugin-whitelist'
      }
   }
   stages {
      stage('Setup Android SDK') {
      steps {
         sh 'android-actions/setup-android@v2'
      }
   }
   stages {
     stage('Android Build') {
     steps {
        sh 'ionic cordova build android'
     }
   }
}
