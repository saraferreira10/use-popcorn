import Box from "../box/Box";
import "../menu/menu.css";

export default function Menu({ children }) {
    return (
        <header>
            <Box width="100%" height="60px" bgColor="#8A2BE2" justifyContent="space-between">
                <Logo />
                {children}
            </Box>
        </header>
    )
}

function Logo() {
    return <h1 style={{ fontSize: "1rem" }}>🍿 usePopcorn</h1>
}
