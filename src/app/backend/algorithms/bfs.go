package algorithms

import (
	"errors"
)

type BFS struct {
	CurrNode int
	G        Graph
	queue    []int
}

func (b *BFS) NextNode() int {
	return b.CurrNode
}

func (b *BFS) StepSearch() (int, bool, error) {
	// Search using BFS
	if len(b.queue) == 0 {
		return 0, true, errors.New("Queue was empty while trying to get a new child!")
	}

	// get the next node in the list
	b.CurrNode = b.queue[0]

	// check to see if we are now at the goal node
	if b.CurrNode == b.G.goalNode {
		return b.CurrNode, true, nil
	}

	// remove the element from the beginning of the list
	b.queue = b.queue[1:]

	for _, child := range b.GenerateChildren() {
		// make sure we haven't been here before
		if b.G.visited[child] == 1 {
			continue
		}

		// Mark as visited
		b.G.visited[child] = 1

		// don't modify the queue if we are at the end
		if b.G.AllVisited() {
			return b.CurrNode, true, nil
		}

		// Push to the queue
		b.queue = append(b.queue, child)
	}

	return b.CurrNode, false, nil
}

func (b *BFS) GenerateChildren() []int {
	// looks at the current node and gets the nodes indexes that it can go to
	ret := make([]int, 0)
	for i := range b.G.adjacency[b.CurrNode] {
		if b.G.adjacency[b.CurrNode][i] != -1 {
			ret = append(ret, i)
		}
	}
	return ret
}
