"use client";

import { TreeNode } from "./TreeNode";

type SandboxProps = {
    nodes: string[];
}

export const Sandbox = ({ nodes }: SandboxProps) => {

    return (
        <>
            <div className="h-full w-full relative">
                {nodes.map((node, index) => (
                    <TreeNode key={index} title={node} />
                ))}
            </div>
        </>
    );
}