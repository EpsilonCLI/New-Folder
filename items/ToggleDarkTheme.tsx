import { execAsync } from "ags/process"
import { click_cursor } from "../bars/const"

var darktheme = false

export default function ToggleDarkTheme() {
  
  return (
    <button cursor={click_cursor} class={"items"} onClicked={toggleDT}><box class={"xxx cpu"}><label label={"D"} /></box></button>
  )
}

function toggleDT() {
  
  if(darktheme){
    execAsync(["bash","-c","niri msg action do-screen-transition --delay-ms 250 && dconf write /org/gnome/desktop/interface/color-scheme \"'default'\" && gsettings set org.gnome.desktop.interface gtk-theme 'adw-gtk3'"])
    darktheme = false
  }else{
    execAsync(["bash","-c","niri msg action do-screen-transition --delay-ms 250 && dconf write /org/gnome/desktop/interface/color-scheme \"'prefer-dark'\" && gsettings set org.gnome.desktop.interface gtk-theme 'adw-gtk3-dark'"])
    darktheme = true
  }
}