"use client";

import Draggable from "react-draggable";

export const Sandbox = () => {
    return (
        <>
            <div className="h-screen w-screen">
                <Draggable bounds="parent">
                    <p className="w-fit">test this draggable text</p>
                </Draggable>
            </div>
        </>
    );
}