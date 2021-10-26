@echo off
title REST AUTOMATION
cmd /k mvn clean test -Dsurefire.suiteXmlFiles=testng.xml