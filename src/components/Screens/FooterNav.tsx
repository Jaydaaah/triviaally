
// Icons
import { FaHome } from "react-icons/fa";
import { FaCrown } from "react-icons/fa";
import { FaGamepad } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import { FooterNavTabBtn } from "./FooterNavTabBtn";

export default function FooterNav() {
    return (
        <div className="fixed bottom-0 left-0 w-screen flex justify-center p-4 px-10">
            <div className="btm-nav md:w-[40rem] static rounded-btn overflow-clip shadow-xl z-10 bg-neutral text-neutral-content">
                <FooterNavTabBtn index={0}>
                    <FaHome />
                </FooterNavTabBtn>
                <FooterNavTabBtn index={1}>
                    <FaCrown />
                </FooterNavTabBtn>
                <FooterNavTabBtn index={2}>
                    <FaGamepad />
                </FooterNavTabBtn>
                <FooterNavTabBtn index={3}>
                    <BsPersonCircle />
                </FooterNavTabBtn>
            </div>
        </div>
    );
}
