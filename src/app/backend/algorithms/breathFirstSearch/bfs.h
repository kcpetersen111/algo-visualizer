#pragma once
#include "../../graph.h"
#include <vector>
#include <queue>
#include <cstddef>

class Bfs: public Graph {
    public:
        Bfs(int size, int start);
        virtual ~Bfs( );
        int NextStep();
    protected:
        std::vector<int> mVisited;
        std::queue<int> mQueue;
};

