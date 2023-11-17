import Image from 'next/image'
import { NavBar } from './components/NavBar'
import { ToolBar } from './components/ToolBar'
import { Sandbox } from './components/Sandbox'

export default function Home() {
  return (
    <main>
      <NavBar />
      <div className='flex flex-row'>
        <ToolBar />
        <Sandbox />
      </div>
    </main>
  )
}
