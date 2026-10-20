SHADOW BOXING CLOCK - iPhone home-screen app

This folder is a web app. It needs to sit on any https web address once.
After that you install it from Safari and it runs full screen, offline.

1. HOST IT (free, one time)
   Upload every file in this folder, keeping the "icons" folder, to any
   static host. Two common free ones:
   - GitHub Pages: make a public repository, upload the files, then
     Settings > Pages > Deploy from branch > main > / (root).
   - Netlify: log in at app.netlify.com and drag this folder onto the
     "Deploy manually" area.
   You get an address like https://yourname.github.io/boxing-clock/

2. INSTALL ON IPHONE
   a. Open that address in Safari (not inside another app).
   b. Tap the Share button, then "Add to Home Screen", then "Add".
   c. Open it from the new "Boxing Clock" icon on your home screen.

3. FIRST RUN
   Open it once while online so the fonts are saved. After that it works
   with no signal. Tap "Test sound" before your first session.

UPDATING
   Replace the files on the host. If you change any file, also change
   CACHE = 'boxing-clock-v1' to v2 in sw.js so phones fetch the new copy.
