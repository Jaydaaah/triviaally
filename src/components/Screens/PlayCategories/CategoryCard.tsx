import { CgArrowLongRight } from "react-icons/cg";
import { Suspense, useMemo, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import DifficultyModal from "./DifficultyModal";
import { motion } from "framer-motion";

interface Props {
    src: string;
    name: string;
    description: string;
}
export default function CategoryCard({ src, name, description }: Props) {
    const [isClicked, setClicked] = useState(false);

    const dialogRef = useRef<HTMLDialogElement>(null);
    const { title, badge } = useMemo(() => {
        if (name.includes(":")) {
            const [badge, title] = name.split(":");
            return { title, badge };
        } else {
            return { title: name };
        }
    }, [name]);

    return (
        <>
            <motion.div
                className="card bg-base-100 shadow card-compact rounded-3xl"
                initial={{
                    scale: 1,
                }}
                whileTap={{
                    scale: 1.02
                }}>
                <figure className="flex-shrink-0 h-64">
                    <Suspense
                        fallback={
                            <div className="skeleton h-64 w-[400px]"></div>
                        }
                    >
                        <LazyLoadImage width={400} src={src} loading="lazy" />
                    </Suspense>
                </figure>
                <div className="card-body w-full">
                    <h2 className="card-title font-bold font-serif">{title}</h2>
                    {!!badge && <span className="badge">{badge}</span>}
                    <p className="text-sm text-ellipsis">{description}</p>

                    <div className="card-actions justify-end mt-5">
                        <button
                            className="btn btn-accent rounded-full flex"
                            onClick={() => {
                                dialogRef.current?.showModal();
                            }}
                            onTouchStart={() => setClicked(true)}
                            onTouchEnd={() => setClicked(false)}
                            onTouchCancel={() => setClicked(false)}
                            onMouseDown={() => setClicked(true)}
                            onMouseUp={() => setClicked(false)}
                        >
                            <span>Play Now</span>
                            <span className={`transition-all ${isClicked && "translate-x-2"}`}
                            >
                                <CgArrowLongRight />
                            </span>
                        </button>
                    </div>
                </div>
            </motion.div>

            <DifficultyModal dialogRef={dialogRef} category={name} />
        </>
    );
}
