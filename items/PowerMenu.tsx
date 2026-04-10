import { execAsync } from "ags/process"
import { click_cursor } from "../bars/const"

export default function PowerMenu() {
    return (
        <button cursor={click_cursor} class={"items"} onClicked={() => {execAsync(["wlogout"])}}><box class={"xxx tray"}><label label={"󰤆"} /></box></button>
    )
}