import useTheme from "../../../context/Theme/hooks/useTheme";

const ThemeList = ["cupcake", "emerald", "valentine", "pastel", "nord", "dark"];

interface Props {
    className?: string;
}

export default function ThemeSelector({ className }: Props) {
    const {theme, setTheme} = useTheme();

    return (
        <select
            className={`select select-primary select-bordered w-full max-w-xs ${className}`}
            defaultValue={theme}
            onChange={({target}) => {
                const value = target.value;
                if (ThemeList.includes(value)) {
                    setTheme(value);
                }
            }}
        >
            <option disabled>Select Theme</option>
            {ThemeList.map((themeName) => (
                <option key={themeName}>{themeName}</option>
            ))}
        </select>
    );
}
