"use client";

import { NavBar } from './components/NavBar'
import { ToolBar } from './components/ToolBar'
import { Sandbox, TreeNode } from './components/Sandbox'
import { useState } from 'react'

export default function Home() {
  const [nodes, setNodes] = useState<TreeNode[]>([])
  const [idCount, setIDCount] = useState(0);
  const [removable, setRemovable] = useState(false);
  
  const addNode = (title: string) => {
    setNodes(nodes => [...nodes, { id: idCount, title: idCount.toString(), connected: false, x: 0, y: 0 }]);
    setIDCount(idCount + 1);
  }

  const triggerDelete = (id: number) => {
    const tempNodes = nodes.filter(node => node.id !== id);

    setNodes([]);
    
    setNodes(tempNodes.slice());
    // setNodes(prev => prev.filter(node => node.id !== id));
    setRemovable(false);

  }

  const setPosition = (id: number, x: number, y: number) => {
    const tempNodes = nodes.slice();
    const tempNode: TreeNode ={ ...nodes[0] };
    let insertIndex = 0;

    tempNodes.map((node, index) => {
      if (node.id === id) {
        tempNode.x = x;
        tempNode.y = y;
        insertIndex = index;
        console.log(tempNode);
      }
    });


    tempNodes.splice(insertIndex, 1, tempNode);
    
    setNodes(tempNodes);

    // const node = nodes.filter(node => node.id === id)[0];
    // if (node) {
    //     node.x = x;
    //     node.y = y;
    // }
}

  return (
    <main>
      <NavBar />
      <div className='h-screen w-screen flex flex-row'>
        <Sandbox nodes={nodes} triggerDelete={triggerDelete} setPosition={setPosition} removable={removable} />
        <ToolBar addNode={addNode} removeNode={() => setRemovable(true)} />
      </div>
    </main>
  )
}
