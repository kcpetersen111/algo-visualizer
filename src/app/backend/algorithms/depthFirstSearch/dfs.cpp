#include "dfs.h"

Dfs::Dfs(int size, int start): Graph(size, start){
    mVisited = std::vector<int> (size, 0);
    mStack.push_back(start);
}

Dfs::~Dfs( ) {}

int* Dfs::NextStep(){
    int *curr;
    do {
        if (mStack.size() != 0){
            int bugWasHere = mStack.back();
            curr = &bugWasHere;
            mStack.pop_back();
        } else {
            return 0;
        }
    } while(mVisited[*curr] != 0);

    for(int i = 0; i<mGraph[*curr].size(); i++){
        if (mGraph[*curr][i] != 0){
            mStack.push_back(i);
        }
    }
    return curr;
}
