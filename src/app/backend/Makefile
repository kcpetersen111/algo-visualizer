HEADERFILES := graph.h algorithms/depthFirstSearch/dfs.h server.h algorithms/breathFirstSearch/bfs.h

all: build

build: server.o main.o graph.o dfs.o bfs.o
	g++ -o algoVis $^

run: build
	./algoVis

server.o:
	g++ -c server.cpp

main.o:
	g++ -c main.cpp

graph.o:
	g++ -c graph.cpp

dfs.o: algorithms/depthFirstSearch/dfs.cpp $(HEADERFILES)
	g++ -c algorithms/depthFirstSearch/dfs.cpp

bfs.o: algorithms/breathFirstSearch/bfs.cpp $(HEADERFILES)
	g++ -c algorithms/breathFirstSearch/bfs.cpp

clean:
	rm -f *.o
	rm -f *.*.gch
	rm -f server
	rm -f main
