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
    removable: boolean;
    setPosition: Function;
}


export const Sandbox = ({ nodes, triggerDelete, setPosition, removable }: SandboxProps) => {

    // useEffect(() => {
    //     nodes.forEach(node => {
    //         setPosition(node);
    //     })
    // }, [])

    

    return (
        <>
            <div id="sandbox" className="h-full w-full relative">
                {nodes.map((node, index) => (
                    <TreeNode 
                        key={index} 
                        title={node.title}
                        id={node.id}
                        position={{ x: node.x, y: node.y }}
                        setPosition={setPosition}
                        className={removable ? "hover:border-red-500 hover:text-red-600" : ""}
                        onClick={(e) => {
                            if (removable) {
                                e.stopPropagation();
                                e.preventDefault();
                                triggerDelete(node.id);
                            }
                        }}
                    />
                ))}
            </div>
        </>
    );
}