package main

import (
	"bytes"
	"flag"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
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
	//graph := algorithms.Graph{}
	//size := graph.SetSize(5)
	//fmt.Printf("before adding connection: %+v\n", graph.Nodes())
	//err := graph.AddConnection(0, 1)
	//if err != nil {
	//	fmt.Println(err)
	//}
	//algo := algorithms.BFS{}
	//algo.G = graph
	//algo.Search()
	//fmt.Printf("after adding connection: %+v\n", graph.Nodes())

	// ret := algorithms.Test()
	//fmt.Printf("size: %d\n", size)
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
