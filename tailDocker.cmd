@echo off
title DOCKER TAIL
cmd /k powershell.exe -noexit "& Get-Content c:/usr/share/filebeat/docker_output.txt -Wait -Tail 30"