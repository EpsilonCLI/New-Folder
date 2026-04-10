import { Accessor } from "ags"
import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { execAsync } from "ags/process"

import Workspaces from "../items/Workspaces" 
import AudioOutput from "../items/AudioOutput"
import Time from "../items/Time"
import Tray from "../items/Tray"
import Battery from "../items/Battery"
import ToggleDarkTheme from "../items/ToggleDarkTheme"
import PowerMenu from "../items/PowerMenu"
import { WindowTitle, Lcava, Rcava, CpuUsage, Mem } from "../items/other_items"

import { is_overview } from "./const"

execAsync(["bash","-c","dconf write /org/gnome/desktop/interface/color-scheme \"'default'\""])

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor
  
  return (
    <window
      visible
      name="bar"
      class="bar"
      css={is_overview(a => a?"background-color: #222":"")}
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={app}
      height_request={26}
      default_height={26}
    >

      <centerbox cssName="centerbox">
        <box spacing={8} class="Hypr" $type="start" >
          <Workspaces />
          <WindowTitle />
        </box>
        
        <box spacing={2} $type="center" hexpand halign={Gtk.Align.CENTER}>
          <Lcava />
          <Time />
          <Rcava />
        </box>

        <box $type="end" spacing={2}>
          <Tray />
          <CpuUsage />
          <Mem />
          <AudioOutput />
          <ToggleDarkTheme />
          <Battery />
          <PowerMenu />
        </box>
      </centerbox>
      
    </window>
    
  )
}
