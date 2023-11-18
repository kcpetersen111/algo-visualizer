"use client";

import { useEffect, useState } from "react";
import { TreeNode } from "./TreeNode";
import Xarrow, { Xwrapper } from "react-xarrows";

export type TreeNode = {
    id: number;
    title: string;
    connected: boolean;
    x: number;
    y: number;
}

export type Connection = {
    from: number;
    to: number;
}

type SandboxProps = {
    nodes: TreeNode[];
    triggerDelete: Function;
    tool: string;
    setPosition: Function;
    addNode: Function;
    connectNode: Function;
    connections: Connection[];
}

type Connecting = {
    ids: number[];
}


export const Sandbox = ({ nodes, addNode, connectNode, connections, triggerDelete, setPosition, tool }: SandboxProps) => {

    const [connecting, setConnecting] = useState<Connecting>({} as Connecting);

    return (
        <>
            <div 
                onClick={() => {
                    if (tool === "add") addNode();
                }} 
                id="sandbox" 
                className="h-full w-full relative"
            >
                {connections.map((conn, index) => (                        
                    <Xarrow key={index} showHead={true} start={conn.from.toString()} end={conn.to.toString()} />
                ))}
                {nodes.map((node, index) => (
                    <TreeNode 
                        key={index} 
                        title={node.title}
                        id={node.id}
                        position={{ x: node.x, y: node.y }}
                        setPosition={setPosition}
                        className={
                            (tool === "remove" ? "hover:border-red-500 hover:text-red-600" : "") + ((connecting.ids ? connecting.ids.includes(node.id) : false) ? "border-green-500 text-green-600" : "")
                        }
                        onClick={(e) => {
                            if (tool === "remove") {
                                e.stopPropagation();
                                e.preventDefault();
                                triggerDelete(node.id);
                            }
                            if (tool === "connect") {
                                if (connecting.ids ? connecting.ids.includes(node.id) : false) {
                                    connectNode(-1);
                                    setConnecting({} as Connecting);
                                } else {
                                    connectNode(node.id);
                                    if (connecting.ids)
                                        setConnecting({ ids: [...connecting.ids, node.id] });
                                    else setConnecting({ ids: [node.id]});
                                }
                            }
                        }}
                    />
                ))}
            </div>
        </>
    );
}