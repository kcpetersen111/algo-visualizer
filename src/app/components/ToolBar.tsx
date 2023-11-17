import { IconPlus } from "@tabler/icons-react";

type ToolBarProps = {
    addNode: Function;
}

export const ToolBar = ({ addNode }: ToolBarProps) => {
    return (
        <>
            <div className="flex flex-col h-full w-72 border-2">
                <button onClick={() => addNode("test")}>
                    <IconPlus />
                </button>
            </div>
        </>
    );
}