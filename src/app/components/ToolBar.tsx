import { IconPlus, IconX, IconLine, IconPointer, IconPlayerTrackNext, IconPlayerPlay, IconSettings, IconMoon, IconArrowBarBoth } from "@tabler/icons-react";
import { useRef, useState } from "react";
import Draggable from "react-draggable";
import { DarkModeToggle } from "./DarkModeToggle";

type ToolBarProps = {
    activateAdd: Function;
    removeNode: Function;
    activateConnect: Function;
    selectNode: Function;
    nextNode: Function;
    activatePlay: Function;
    playNode: Function;
    settings: Function;
    tool: string;
    setType: Function;
    toggleDarkLight: Function;
    dark: boolean;
    from?: number;
    to?: number;
    setFrom: Function;
    setTo: Function;
}

type RunAlgorithmPopoverProps = {
    playNode: Function;
    setType: Function;
    from?: number;
    to?: number;
    setFrom: Function;
    setTo: Function;
}

const RunAlgorithmPopover = ({ playNode, setType, from, to, setFrom, setTo }: RunAlgorithmPopoverProps) => {
    // Element

    // const [from, setFrom] = useState<string>();
    // const [to, setTo] = useState<string>();

    return (
        <>
            <div className="flex flex-col w-fit h-fit absolute right-20 border-2 rounded-md p-4 dark:bg-slate-700 dark:border-gray-600">
                <p>Choose an Algorithm to run:</p>
                <select name="yup" className="w-fit bg-transparent">
                    <option onClick={() => setType("bfs")}>Breadth First Search</option>
                    <option onClick={() => setType("dfs")}>Depth First Search</option>
                </select>
                <label className="mt-4">From:</label>
                <input value={from} onChange={(e) => setFrom(e.target.value)} type="text" className="border-2 dark:text-slate-950" />

                <label className="mt-4">To:</label>
                <input value={to} type="text" onChange={(e) => setTo(e.target.value)} className="border-2 dark:text-slate-950" />
                <button onClick={() => playNode()}  className="mt-8 bg-blue-400 text-white rounded-md">Submit</button>
            </div>
        </>
    );
}

type SettingsPopoverProps = {
    toggleDarkLight: Function;
    dark: boolean;
}

const SettingsPopover = ({toggleDarkLight, dark}: SettingsPopoverProps) => {
    // Element
    return (
        <>
            <div className="flex flex-col w-fit h-fit absolute right-20 bottom-5 border-2 rounded-md p-4 dark:bg-slate-700 dark:border-gray-600">
                <p className="mb-4">Settings:</p>
                <DarkModeToggle dark={dark} onClick={() => toggleDarkLight()} />
                {/* <button onClick={() => {}}>
                    <IconArrowBarBoth />
                </button> */}
            </div>
        
        </>
    );
}

export const ToolBar = ({ activateAdd, removeNode, activateConnect, selectNode, nextNode, activatePlay, playNode, settings, tool, setType, toggleDarkLight, dark, to, from, setTo, setFrom }: ToolBarProps) => {

    const buttonStyles = "hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg p-2 my-2 "

    const nodeRef = useRef(null);
    
    const [playPopover, setPlayPopover] = useState(false);
    const [settingsPopover, setSettingsPopover] = useState(false);

    return (
        <>
            <div ref={nodeRef} className="flex flex-col h-full w-fit p-2 divide-transparent border-2 justify-between dark:bg-slate-700 dark:border-none dark:text-white">
                <div className="flex flex-col">
                
                    <button className={buttonStyles + (tool === "add" ? "bg-slate-200 dark:bg-slate-800" : "bg-transparent")} onClick={() => activateAdd()}>
                        <IconPlus />
                    </button>
                    <button className={buttonStyles + (tool === "remove" ? "bg-slate-200 dark:bg-slate-800" : "bg-transparent")} onClick={() => {removeNode(); console.log('remove')}}>
                        <IconX />
                    </button>
                    <button className={buttonStyles + (tool === "connect" ? "bg-slate-200 dark:bg-slate-800" : "bg-transparent")} onClick={() => {activateConnect(); console.log('connect')}}>
                        <IconLine />
                    </button>
                    <button className={buttonStyles + (tool === "select" ? "bg-slate-200 dark:bg-slate-800" : "bg-transparent")} onClick={() => {selectNode(); console.log('select')}}>
                        <IconPointer />
                    </button>
                    <button className={buttonStyles + (tool === "next" ? "bg-slate-200 dark:bg-slate-800" : "bg-transparent")} onClick={() => {nextNode(); console.log('next')}}>
                        <IconPlayerTrackNext />
                    </button>
                    <div className="flex flex-row">
                        {playPopover && <RunAlgorithmPopover playNode={playNode} setType={setType} to={to} from={from} setTo={setTo} setFrom={setFrom} />}
                        <button className={buttonStyles + (tool === "play" ? "bg-slate-200 dark:bg-slate-800" : "bg-transparent")} onClick={() => {activatePlay(); setPlayPopover(!playPopover); console.log('play')}}>
                            <IconPlayerPlay />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="flex flex-row">
                        {settingsPopover && <SettingsPopover toggleDarkLight={toggleDarkLight} dark={dark} />}
                        <button className={buttonStyles + (tool === "settings" ? "bg-slate-200 dark:bg-slate-800" : "bg-transparent")} onClick={() => {settings(); setSettingsPopover(!settingsPopover); console.log('settings')}}>
                            <IconSettings />
                        </button>
                    </div>
                </div>

            </div>
        </>
    );
}
