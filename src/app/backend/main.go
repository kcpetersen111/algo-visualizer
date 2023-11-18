package main

import (
	"flag"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
	// graph := algorithms.Graph{}
	// _ = graph.SetSize(5)
	// graph.SetStartNode(0)
	// graph.SetGoal(2)
	// fmt.Printf("before adding connection: %+v\n", graph.Nodes())
	// err := graph.AddConnection(0, 1)
	// if err != nil {
	// 	fmt.Println(err)
	// }
	// err = graph.AddConnection(1, 3)
	// if err != nil {
	// 	fmt.Println(err)
	// }
	// err = graph.AddConnection(1, 4)
	// if err != nil {
	// 	fmt.Println(err)
	// }
	// err = graph.AddConnection(0, 2)
	// if err != nil {
	// 	fmt.Println(err)
	// }
	// algo := algorithms.NewDFS(graph)

	// fmt.Printf("after adding connection: %+v\n", graph.Nodes())

	// for {
	// 	node, done, err := algo.StepSearch()
	// 	if err != nil {
	// 		fmt.Println(err)
	// 		return
	// 	}
	// 	if done {
	// 		fmt.Printf("Found the goal node %d\n", node)
	// 		return
	// 	}
	// 	fmt.Printf("On node %d\n", node)
	// }

	host := flag.String("host", "0.0.0.0", "The host to listen at")
	port := flag.String("port", "3410", "The host to listen at")
	flag.Parse()

	router := mux.NewRouter()
	addRoutes(router)

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:4173", "http://binary141.com:4173", "http://localhost:5173"},
		AllowCredentials: true,
		AllowedHeaders:   []string{"*"},
	})
	Addr := strings.Builder{}
	Addr.WriteString(*host)
	Addr.WriteString(":")
	Addr.WriteString(*port)
	srv := &http.Server{
		Handler:      c.Handler(router),
		Addr:         Addr.String(),
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}
	log.Fatal(srv.ListenAndServe())
}
