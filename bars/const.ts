import { With, Accessor } from "ags"
import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { createPoll } from "ags/time"
import { createBinding, createState, For } from "gnim"
import { subprocess, exec, execAsync, createSubprocess } from "ags/process"

import AstalWp from "gi://AstalWp"
import AstalTray from "gi://AstalTray"
import AstalBattery from "gi://AstalBattery"
import AstalPowerProfiles from "gi://AstalPowerProfiles"
import AstalNetwork from "gi://AstalNetwork"
import AstalMpris from "gi://AstalMpris"
import AstalApps from "gi://AstalApps"
import Niri from "gi://AstalNiri"
import Cava from "gi://AstalCava"


import Gio from 'gi://Gio';
import Pango from 'gi://Pango'

//export const cava = createSubprocess("", "python3 /home/epsilon/.config/hypr/scripts/info-cava.py -f 30 -b 20 -e 384048 -c average")
export const cpuusage = createPoll("", 2000, "/home/epsilon/.config/ags/scripts/cpuusage1.sh")
export const mem = createPoll("", 2000, "/home/epsilon/.config/ags/scripts/mem.sh")
export const tray = AstalTray.get_default()
export const time = createPoll("", 1000, "date '+%Y年%m月%d日 %A %H:%M:%S'")

export const niri = Niri.get_default()
export const workspaces = createBinding(niri, "workspaces");
export const appsbar = createBinding(niri, "windows").as((a) => {
  a.sort((a,b) => {
    return a.layout.pos_in_scrolling_layout[0]>b.layout.pos_in_scrolling_layout[0]?1:-1
  })
  return a
})
export const window_title = createBinding(niri, "focused_window", "title")
//export const window_title = createSubprocess("", "/home/epsilon/.config/ags/scripts/title_name.sh").as((a) => {return a=="null"?"":a})
export const mpris = AstalMpris.get_default()
export const apps = new AstalApps.Application()
export const players = createBinding(mpris, "players")

export const click_cursor = new Gdk.Cursor({ name: "pointer" })

export const cava = new Cava.Cava()
cava.set_framerate(30)
cava.set_noise_reduction(0.6)
cava.set_stereo(true)
export const cavaBars = 20
cava.set_bars(cavaBars*2)
export const cavaValue = createBinding(cava, "values").as((a) => {
  const symbols = ['▁', '▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];
  const newArray = a.map(value => {
    value = Math.floor(value*8)
    return symbols[value];
  });
  const newArray2 = [newArray.slice(0,cavaBars-1),newArray.slice(cavaBars,cavaBars*2-1).reverse()]
  return newArray2
})


export const is_overview = createBinding(niri, "overview", "is_open")