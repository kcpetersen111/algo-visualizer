#pragma once
#include "graph.h"
#include <vector>

class Dfs: public Graph {
    public:
        Dfs(int size, int start, int end): 
            Graph(size, start, end);
        int NextStep();
    protected:
        std::vector<int> mVisited;
        std::vector<int> mStack;
};