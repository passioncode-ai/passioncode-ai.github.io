#!/bin/sh
# Web encodes of a master delivered by our media pipeline (home video v2). Usage: webenc2.sh MASTER OUT_PREFIX POSTER_SECONDS
# W10's webenc.sh with a stereo track (the music bed) and CRF picked for an ~86-90 s cut under the 8 MB page budget.
# Derived files only: the master and its delivery manifest stay the provenance.
set -eu
M="$1"; O="$2"; P="$3"
ffmpeg -hide_banner -loglevel error -y -i "$M" -map 0:v:0 -map 0:a:0 -c:v libx264 -profile:v high -level 4.0 -pix_fmt yuv420p -preset slow -crf 28 -tune animation -g 60 -c:a aac -b:a 112k -ac 2 -ar 48000 -map_metadata -1 -movflags +faststart "$O.mp4"
ffmpeg -hide_banner -loglevel error -y -i "$M" -map 0:v:0 -map 0:a:0 -c:v libvpx-vp9 -b:v 0 -crf 40 -row-mt 1 -deadline good -cpu-used 4 -g 120 -pix_fmt yuv420p -c:a libopus -b:a 80k -ac 2 -map_metadata -1 "$O.webm"
ffmpeg -hide_banner -loglevel error -y -ss "$P" -i "$M" -frames:v 1 -q:v 4 -map_metadata -1 "$O.jpg"
ls -l "$O.mp4" "$O.webm" "$O.jpg"
