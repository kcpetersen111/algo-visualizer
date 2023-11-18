import { IconPlus, IconX, IconLine, IconPointer, IconPlayerTrackNext, IconPlayerPlay, IconSettings } from "@tabler/icons-react";
import { useRef, useState } from "react";
import Draggable from "react-draggable";

type ToolBarProps = {
    activateAdd: Function;
    removeNode: Function;
    activateConnect: Function;
    selectNode: Function;
    nextNode: Function;
    playNode: Function;
    settings: Function;
    tool: string;
}

const RunAlgorithmPopover = () => {
    // Element

    return (
        <>
            <div className="flex flex-col w-fit h-fit absolute right-20 border-2 rounded-md p-4">
                <p>Choose an Algorithm to run:</p>
                <select name="yup" className="w-fit">
                    <option>Breadth First Search</option>
                    <option>Depth First Search</option>
                </select>
                <button className="mt-8 bg-blue-400 text-white rounded-md">Submit</button>
            </div>
        </>
    );
}

const SettingsPopover = () => {
    // Element
    return (
        <>
        
        </>
    );
}

export const ToolBar = ({ activateAdd, removeNode, activateConnect, selectNode, nextNode, playNode, settings, tool }: ToolBarProps) => {

    const buttonStyles = "hover:bg-slate-200 rounded-lg p-2 my-2 "

    const nodeRef = useRef(null);
    
    const [playPopover, setPlayPopover] = useState(false);

    return (
        <>
            <div ref={nodeRef} className="flex flex-col h-full w-fit p-2 divide-transparent border-2">
                <button className={buttonStyles + (tool === "add" ? "bg-slate-200" : "bg-transparent")} onClick={() => activateAdd()}>
                    <IconPlus />
                </button>
                <button className={buttonStyles + (tool === "remove" ? "bg-slate-200" : "bg-transparent")} onClick={() => {removeNode(); console.log('remove')}}>
                    <IconX />
                </button>
                <button className={buttonStyles + (tool === "connect" ? "bg-slate-200" : "bg-transparent")} onClick={() => {activateConnect(); console.log('connect')}}>
                    <IconLine />
                </button>
                <button className={buttonStyles + (tool === "select" ? "bg-slate-200" : "bg-transparent")} onClick={() => {selectNode(); console.log('select')}}>
                    <IconPointer />
                </button>
                <button className={buttonStyles + (tool === "next" ? "bg-slate-200" : "bg-transparent")} onClick={() => {nextNode(); console.log('next')}}>
                    <IconPlayerTrackNext />
                </button>
                <div className="flex flex-row">
                    {playPopover && <RunAlgorithmPopover />}
                    <button className={buttonStyles + (tool === "play" ? "bg-slate-200" : "bg-transparent")} onClick={() => {playNode(); setPlayPopover(!playPopover); console.log('play')}}>
                        <IconPlayerPlay />
                    </button>
                </div>
                <button className={buttonStyles + (tool === "next" ? "bg-slate-200" : "bg-transparent")} onClick={() => {settings(); console.log('settings')}}>
                    <IconSettings />
                </button>
            </div>
        </>
    );
}
