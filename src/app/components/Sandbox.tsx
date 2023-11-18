"use client";

import { useEffect, useState } from "react";
import { TreeNode } from "./TreeNode";

export type TreeNode = {
    id: number;
    title: string;
    connected: boolean;
    x: number;
    y: number;
}

type SandboxProps = {
    nodes: TreeNode[];
    triggerDelete: Function;
    tool: string;
    setPosition: Function;
    addNode: Function;
    connectNode: Function;
}


export const Sandbox = ({ nodes, addNode, connectNode, triggerDelete, setPosition, tool }: SandboxProps) => {

    // useEffect(() => {
    //     nodes.forEach(node => {
    //         setPosition(node);
    //     })
    // }, [])

    

    return (
        <>
            <div 
                onClick={() => {
                    if (tool === "add") addNode();
                }} 
                id="sandbox" 
                className="h-full w-full relative"
            >
                {nodes.map((node, index) => (
                    <TreeNode 
                        key={index} 
                        title={node.title}
                        id={node.id}
                        position={{ x: node.x, y: node.y }}
                        setPosition={setPosition}
                        className={tool === "remove" ? "hover:border-red-500 hover:text-red-600" : ""}
                        onClick={(e) => {
                            if (tool === "remove") {
                                e.stopPropagation();
                                e.preventDefault();
                                triggerDelete(node.id);
                            }
                            if (tool === "connect") {
                                connectNode(node.id);
                            }
                        }}
                    />
                ))}
            </div>
        </>
    );
}