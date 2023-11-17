HEADERFILES := graph.h algoriths/depthFirstSearch/dfs.h server.h 

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

dfs.o: algoriths/depthFirstSearch/dfs.cpp $(HEADERFILES)
	g++ -c  algoriths/depthFirstSearch/dfs.cpp 

clean:
	rm main
	rm *.o
