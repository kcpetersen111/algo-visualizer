#include "../graph.h"
#include <queue>
#include <iostream>

class BFSGraph : public Graph {
public:
    BFSGraph(int size, int startNode, int endNode) : Graph(size, startNode, endNode) {}
    void NextStep() override;
    void BFS();
};

void BFSGraph::BFS() {
    std::queue<int> q;
    std::vector<bool> visited(mGraph.size(), false);

    q.push(mStart);
    visited[mStart] = true;

    while (!q.empty()) {
        int currentNode = q.front();
        std::cout << "Visiting Node: " << currentNode << std::endl;
        q.pop();

        for (int i = 0; i < mGraph[currentNode].size(); ++i) {
            if (mGraph[currentNode][i] != 0 && !visited[i]) {
                q.push(i);
                visited[i] = true;
            }
        }
    }
}

void BFSGraph::NextStep() {
    BFS();
}

int main() {
    // Example usage
    int size = 5;
    int startNode = 0;
    int endNode = 4;

    BFSGraph bfsGraph(size, startNode, endNode);

    bfsGraph.AddConnection(0, 1, 1);
    bfsGraph.AddConnection(0, 2, 1);
    bfsGraph.AddConnection(1, 3, 1);
    bfsGraph.AddConnection(2, 4, 1);

    std::cout << "BFS traversal:" << std::endl;
    bfsGraph.NextStep();

    return 0;
}
