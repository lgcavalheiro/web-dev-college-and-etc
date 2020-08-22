build:
	jar -cvf ../tomcat9/webapps/swa.war *

compile:
	javac -cp com:../tomcat9/lib/servlet-api.jar -d WEB-INF/classes com/common/*.java
	#javac -sourcepath com -d WEB-INF/classes com/common/*.java

start:
	../tomcat9/bin/catalina.sh start

stop:
	../tomcat9/bin/catalina.sh stop