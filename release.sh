
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore quezx-mobileapps.keystore "C:/Users/sif/projects/github.com/nayanika10/manage-mobile/platforms/android/build/outputs/apk/android-release-unsigned.apk" Quezxmobileapps

zipalign -v 4 "C:/Users/sif/projects/github.com/nayanika10/manage-mobile/platforms/android/build/outputs/apk/android-release-unsigned.apk" quezx.apk
pause
