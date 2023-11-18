"use client";

import { NavBar } from './components/NavBar'
import { ToolBar } from './components/ToolBar'
import { Connection, Sandbox, TreeNode } from './components/Sandbox'
import { useEffect, useState } from 'react'

export default function Home() {
  const [nodes, setNodes] = useState<TreeNode[]>([])
  const [connections, setConnections] = useState<Connection[]>([]);
  const [idCount, setIDCount] = useState(0);
  const [tool, setTool] = useState("add");
  const [connect, setConnect] = useState<number[]>([]);
  const [websocket, setWebsocket] = useState<WebSocket>();
  const [type, setType] = useState<string>("bfs");

  useEffect(() => {
    setWebsocket(new WebSocket("ws://0.0.0.0:3410/ws"));
  }, []);


  const activateAdd = () => {
    setTool("add");
  }

  const activateConnect = () => {
    setTool("connect");
  }
  
  const addNode = (x: number, y: number) => {
    setNodes(nodes => [...nodes, { id: idCount, title: idCount.toString(), connected: false, x: x-40, y: y-40 }]);
    setIDCount(idCount + 1);
  }

  const connectNode = (id: number) => {

    if (id === -1) {
      setConnect([]);
    } else {
      const tempConnect = [...connect, id];
      setConnect(tempConnect);
      console.log(tempConnect);
  
      if (tempConnect.length === 2) {
        setConnections(connections => [...connections, { from: tempConnect[0], to: tempConnect[1] }]);
        setConnect([]);
        console.log('here');
      }
    }

  }

  const selectNode = () => {
    setTool("select");
  }

  const nextNode = (title: number) => {
    // if (nextNode == -1) {
    //    There is no next node 
    // } else {
    //     Pick the node that the backend
    //     returns. Use node ids?
    // }
  }

  const shiftNode = (offset: number, index: number, tempNodes: TreeNode[]) => {
    const adjustNodes = tempNodes.slice(index);
    console.log(adjustNodes);

    adjustNodes.forEach((n) => {
      setPosition(n.id, n.x, n.y + offset);
    });
  }

  const triggerDelete = (id: number) => {
    
    const tempNodes = nodes.filter(node => node.id !== id).slice();
    
    const index = nodes.findIndex(node => node.id === id);
    shiftNode(80, index, tempNodes);
    
    setNodes([]);
    
    setNodes(tempNodes.slice());
    // setTool(false);

    setConnections(connections.filter(conn => conn.from !== id && conn.to !== id));
    
  }

  const setPosition = (id: number, x: number, y: number) => {
    const tempNodes = nodes.slice();
    const tempNode: TreeNode ={ ...nodes[0] };
    let insertIndex = 0;

    tempNodes.map((node, index) => {
      if (node.id === id) {
        tempNode.x = x;
        tempNode.y = y;
        tempNode.id = id;
        tempNode.title = node.title;
        tempNode.connected = node.connected;

        insertIndex = index;
      }
    });

    tempNodes.splice(insertIndex, 1, tempNode);

    console.log(tempNodes);
    
    setNodes(tempNodes);

  }

  const activatePlay = () => {
    setTool("play");
  }

  const playNode = () => {
    if (connections.length > 0) {

      const createMessage = {
        create: {
          searchType: type,
          size: connections.length,
          startNode: connections[0].from,
          endNode: connections[0].to,
        },
      }

      websocket?.send(JSON.stringify(createMessage));

      connections.map((conn, index) => {
        const connectionMessage = {
          connection: {
            fromNode: conn.from,
            toNode: conn.to,
          }
        }

        websocket?.send(JSON.stringify(connectionMessage));
      })

      websocket?.send(JSON.stringify({ next: 0 }));
    }
  }


  return (
    <main>
      {/* <NavBar /> */}
      <div className='h-screen w-screen flex flex-row'>
        <Sandbox nodes={nodes} addNode={addNode} connectNode={connectNode} connections={connections} triggerDelete={triggerDelete} setPosition={setPosition} tool={tool} />
        <ToolBar settings={() => {}} activateAdd={activateAdd} removeNode={() => setTool("remove")} activateConnect={activateConnect} selectNode={selectNode} nextNode={nextNode} activatePlay={activatePlay} playNode={playNode} tool={tool} setType={setType} />
      </div>
    </main>
  );
}
