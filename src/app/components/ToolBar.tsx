import { IconPlus, IconX } from "@tabler/icons-react";

type ToolBarProps = {
    addNode: Function;
    removeNode: Function;
}

export const ToolBar = ({ addNode, removeNode }: ToolBarProps) => {
    return (
        <>
            <div className="flex flex-col h-full w-72 border-2">
                <button onClick={() => addNode()}>
                    <IconPlus />
                </button>
                <button onClick={() => {removeNode(); console.log('remove')}}>
                    <IconX />
                </button>
            </div>
        </>
    );
}