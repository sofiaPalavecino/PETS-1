FROM jenkins/jenkins:lts-jdk11

USER root

RUN apt-get update
RUN apt-get install nodejs -y
RUN apt-get install npm -y
RUN apt-get install unzip
RUN apt-get install zip
RUN apt-get install -y gradle 7.2 
RUN apt install -y android-sdk
RUN npm install -g @ionic/cli
RUN npm install -g cordova
RUN apt install default-jdk -y
RUN apt install android-sdk

ENV ANDROID_SDK_ROOT = "/usr/lib/android-sdk"
ENV ANDROID_HOME = "/usr/lib/android-sdk"
