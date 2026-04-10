import { With, Accessor } from "ags"
import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { createPoll } from "ags/time"
import { createBinding, createState, For } from "gnim"
import { subprocess, exec, execAsync, createSubprocess } from "ags/process"

import Pango from 'gi://Pango'

import {window_title, cavaValue, cpuusage, mem} from "../bars/const" 

export function WindowTitle() {
    return (
        <label label={window_title(a => a==null?"":a)}  class={"window_title"} ellipsize={Pango.EllipsizeMode.END} maxWidthChars={60} />
    )
}

export function Lcava() {
    return (
        <label label={cavaValue(a => a[0].join(""))} class={"cava"} />
    )
}

export function Rcava() {
    return (
        <label label={cavaValue(a => a[1].join(""))} class={"cava"} />
    )
}

export function CpuUsage() {
    return (
        <button class={"items"}><box class={"xxx cpu"}><label label={cpuusage} /></box></button>
    )
}

export function Mem() {
    return (
        <button class={"items"}><box class={"xxx mem"}><label label={mem} /></box></button>
    )
}