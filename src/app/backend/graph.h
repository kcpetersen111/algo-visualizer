#pragma once
#include <vector>
class Graph {
    public:
        Graph(int size, int startNode, int endNode);
        virtual int NextStep() = 0;
        void AddConnection(int start, int end, int weight);
        void AddNode();
        ~Graph();

    protected:
        int mStart;
        int mEnd;
        //mGraph[nodeYouAreAt][nodeYouAreGoingTo]
        std::vector< std::vector<*int> > mGraph;

};