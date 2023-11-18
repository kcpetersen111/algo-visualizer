package main

import (
	"bytes"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	"github.com/kcpetersen111/algo-visualizer/src/app/backend/algoVis/algorithms"
	"github.com/tidwall/gjson"
	"github.com/tidwall/sjson"
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
		log.Printf("error upgrading websocket: %v\n", err)
		return
	}
	var search algorithms.Search
	mapToBackend := make(map[int]int)
	mapToFrontend := make(map[int]int)
	first := true
	maxMapping := 0
	graph := algorithms.Graph{}
	var searchType string
	for {
		_, msg, err := conn.ReadMessage()
		if err != nil {
			log.Printf("error reading msg from connection: %v\n", err)
			return
		}
		log.Println(gjson.GetBytes(msg, "msg").String())

		if gjson.GetBytes(msg, "create").Exists() {
			numb, err := strconv.Atoi(gjson.GetBytes(msg, "create.size").String())
			if err != nil {
				log.Printf("error getting the size of the graph: %v\n", err)
				return
			}
			start, err := strconv.Atoi(gjson.GetBytes(msg, "create.startNode").String())
			if err != nil {
				log.Printf("error getting the start node of the graph: %v\n", err)
				return
			}
			end, err := strconv.Atoi(gjson.GetBytes(msg, "create.endNode").String())
			if err != nil {
				log.Printf("error getting the end node of the graph: %v\n", err)
				return
			}
			searchType = gjson.GetBytes(msg, "create.searchType").String()
			graph.SetSize(numb)
			graph.SetStartNode(start)
			graph.SetGoal(end)
			log.Println("create")
		} else if gjson.GetBytes(msg, "connection").Exists() {
			fromNode, err := strconv.Atoi(gjson.GetBytes(msg, "connection.fromNode").String())
			if err != nil {
				log.Printf("error parsing fromNode: %v\n", err)
				continue
			}
			toNode, err := strconv.Atoi(gjson.GetBytes(msg, "connection.toNode").String())
			if err != nil {
				log.Printf("error parsing toNode: %v\n", err)
				continue
			}

			_, ok := mapToBackend[fromNode]
			if !ok {
				mapToBackend[fromNode] = maxMapping
				mapToFrontend[maxMapping] = fromNode
				maxMapping++
			}
			_, ok = mapToBackend[toNode]
			if !ok {
				mapToBackend[toNode] = maxMapping
				mapToFrontend[maxMapping] = toNode
				maxMapping++
			}

			err = graph.AddConnection(mapToBackend[fromNode], mapToBackend[toNode])
			if err != nil {
				log.Printf("error adding connection %v graph: %#v fromNode after map: %v toNode after map: %v \n", err, graph.Nodes(), mapToBackend[fromNode], mapToBackend[toNode])
				continue
			}

			log.Printf("from: %v to: %v \n", fromNode, toNode)

		} else if gjson.GetBytes(msg, "next").Exists() {
			if first {
				first = false
				switch searchType {
				case "bfs":
					search = algorithms.NewBFS(graph)
				default:
					log.Printf("unknown search type: %v", searchType)
				}
			}
			//next stuff
			step, done, err := search.StepSearch()
			if err != nil {
				res, err := sjson.Set("", "visiting.impossible", true)
				if err != nil {
					log.Printf("error while trying to set impossible: %v", err)
					return
				}
				conn.WriteMessage(1, []byte(res))

				return
			}
			if done {
				res, err := sjson.Set("", "visiting.done", true)
				if err != nil {
					log.Printf("error while trying to set impossible: %v", err)
					return
				}
				res, err = sjson.Set(res, "visiting.id", mapToFrontend[step])
				if err != nil {
					log.Printf("error while tryinh to set id: %v", err)
					return
				}
				conn.WriteMessage(1, []byte(res))
				return
			}
			son, err := sjson.Set("", "visiting.id", mapToFrontend[step])
			if err != nil {
				log.Printf("error marshaling: %v\n", err)
				continue
			}

			err = conn.WriteMessage(1, []byte(son))
			if err != nil {
				log.Printf("error writing to conn: %v\n", err)
				continue
			}

		} else if gjson.GetBytes(msg, "prev").Exists() {
			//prev
			log.Println("Do prev")
		} else {
			// what did you send us
			log.Printf("other")

		}

	}
}
