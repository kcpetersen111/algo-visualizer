import { IconPlus, IconX, IconLine, IconPointer } from "@tabler/icons-react";

type ToolBarProps = {
    activateAdd: Function;
    removeNode: Function;
    connectNode: Function;
    selectNode: Function;
}

export const ToolBar = ({ activateAdd, removeNode, connectNode, selectNode }: ToolBarProps) => {
    return (
        <>
            <div className="flex flex-col h-full w-72 border-2">
                <button onClick={() => activateAdd()}>
                    <IconPlus />
                </button>
                <button onClick={() => {removeNode(); console.log('remove')}}>
                    <IconX />
                </button>
                <button onClick={() => {connectNode(); console.log('connect')}}>
                    <IconLine />
                </button>
                <button onClick={() => {selectNode(); console.log('select')}}>
                    <IconPointer />
                </button>
            </div>
        </>
    );
}
