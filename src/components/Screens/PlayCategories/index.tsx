import { motion } from "framer-motion";
import { Categories } from "../../../api/OpenTrivia/OpenTrivia.info.json";
import ScreenTemplate from "../ScreenTemplate";
import CategoryCard from "./CategoryCard";

export default function PlayCategories() {
    return (
        <ScreenTemplate title="Categories">
            <div className="flex-grow gap-4 flex flex-wrap justify-center items-center p-4">
                {Categories.map(({ name, src, description }) => (
                    <motion.div
                        key={name}
                        initial={{
                            scale: 0.5
                        }}
                        whileInView={{
                            scale: 1,
                        }}
                        transition={{
                            duration: 0.2
                        }}
                        viewport={{ once: true }}
                    >
                        <CategoryCard
                            name={name}
                            src={src}
                            description={description}
                        />
                    </motion.div>
                ))}
            </div>
        </ScreenTemplate>
    );
}
