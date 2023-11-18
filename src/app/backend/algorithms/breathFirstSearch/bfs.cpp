#include "bfs.h"

Bfs::Bfs(int size, int start): Graph(size, start){
    mVisited = std::vector<int> (size, 0);
    mQueue.push(start);
}

Bfs::~Bfs( ) {}

int Bfs::NextStep(){
    int curr;
    do {
        if (mQueue.size() != 0){
            curr = mQueue.back();
            mQueue.pop();
        } else {
            return 0;
        }
    } while(mVisited[curr] != 0);

    for(int i = 0; i<mGraph[curr].size(); i++){
        if (mGraph[curr][i] != 0){
            mQueue.push(i);
        }
    }
    return curr;
}

