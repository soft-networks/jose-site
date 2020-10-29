## josemiguel.virtualcarelab.com

This Github repo powers the website [josemiguel.virtualcarelab.com](josemiguel.virtualcarelab.com). This website is built by, for and with José Miguel, an artist and rapper, in collaboration with virtual care lab, bhavik, his attorney Daniela, and many other friends. Please visit the website to learn mre, and explore his work.

All the music, lyrics, images, and content on this website are courtesy of José Miguel.

## how it works

The website is built in Gatsby.

- The CMS for the content is powered by JSON (`data/pieces/pieceData.json`) and gatsby-source-filesystem (content lives in `data/`)
- Pages are dynamically generated for each piece (song) powered by the CMS
- Additionally pages exist, in `/src/pages`
- The responses / response form are powered by Firebase Real time database

## running it locally

If you'd like to run this locally, please reach out to bhavik. The repo should work with all the usual gatsby stuff, but gatsby-config has been removed (because it contains firebase secret info)

Thanks!
