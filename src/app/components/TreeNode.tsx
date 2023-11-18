import { MouseEventHandler, useEffect, useRef, useState } from "react";
import Draggable, { DraggableData, DraggableEvent, DraggableEventHandler } from "react-draggable";

type TreeNodeProps = {
    title: string;
    className?: string;
    id?: number;
    position: Position;
    setPosition: Function;
    onClick: MouseEventHandler;
}

type Position = {
    x: number;
    y: number;
}

export const TreeNode = ({ title, className, id, position, setPosition, onClick }: TreeNodeProps) => {
    const nodeRef = useRef(null);

    const handleDrag = (e: DraggableEvent, data: DraggableData) => {
        setPosition(id, data.x, data.y);
    }

    return (
        <>
            <Draggable bounds="parent" nodeRef={nodeRef} onStop={handleDrag} position={position} >
                <div 
                    ref={nodeRef} 
                    onClick={onClick}
                    id={id?.toString()}
                    className={`w-20 h-20 flex items-center justify-center rounded-full border-2 absolute hover:cursor-grab ${className}`}>
                    <h1>{title}</h1>
                </div>
            </Draggable>
        </>
    );
}