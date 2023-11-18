package algorithms

import (
	"errors"
)

type Search interface {
	Search() int   // call the actual algo search
	NextNode() int // this should be on the actual search
}

type Graph struct {
	size int
	// adjacency graph
	//[startNode][endNode]
	adjacency [][]int
	startNode int
	goalNode  int
	visited   []int
}

func (g *Graph) SetSize(size int) int {
	g.size = size
	for i := 0; i < size; i++ {
		a := make([]int, size)
		for j := range a {
			a[j] = -1
		}
		g.adjacency = append(g.adjacency, a)
	}

	return g.size
}

func (g *Graph) Nodes() [][]int {
	return g.adjacency
}

func (g *Graph) AddConnection(startNode, endNode int) error {
	if startNode >= len(g.adjacency) || endNode >= len(g.adjacency[startNode]) {
		return errors.New("Invalid index!")
	}

	g.adjacency[startNode][endNode] = 1
	return nil
}
