"use client";

import { NavBar } from './components/NavBar'
import { ToolBar } from './components/ToolBar'
import { Sandbox } from './components/Sandbox'
import { useState } from 'react'

export default function Home() {
  const [nodes, setNodes] = useState<string[]>([])

  return (
    <main>
      <NavBar />
      <div className='h-screen w-screen flex flex-row'>
        <Sandbox nodes={nodes} />
        <ToolBar addNode={(title: string) => setNodes(nodes => [...nodes, title])} />
      </div>
    </main>
  )
}
