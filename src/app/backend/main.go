package main

import (
	"bytes"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/kcpetersen111/algo-visualizer/src/app/backend/algoVis/algorithms"
)

func ping(w http.ResponseWriter, _ *http.Request) {
	b := bytes.NewBufferString("pong")
	w.WriteHeader(200)
	w.Write(b.Bytes())
}

func ws(w http.ResponseWriter, _ *http.Request) {
	return
}

func addRoutes(router *mux.Router) {
	router.HandleFunc("/ping", ping)
	router.HandleFunc("/ws", ws)
}

func main() {
	graph := algorithms.Graph{}
	_ = graph.SetSize(5)
	graph.SetGoal(4)
	graph.SetStartNode(0)
	fmt.Printf("before adding connection: %+v\n", graph.Nodes())

	err := graph.AddConnection(0, 3)
	if err != nil {
		fmt.Println(err)
	}
	err = graph.AddConnection(3, 2)
	if err != nil {
		fmt.Println(err)
	}
	err = graph.AddConnection(2, 4)
	if err != nil {
		fmt.Println(err)
	}
	// fmt.Println("Goal: %d\n", graph.goalNode)

	fmt.Printf("after adding connection: %+v\n", graph.Nodes())

	algo := algorithms.NewDFS(graph)

	iters := 0
	for {
		currNode, done, err := algo.StepSearch()
		if err != nil {
			fmt.Println(err)
			return
		}
		if done {
			fmt.Printf("ended on node %d!\n", currNode)
			break
		}
		fmt.Printf("We are on node %d\n", currNode)
		iters += 1
		// fmt.Printf("iter: %d\n", iters)
	}

	// host := flag.String("host", "0.0.0.0", "The host to listen at")
	// port := flag.String("port", "3410", "The host to listen at")
	// flag.Parse()

	// router := mux.NewRouter()
	// addRoutes(router)

	// c := cors.New(cors.Options{
	// 	AllowedOrigins:   []string{"http://localhost:4173", "http://binary141.com:4173", "http://localhost:5173"},
	// 	AllowCredentials: true,
	// 	AllowedHeaders:   []string{"*"},
	// })
	// Addr := strings.Builder{}
	// Addr.WriteString(*host)
	// Addr.WriteString(":")
	// Addr.WriteString(*port)
	// srv := &http.Server{
	// 	Handler:      c.Handler(router),
	// 	Addr:         Addr.String(),
	// 	WriteTimeout: 15 * time.Second,
	// 	ReadTimeout:  15 * time.Second,
	// }
	// log.Fatal(srv.ListenAndServe())

}
