package main

import (
	"bytes"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	"github.com/tidwall/gjson"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func ping(w http.ResponseWriter, _ *http.Request) {
	b := bytes.NewBufferString("pong")
	w.WriteHeader(200)
	w.Write(b.Bytes())
}

func addRoutes(router *mux.Router) {
	router.HandleFunc("/ping", ping)
	router.HandleFunc("/ws", ws)
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

		if gjson.GetBytes(msg, "create").Exists() {
			// numb := gjson.GetBytes(msg, "create.size").String()
			// startNode := gjson.GetBytes(msg, "create.startNode").String()
			// endNode := gjson.GetBytes(msg, "create.endNode").String()
			// searchType := gjson.GetBytes(msg, "create.searchType").String()
			// make the graph here from Node will be the starting node
			log.Println("create")
		} else if gjson.GetBytes(msg, "connection").Exists() {
			fromNode, err := strconv.Atoi(gjson.GetBytes(msg, "connection.fromNode").String())
			if err != nil {
				log.Printf("error parsing fromNode: %v", err)
				continue
			}
			toNode, err := strconv.Atoi(gjson.GetBytes(msg, "connection.toNode").String())
			if err != nil {
				log.Printf("error parsing toNode: %v", err)
				continue
			}
			log.Printf("from: %v to: %v \n", fromNode, toNode)
		} else if gjson.GetBytes(msg, "next").Exists() {
			//next stuff
			log.Println("Do next")
		} else if gjson.GetBytes(msg, "prev").Exists() {
			//prev
			log.Println("Do prev")
		} else {
			// what did you send us
			log.Printf("other")

		}

	}
}
