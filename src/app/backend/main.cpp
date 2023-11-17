#include "server.h"
#include "algorithms/depthFirstSearch/dfs.h"
#include <iostream>
int main() {
    std::cout << "asdf" << std::endl;
    Dfs d = Dfs(5,0,1);
    d.AddConnection(0,3,1);
    d.AddConnection(0,1,1);
    std::cout << d.NextStep() << std::endl;
    // server();
    return 0;
}
