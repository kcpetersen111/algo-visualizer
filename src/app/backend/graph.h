#include <vector>
class Graph {
    public:
        Graph(int size, int startNode, int endNode);
        virtual void NextStep() = 0;
        void AddConnection(int start, int end, int weight);
        void AddNode();
    
    protected:
        int mStart;
        int mEnd;
        std::vector<std::vector<int>> mGraph;

};