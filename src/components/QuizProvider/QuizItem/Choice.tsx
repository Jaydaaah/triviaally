import { motion } from "framer-motion";
import { ChangeEvent, Dispatch, SetStateAction, useCallback } from "react";

function decodeHtmlEntities(text: string) {
    const txt = document.createElement("textarea");
    txt.innerHTML = text;
    return txt.value;
}

interface Props {
    className?: string;
    selectedState: {
        selected: string;
        setSelected: Dispatch<SetStateAction<string>>;
    };
    children: string;
    correct?: string;
}

export default function Choice({
    selectedState,
    className,
    children,
    correct,
}: Props) {
    const { selected, setSelected } = selectedState;

    const SetOnceOnChangeHandler = useCallback(
        ({ target }: ChangeEvent<HTMLInputElement>) => {
            if (!selected) {
                setSelected(target.value);
            }
        },
        [selected, setSelected]
    );

    return (
        <div
            className={`card shadow p-0 border-2 border-neutral w-full h-32 overflow-hidden transition-all duration-50 ease-out relative ${
                !selected && "cursor-pointer active:scale-95"
            }`}
        >
            <label
                className={`flex-grow label p-4 ${className} flex justify-center`}
            >
                <span className="label-text text-lg md:text-2xl">
                    {decodeHtmlEntities(children)}
                </span>
                <input
                    className="radio hidden"
                    type="radio"
                    name="quizchoice"
                    value={children}
                    onChange={SetOnceOnChangeHandler}
                    checked={selected == children}
                />
            </label>

            {!!selected && (
                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.5,
                        borderRadius: "100%"
                    }}
                    animate={{
                        opacity: 0.5,
                        scale: 1,
                        borderRadius: 0
                    }}
                    transition={{
                        duration: 0.1
                    }}
                    className={`absolute w-full h-full z-30 border-2 ${
                                  children == correct
                                      ? "bg-green-500 border-green-500"
                                      : selected == children
                                      ? "bg-red-500 border-red-500"
                                      : "bg-transparent"
                              }`}
                />
            )}
        </div>
    );
}
