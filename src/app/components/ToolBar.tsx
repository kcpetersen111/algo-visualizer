import { IconPlus, IconX, IconLine, IconPointer, IconPlayerTrackNext, IconPlayerPlay, IconSettings, IconMoon, IconArrowBarBoth } from "@tabler/icons-react";
import { useRef, useState } from "react";
import Draggable from "react-draggable";

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
}

type RunAlgorithmPopoverProps = {
    playNode: Function
}

const RunAlgorithmPopover = ({ playNode }: RunAlgorithmPopoverProps) => {
    // Element

    return (
        <>
            <div className="flex flex-col w-fit h-fit absolute right-20 border-2 rounded-md p-4">
                <p>Choose an Algorithm to run:</p>
                <select name="yup" className="w-fit">
                    <option>Breadth First Search</option>
                    <option>Depth First Search</option>
                </select>
                <button onClick={() => playNode()} className="mt-8 bg-blue-400 text-white rounded-md">Submit</button>
            </div>
        </>
    );
}

const SettingsPopover = () => {
    // Element
    return (
        <>
            <div className="flex flex-col w-fit h-fit absolute right-20 bottom-5 border-2 rounded-md p-4">
                <p>Settings:</p>
                <button onClick={() => {}}>
                    <IconMoon />
                </button>
                <button onClick={() => {}}>
                    <IconArrowBarBoth />
                </button>
            </div>
        
        </>
    );
}

export const ToolBar = ({ activateAdd, removeNode, activateConnect, selectNode, nextNode, activatePlay, playNode, settings, tool }: ToolBarProps) => {

    const buttonStyles = "hover:bg-slate-200 rounded-lg p-2 my-2 "

    const nodeRef = useRef(null);
    
    const [playPopover, setPlayPopover] = useState(false);
    const [settingsPopover, setSettingsPopover] = useState(false);

    return (
        <>
            <div ref={nodeRef} className="flex flex-col h-full w-fit p-2 divide-transparent border-2 justify-between">
                <div className="flex flex-col">
                
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
                        {playPopover && <RunAlgorithmPopover playNode={playNode} />}
                        <button className={buttonStyles + (tool === "play" ? "bg-slate-200" : "bg-transparent")} onClick={() => {activatePlay(); setPlayPopover(!playPopover); console.log('play')}}>
                            <IconPlayerPlay />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="flex flex-row">
                        {settingsPopover && <SettingsPopover />}
                        <button className={buttonStyles + (tool === "settings" ? "bg-slate-200" : "bg-transparent")} onClick={() => {settings(); setSettingsPopover(!settingsPopover); console.log('settings')}}>
                            <IconSettings />
                        </button>
                    </div>
                </div>

            </div>
        </>
    );
}
