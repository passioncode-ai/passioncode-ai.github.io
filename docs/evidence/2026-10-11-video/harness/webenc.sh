#!/bin/sh
# Web encodes of a master delivered by our media pipeline (SITE-028 W10). Usage: webenc.sh MASTER OUT_PREFIX POSTER_SECONDS
# Derived files only: the master and its delivery manifest stay the provenance.
set -eu
M="$1"; O="$2"; P="$3"
ffmpeg -hide_banner -loglevel error -y -i "$M" -map 0:v:0 -map 0:a:0 -c:v libx264 -profile:v high -level 4.0 -pix_fmt yuv420p -preset slow -crf 26 -tune stillimage -g 60 -c:a aac -b:a 96k -ac 1 -ar 48000 -map_metadata -1 -movflags +faststart "$O.mp4"
ffmpeg -hide_banner -loglevel error -y -i "$M" -map 0:v:0 -map 0:a:0 -c:v libvpx-vp9 -b:v 0 -crf 38 -row-mt 1 -deadline good -cpu-used 4 -g 120 -pix_fmt yuv420p -c:a libopus -b:a 64k -ac 1 -map_metadata -1 "$O.webm"
ffmpeg -hide_banner -loglevel error -y -ss "$P" -i "$M" -frames:v 1 -q:v 4 -map_metadata -1 "$O.jpg"
ls -l "$O.mp4" "$O.webm" "$O.jpg"
