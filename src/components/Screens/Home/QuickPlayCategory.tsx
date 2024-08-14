import { motion } from "framer-motion";
import { useRef, useMemo, Suspense, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import DifficultyModal from "../PlayCategories/DifficultyModal";

// Icons
import { MdArrowForwardIos } from "react-icons/md";

interface Props {
    currentIndex?: number;
    index: number;
    description: string;
    name: string;
    src: string;
}

export default function QuickPlayCategory({ index, currentIndex, description, name, src }: Props) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (index == currentIndex) {
            divRef.current?.scrollIntoView({behavior: "smooth"});
        }
    }, [index, currentIndex]);

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
                ref={divRef}
                className="w-full card bg-base-100 card-side"
                key={name}
                initial={{
                    scale: 1,
                }}
                whileHover={{
                    scale: 1.01,
                }}
                whileTap={{
                    scale: 1.03,
                }}
                transition={{
                    duration: 0.2
                }}
                
                onClick={() => dialogRef.current?.showModal()}
            >
                <figure className="flex-shrink-0 w-36 sm:w-40 lg:w-52 h-full overflow-hidden">
                    <Suspense
                        fallback={
                            <div className="skeleton h-full w-[100px]"></div>
                        }
                    >
                        <LazyLoadImage
                            src={`/triviaally/${src}`}
                            loading="lazy"
                            draggable={false}
                            className="object-cover w-full h-full"
                        />
                    </Suspense>
                </figure>
                <div className="card-body select-none">
                    <div className="card-title md:text-2xl">
                        {title}
                    </div>
                    {!!badge && <span className="badge">{badge}</span>}
                    <p className="text-sm text-ellipsis hidden sm:block">{description}</p>
                </div>
                <div className="card-actions items-center m-4 opacity-25">
                    <span>
                        <MdArrowForwardIos />
                    </span>
                </div>
            </motion.div>

            <DifficultyModal dialogRef={dialogRef} category={name} />
        </>
    );
}