#include "server.h"
#include "algorithms/depthFirstSearch/dfs.h"
#include "algorithms/breathFirstSearch/bfs.h"
#include <iostream>
int main() {
    Bfs d = Bfs(5,0);
    d.AddConnection(0,3,1);
    d.AddConnection(0,1,1);
    d.AddConnection(1,2,1);
    d.AddConnection(2,3,1);

    std::cout << d.NextStep() << std::endl;
    std::cout << d.NextStep() << std::endl;
    std::cout << d.NextStep() << std::endl;
    std::cout << d.NextStep() << std::endl;

    // server();
    return 0;
}
