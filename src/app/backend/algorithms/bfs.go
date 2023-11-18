package algorithms

import (
	"errors"
	"fmt"
)

type BFS struct {
	size     int
	currNode int
	// adjacency graph
	//[startNode][endNode]
	nodes     [][]int
	startNode int
	goalNode  int
}

func (b *BFS) SetSize(size int) int {
	b.size = size
	for i := 0; i < size; i++ {
		a := make([]int, size)
		b.nodes = append(b.nodes, a)
	}

	return b.size
}

func (b *BFS) Search() int {
	// Search using BFS
	fmt.Println("In the search!")
	return 1
}

func (b *BFS) Nodes() [][]int {
	return b.nodes
}

func (b *BFS) NextNode() int {
	// Return next node from Search?
	fmt.Println("In the NextNode!")
	return 1
}

func (b *BFS) AddConnection(startNode, endNode int) error {
	if startNode >= len(b.nodes) || endNode >= len(b.nodes[startNode]) {
		return errors.New("Invalid index!")
	}

	b.nodes[startNode][endNode] = 1
	return nil
}
