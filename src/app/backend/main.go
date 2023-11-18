package main

import (
	"bytes"
	"flag"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	"github.com/rs/cors"
	"github.com/tidwall/gjson"
)

func ping(w http.ResponseWriter, _ *http.Request) {
	b := bytes.NewBufferString("pong")
	w.WriteHeader(200)
	w.Write(b.Bytes())
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func ws(w http.ResponseWriter, r *http.Request) {
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("error upgrading websocket: %v", err)
		return
	}
	for {
		_, msg, err := conn.ReadMessage()
		if err != nil {
			log.Printf("error reading msg from connection: %v", err)
			return
		}
		log.Println(gjson.GetBytes(msg, "msg").String())
	}
}

func addRoutes(router *mux.Router) {
	router.HandleFunc("/ping", ping)
	router.HandleFunc("/ws", ws)
}

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
