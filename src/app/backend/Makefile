all: build

build: server.o main.o graph.o dfs.o
	g++ -o main $^

run: build
	./main

server.o:
	g++ -c server.cpp

main.o:
	g++ -c main.cpp

graph.o:
	g++ -c graph.cpp

dsf.o:
	g++ -c algoriths/depthFirstSearch/dfs.h algoriths/depthFirstSearch/dfs.cpp graph.h

clean:
	rm main
	rm *.o
