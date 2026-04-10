import { Accessor } from "ags"
import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { execAsync } from "ags/process"
import { createBinding, createComputed, createState, For } from "gnim"

import {  } from "../items/other_items"
import {appsbar, niri, click_cursor, is_overview, window_title} from "../bars/const" 

import Pango from 'gi://Pango'

export default function Left(gdkmonitor: Gdk.Monitor) {
  const { LEFT } = Astal.WindowAnchor
  var [isActivate, set_isActivate] = createState(false)
  const isActivate2 = createComputed(() => {
    return (isActivate() || (window_title()==null))
  })
  return (
    <window
      visible
      name="bar"
      class={"left-bar"}
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.IGNORE}
      anchor={ LEFT }
      application={app}
      marginLeft={isActivate2(a => a?0:-83)}
      default_height={-1}
      namespace={"leftbar"}
    >
      <Gtk.EventControllerMotion onEnter={() => {set_isActivate(true)}} onLeave={() => {set_isActivate(false)}} />
      <box orientation={Gtk.Orientation.VERTICAL} valign={Gtk.Align.CENTER} halign={Gtk.Align.CENTER} spacing={10}>
        <box visible={false} orientation={Gtk.Orientation.VERTICAL} valign={Gtk.Align.CENTER}  halign={Gtk.Align.CENTER} spacing={10}>
          </box>

        <button onClicked={() => {execAsync(["firefox"])}}>
            <image iconName={"firefox-esr"} pixelSize={64} />
        </button>
        <button onClicked={() => {execAsync(["thunar"])}}>
            <image iconName={"thunar"} pixelSize={64} />
        </button>
        <button onClicked={() => {execAsync(["xfce4-terminal"])}}>
            <image iconName={"xfce4-terminal"} pixelSize={64} />
        </button>
        <button onClicked={() => {execAsync(["bash", "-c", "rofi -display-drun ''  -show drun -modi drun -show-icons -no-config -theme ~/.config/i3/rofi/appmenu.rasi"])}}>
            <image iconName={"view-app-grid-symbolic"} pixelSize={64} />
        </button>
      </box>
    </window>
    
  )
}


