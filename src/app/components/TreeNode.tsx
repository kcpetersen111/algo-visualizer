import { useRef } from "react";
import Draggable from "react-draggable";

type TreeNodeProps = {
    title: string;
}
export const TreeNode = ({ title }: TreeNodeProps) => {
    const nodeRef = useRef(null);
    return (
        <>
            <Draggable bounds="parent" nodeRef={nodeRef}>
                <div ref={nodeRef} className="w-20 h-20 flex items-center justify-center rounded-full border-2">
                    <h1>{title}</h1>
                </div>
            </Draggable>
        </>
    );
}