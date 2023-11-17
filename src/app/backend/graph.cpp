#include "graph.h"

Graph::Graph(int size, int startNode){
    mStart = startNode;
    for(int i = 0; i<size; i++) {
        std::vector<int*> tempVec(size, 0);
        mGraph.push_back(tempVec);
    }
}

Graph::~Graph( ){ }

void Graph::AddConnection(int start, int end, int weight){
    mGraph[start][end] = &weight;
    return;
}

void Graph::AddNode(){
    std::vector<int*> tempVec(mGraph.size(), 0);
    mGraph.push_back(tempVec);

    for(int i = 0; i< mGraph.size(); i++){
        mGraph[i].push_back(0);
    }
}