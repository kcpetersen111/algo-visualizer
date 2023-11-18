import { IconMoon, IconSun } from "@tabler/icons-react";
import { MouseEventHandler } from "react";

type DarkModeToggleProps = {
    dark: boolean;
    onClick: MouseEventHandler;
}
export const DarkModeToggle = ({ dark, onClick }: DarkModeToggleProps) => {
    return (
        <>
            <div onClick={onClick} className={`flex ${dark ? "flex-row" : "flex-row-reverse"} items-center w-fit h-fit p-1 rounded-full border-2`}>
                <div className="flex flex-row">
                    <IconMoon className="mr-3" />
                    {dark && <IconSun />}
                    <div className={`${dark ? "absolute" : ""} h-6 w-6 rounded-full bg-slate-950 dark:bg-white`} />
                </div>
            </div>
        </>
    );
}