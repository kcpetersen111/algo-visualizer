package algorithms

import (
	"errors"
)

type DFS struct {
	CurrNode int
	G        Graph
	queue    []int
}

func (d *DFS) NextNode() int {
	return d.CurrNode
}

func (d *DFS) StepSearch() (int, bool, error) {
	// Search using DFS
	if len(d.queue) == 0 {
		return 0, true, errors.New("Queue was empty while trying to get a new child!")
	}

	// get the next node in the list
	d.CurrNode = d.queue[0]

	// check to see if we are now at the goal node
	if d.CurrNode == d.G.goalNode {
		return d.CurrNode, true, nil
	}

	// remove the element from the end of the list
	d.queue = d.queue[1:]

	for _, child := range d.GenerateChildren() {
		// make sure we haven't been here before
		if d.G.visited[child] == 1 {
			continue
		}

		// Mark as visited
		d.G.visited[child] = 1

		// don't modify the queue if we are at the end
		if d.G.AllVisited() {
			return d.CurrNode, true, nil
		}

		// Push to the queue
		d.queue = append(d.queue, append([]int{child}, d.queue[:]...)...)
		// d.queue = append(d.queue, child)
	}

	return d.CurrNode, false, nil
}

func (d *DFS) GenerateChildren() []int {
	// looks at the current node and gets the nodes indexes that it can go to
	ret := make([]int, 0)
	for i := range d.G.adjacency[d.CurrNode] {
		if d.G.adjacency[d.CurrNode][i] != -1 {
			ret = append(ret, i)
		}
	}
	return ret
}
