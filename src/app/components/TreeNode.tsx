import { MouseEventHandler, useRef, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";

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
    const [grabbyHand, setGrabbyHand] = useState<boolean>(false);

    const handleDrag = (e: DraggableEvent, data: DraggableData) => {
        setPosition(id, data.x, data.y);
        setGrabbyHand(false);
    }

    return (
        <>
            <Draggable bounds="parent" nodeRef={nodeRef} onDrag={() => setGrabbyHand(true)} onStop={handleDrag} position={position} >
                <div 
                    ref={nodeRef}
                    onClick={onClick}
                    id={id?.toString()}
                    className={`w-20 h-20 flex items-center justify-center rounded-full border-2 absolute ${className} ${grabbyHand ? "hover:cursor-grabbing" : "hover:cursor-grab"}`}>
                    <h1 className="dark:text-white">{title}</h1>
                </div>
            </Draggable>
        </>
    );
}