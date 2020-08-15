build:
	javac -sourcepath src -d classes src/*/*

clean:
	rm -r classes/*

run:
	java -cp classes main.Main

jar:
	jar cfvm Main.jar manifest.mf classes/main/*.class