#pragma once
#include <vector>
#include <iostream>
class Graph {
    public:
        Graph(int size, int startNode);
        virtual ~Graph();
        virtual int NextStep() = 0;
        void AddConnection(int start, int end, int weight);
        void AddNode();

    protected:
        int mStart;
        //mGraph[nodeYouAreAt][nodeYouAreGoingTo]
        std::vector< std::vector<int*> > mGraph;
};
