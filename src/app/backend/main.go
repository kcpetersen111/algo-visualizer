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
