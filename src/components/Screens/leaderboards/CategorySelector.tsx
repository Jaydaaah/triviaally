import { ChangeEvent, useCallback } from "react";
import { useScreenManager } from "../context/useScreenManager";

interface props {
    children?: string[];
}

export default function CategorySelector({ children }: props) {
    const { setScreen } = useScreenManager();

    const selectOnChangeHandler = useCallback(
        ({ target }: ChangeEvent<HTMLSelectElement>) => {
            const category = target.value;
            if (children) {
                const index = children.indexOf(category);
                if (index >= 0) {
                    setScreen(index);
                }
            }
        },
        [setScreen, children]
    );

    return (
        <>
            <select
                className="self-center m-4 select select-md select-bordered w-full max-w-xs"
                onChange={selectOnChangeHandler}
            >
                <option disabled>
                    Select Category
                </option>
                {children?.map((item) => (
                    <option key={item}>{item}</option>
                ))}
            </select>
        </>
    );
}
