package algorithms

import "fmt"

type BFS struct {
	CurrNode int
	G        Graph
}

func (b *BFS) NextNode() int {
	return 0
}

func (b *BFS) Search() int {
	// Search using BFS
	fmt.Println("In!")
	fmt.Printf("Graph size: %d\n", b.G.size)
	return 1
}
