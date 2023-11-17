#include "dfs.h"

Dfs::Dfs(int size, int start, int end): 
    Graph(size, start, end){
    mVisited = std::vector<int> (size, NULL);
}

int Dfs::NextStep(){
    int curr;
    do {
        if (mStack.size() != 0){
            curr = mStack.back();
            mStack.pop_back();
        } else {
            return NULL;
        }
    } while(mVisited[curr] != NULL);
    for(int i = 0; i<mGraph[curr].size(); i++){
        if (mGraph[curr][i] != NULL){
            mStack.push_back(i);
        }
    }
    return curr;
}
