#!/usr/bin/env node

const gi = require('node-gtk')
Gtk = gi.require('Gtk', '3.0')
 
gi.startLoop()
Gtk.init()
 
const win = new Gtk.Window();
win.on('destroy', () => Gtk.mainQuit())
win.on('delete-event', () => false)
 
win.setDefaultSize.call(win, 200, 80)
win.add.call(win, new Gtk.Label({ label: 'Hello Gtk+' }))
 
win.showAll();
Gtk.main();
