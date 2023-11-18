"use client";

import { NavBar } from './components/NavBar'
import { ToolBar } from './components/ToolBar'
import { Sandbox, TreeNode } from './components/Sandbox'
import { useState } from 'react'

export default function Home() {
  const [nodes, setNodes] = useState<TreeNode[]>([])
  const [idCount, setIDCount] = useState(0);
  const [tool, setTool] = useState("");
  const [connect, setConnect] = useState<number[]>([]);

  const activateAdd = () => {
    setTool("add");
  }
  
  const addNode = (title: string) => {
    setNodes(nodes => [...nodes, { id: idCount, title: idCount.toString(), connected: false, x: 0, y: 0 }]);
    setIDCount(idCount + 1);
  }

  const connectNode = (id: number) => {
    if (connect.length >= 2) {
      setConnect([]);
    }

    setConnect(connect => [...connect, id]);

    if (connect.length >= 2) {
      
    }
  }

  const selectNode = (title: string) => {
    setTool("select");
  }

  const nextNode = (title: number) => {
    if (nextNode == -1) {
       //There is no next node 
    } else {
        //Pick the node that the backend
        //returns. Use node ids?
    }
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

  return (
    <main>
      {/* <NavBar /> */}
      <div className='h-screen w-screen flex flex-row'>
        <Sandbox nodes={nodes} addNode={addNode} connectNode={connectNode} triggerDelete={triggerDelete} setPosition={setPosition} tool={tool} />
        <ToolBar activateAdd={activateAdd} removeNode={() => setTool("remove")} connectNode={connectNode} selectNode={selectNode} nextNode={nextNode} />
      </div>
    </main>
  )
}
