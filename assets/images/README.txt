Put your images in this folder using these exact file names.
Until a file exists, the site shows a placeholder instead.

hero-portrait.jpg              Your portrait for the top of the page (tall, about 900 x 1200)
about-workspace.jpg            Photo of you or your desk for the About section (about 800 x 1000)

Project pictures: one combined picture per card (several real screens of the app in one image), saved as WebP.
Cards alternate wide / narrow, so each picture must be EXACTLY this size or it gets cropped:
  wide cards   (1st, 4th, 5th, 8th ...)   1900 x 1000
  narrow cards (2nd, 3rd, 6th, 7th ...)   1600 x 1200
If you change the order of the projects, a card can switch shape, and its picture has to be remade.

project-boq-filler.webp        1  BOQ Filler: main window + "PDF converted" + "Finished" dialogs       (wide)
project-daily-strip.webp       2  Daily Strip app: Add expense, Home (dark), History phones           (narrow)
project-daily-strip-site.webp  3  Daily Strip website: desktop hero window + light mobile page        (narrow)
project-memostack.webp         4  MemoStack: Sign in, Home, Browse, Discuss phones                    (wide)
project-job-agent.webp         5  Internship Job Agent: Expired, All jobs, scored job cards           (wide)
project-design-library.webp    6  Design Library: Sources, Gallery, one saved design                  (narrow)

Hover clip: assets/video/daily-strip.mp4 (1200 x 900, same 4:3 shape as its card, muted, about 12 s).
It is cut from the Daily Strip walkthrough video and only plays on computers with a mouse.

og-preview.jpg                 Link preview card shown when the site is shared (1200 x 630). Made from the site's colours; replace if you like.
placeholder-screenshot.svg     "Screenshot coming soon" stand-in. Leave it here.

Adding a new project? Save its picture here at the size its card position needs (see above) and set
"image" in js/data/projects.js to "assets/images/your-file-name.webp". Only if you can't make it the
exact size, add fit: "whole" so it's shown in full instead of cropped.
Tip: convert to WebP and compress (for example with squoosh.app) to under about 200 KB each so the site loads fast.
