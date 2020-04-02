#!/home/kuba/projects/jcubic/lips/bin/lips.js

(define gi (require "node-gtk"))

(define Gtk (gi.require "Gtk" "3.0"))

(gi.startLoop)
(Gtk.init)

(define win (new Gtk.Window))
(win.on "destroy" (lambda () (Gtk.mainQuit)))
(win.on "delete-event" (lambda () false))
(win.setDefaultSize 400 200)

(define label (new Gtk.Label (make-object :label "Hello Scheme GTK+")))

(win.add label)
(display label.label)

(win.showAll)
(Gtk.main)
