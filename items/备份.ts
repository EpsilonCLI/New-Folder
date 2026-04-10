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

import {window_title, time} from "../bars/const" 
import Workspaces from "../items/Workspaces" 