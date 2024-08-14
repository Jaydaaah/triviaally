import { ReactNode, useCallback, useState } from "react";
import { ScreenContext } from "./ScreenContext";

interface Prop {
    header?: ReactNode;
    children: ReactNode[];
    footer?: ReactNode;
    hasExtraGap?: boolean;
}

export default function ScreenManagerProvider({
    header,
    children,
    footer,
    hasExtraGap,
}: Prop) {
    const [screen, _setScreenIndex] = useState(0);

    if (hasExtraGap == undefined) {
        hasExtraGap = true;
    }

    const setScreen = useCallback(
        (index: number) => {
            if (index >= -1 && index < children.length) {
                _setScreenIndex(index);
            }
        },
        [children]
    );

    return (
        <ScreenContext.Provider value={{ screen, setScreen }}>
            {header}
            <div className="flex flex-col flex-grow">{children[screen]}</div>
            {hasExtraGap && <div className="h-20 w-1 flex-shrink-0"></div>}
            {footer}
        </ScreenContext.Provider>
    );
}
