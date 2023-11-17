#pragma once
#include "../../graph.h"
#include <vector>
#include <cstddef>

class Dfs: public Graph {
    public:
        Dfs(int size, int start, int end);
        virtual ~Dfs( );
        int NextStep();
    protected:
        std::vector<int> mVisited;
        std::vector<int> mStack;
};
