import { IconPlus, IconX, IconLine, IconPointer, IconPlayerTrackNext } from "@tabler/icons-react";
import { useState } from "react";

type ToolBarProps = {
    activateAdd: Function;
    removeNode: Function;
    activateConnect: Function;
    selectNode: Function;
    nextNode: Function;
    tool: string;
}

export const ToolBar = ({ activateAdd, removeNode, activateConnect, selectNode, nextNode, tool }: ToolBarProps) => {

    const buttonStyles = "hover:bg-slate-200 rounded-lg p-2 my-2 "

    return (
        <>
            <div className="flex flex-col h-full w-fit p-2 divide-transparent border-2">
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
            </div>
        </>
    );
}
