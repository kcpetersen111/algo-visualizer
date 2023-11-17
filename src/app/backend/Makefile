all: build

build: server.o main.o graph.o server.h
	g++ -o main $^

run: build
	./main

server.o:
	g++ -c server.cpp

main.o:
	g++ -c main.cpp

graph.o:
	g++ -c graph.cpp

clean:
	rm main
	rm *.o
