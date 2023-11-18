package algorithms

type Search interface {
	StepSearch() int // call the actual algo search
	NextNode() int   // this should be on the actual search
}

func NewBFS(graph Graph) BFS {
	b := BFS{}
	b.CurrNode = graph.startNode
	b.queue = make([]int, 0)
	b.G = graph

	// seed the queue with info
	b.queue = append(b.queue, b.CurrNode)

	return b
}
