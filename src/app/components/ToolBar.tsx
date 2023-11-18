import { IconPlus, IconX, IconLine, IconPointer, IconPlayerTrackNext } from "@tabler/icons-react";

type ToolBarProps = {
    activateAdd: Function;
    removeNode: Function;
    activateConnect: Function;
    selectNode: Function;
    nextNode: Function;
}

export const ToolBar = ({ activateAdd, removeNode, connectNode, selectNode, nextNode }: ToolBarProps) => {
    return (
        <>
            <div className="flex flex-col h-full w-72 border-2">
                <button onClick={() => activateAdd()}>
                    <IconPlus />
                </button>
                <button onClick={() => {removeNode(); console.log('remove')}}>
                    <IconX />
                </button>
                <button onClick={() => {activateConnect(); console.log('connect')}}>
                    <IconLine />
                </button>
                <button onClick={() => {selectNode(); console.log('select')}}>
                    <IconPointer />
                </button>
                <button onClick={() => {nextNode(); console.log('next')}}>
                    <IconPlayerTrackNext />
                </button>
            </div>
        </>
    );
}
