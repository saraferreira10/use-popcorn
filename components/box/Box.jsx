export default function Box({
    height = "50px",
    width = "100px",
    bgColor = "#363636",
    children,
    flexDirection = "row",
    justifyContent = "center",
    alignItems = "center",
    gap = "1rem",
    padding = "1rem 2rem",
    minHeight = "0"
}) {

    const style = {
        height,
        width,
        backgroundColor: bgColor,
        borderRadius: "0.5rem",
        display: "flex",
        flexDirection: flexDirection,
        justifyContent,
        alignItems,
        gap,
        padding,
        minHeight
    }

    return (
        <div style={style}>
            {children}
        </div>
    )
}