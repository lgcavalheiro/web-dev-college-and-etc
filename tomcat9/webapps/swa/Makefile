build:
	jar -cvf ../tomcat9/webapps/swa.war *

compile:
	javac -sourcepath src -d WEB-INF/classes WEB-INF/java/*.java

start:
	../tomcat9/bin/catalina.sh start

stop:
	../tomcat9/bin/catalina.sh stop