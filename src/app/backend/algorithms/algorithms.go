package algorithms

type Search interface {
	StepSearch() (int, bool, error) // call the actual algo search
	NextNode() int                  // this should be on the actual search
}

func NewBFS(graph Graph) *BFS {
	b := BFS{}
	b.CurrNode = graph.startNode
	b.G = graph

	// seed the queue with info
	b.queue = append(b.queue, graph.startNode)

	return &b
}

func NewDFS(graph Graph) *DFS {
	d := DFS{}
	d.CurrNode = graph.startNode
	d.G = graph

	// seed the queue with info
	d.queue = append(d.queue, graph.startNode)

	return &d
}
