"use client";

import { NavBar } from './components/NavBar'
import { ToolBar } from './components/ToolBar'
import { Sandbox, TreeNode } from './components/Sandbox'
import { useState } from 'react'

export default function Home() {
  const [nodes, setNodes] = useState<TreeNode[]>([])
  const [idCount, setIDCount] = useState(0);
  const [tool, setTool] = useState("");

  const activateAdd = () => {
    setTool("add");
  }
  
  const addNode = (title: string) => {
    setNodes(nodes => [...nodes, { id: idCount, title: idCount.toString(), connected: false, x: 0, y: 0 }]);
    setIDCount(idCount + 1);
  }

  const connectNode = (title: string) => {
    // const tempNodes = nodes.filter(node => node.id !== id);

    // setNodes([]);
    
    // setNodes(tempNodes.slice());
    // setNodes(prev => prev.filter(node => node.id !== id));
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
<<<<<<< HEAD
        <Sandbox nodes={nodes} triggerDelete={triggerDelete} setPosition={setPosition} removable={removable} />
        <ToolBar addNode={addNode} removeNode={() => setRemovable(true)} connectNode={connectNode} />
=======
        <Sandbox nodes={nodes} addNode={addNode} triggerDelete={triggerDelete} setPosition={setPosition} tool={tool} />
        <ToolBar activateAdd={activateAdd} removeNode={() => setTool("remove")} connectNode={connectNode} />
>>>>>>> 7a745299ee3fd1c650b382c7910c635016c0c831
      </div>
    </main>
  )
}
