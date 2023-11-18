package algorithms

import "fmt"

type Search interface {
	SetSize(int) int
	Search() int
	NextNode() int
	AddConnection()
}

func Test() int {
	fmt.Println("Hello from the algo module!")
	return 0
}
