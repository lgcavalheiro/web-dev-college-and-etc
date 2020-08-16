build:
	javac -sourcepath ../src -d . ../src/*/*

run-class:
	java -cp . main.Main

jar:
	jar -cvfm Main.jar manifest.txt main/*.class

run-jar:
	java -jar Main.jar

clean-jar:
	rm *.jar