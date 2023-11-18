import { IconPlus, IconX, IconLine, IconPointer, IconPlayerTrackNext, IconPlayerPlay } from "@tabler/icons-react";
import { useRef, useState } from "react";
import Draggable from "react-draggable";

type ToolBarProps = {
    activateAdd: Function;
    removeNode: Function;
    activateConnect: Function;
    selectNode: Function;
    nextNode: Function;
    playNode: Function;
    tool: string;
}

const RunAlgorithmPopover = () => {
    // Element
}

const SettingsPopover = () => {
    // Element
    return (
        <>
        
        </>
    );
}

export const ToolBar = ({ activateAdd, removeNode, activateConnect, selectNode, nextNode, playNode, tool }: ToolBarProps) => {

    const buttonStyles = "hover:bg-slate-200 rounded-lg p-2 my-2 "

    const nodeRef = useRef(null);

    return (
        <>
            <Draggable nodeRef={nodeRef} grid={[window.innerWidth - 60, window.innerHeight - 10]}>
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
                    <button className={buttonStyles + (tool === "play" ? "bg-slate-200" : "bg-transparent")} onClick={() => {playNode(); console.log('play')}}>
                        <IconPlayerPlay />
                    </button>
                    <button className={buttonStyles + (tool === "next" ? "bg-slate-200" : "bg-transparent")} onClick={() => {nextNode(); console.log('next')}}>
                        <IconPlayerTrackNext />
                    </button>
                </div>
            </Draggable>
        </>
    );
}
