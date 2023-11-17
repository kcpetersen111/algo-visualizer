#include "dfs.h"

Dfs::Dfs(int size, int start, int end): Graph(size, start, end){
    mVisited = std::vector<int> (size, 0);
}

Dfs::~Dfs( ) {}

int Dfs::NextStep(){
    int curr;
    do {
        if (mStack.size() != 0){
            curr = mStack.back();
            mStack.pop_back();
        } else {
            return 0;
        }
    } while(mVisited[curr] != 0);
    for(int i = 0; i<mGraph[curr].size(); i++){
        if (mGraph[curr][i] != 0){
            mStack.push_back(i);
        }
    }
    return curr;
}
