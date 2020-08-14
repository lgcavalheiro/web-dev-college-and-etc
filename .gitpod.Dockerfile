FROM gitpod/workspace-full
                    
USER gitpod

RUN sudo apt-get -q update && sudo apt-get install gzip

RUN cd /tmp \ 
    && curl -O https://downloads.apache.org/tomcat/tomcat-9/v9.0.34/bin/apache-tomcat-9.0.34.tar.gz \
    && tar xzvf apache-tomcat-9.0.34.tar.gz