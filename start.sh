#!/bin/bash
while true; do
    cd /home/z/my-project
    npx serve out -l 3000 -s 2>/tmp/next-server.log
    echo "Server died, restarting in 2s..." >> /tmp/next-server.log
    sleep 2
done
