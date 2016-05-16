# F8 App 2016

This is the entire source code of the official [F8](https://fbf8.com/) app of 2016, available on [Google Play](https://play.google.com/store/apps/details?id=com.facebook.f8) and the [App Store](https://itunes.apple.com/us/app/f8/id853467066).

<img src=".github/screenshot-app@2x.png" width="800">

## How We Build It

We've created a series of tutorials at [makeitopen.com](http://makeitopen.com/) that explain how we built the app, and that dive into how we used React Native, Redux, Relay, GraphQL, and more.

## Requirements

1. [React Native](http://facebook.github.io/react-native/docs/getting-started.html) (follow iOS and Android guides)
  - Xcode 7.3 +
2. [CocoaPods](http://cocoapods.org) (only for iOS)
  - Version 1.0+ recommended (`gem install cocoapods --pre`)
3. [MongoDB](https://www.mongodb.org/downloads) (needed to run Parse Server locally)

## Setup

1. **Clone the repo**

  ```
  $ git clone https://github.com/fbsamples/f8app.git
  $ cd f8app
  ```

2. **Install dependencies** (npm v3+):

  ```
  $ npm install
  $ (cd ios; pod install)        # only for iOS version
  ```

3. **Make sure MongoDB is running:**

  ```
  $ lsof -iTCP:27017 -sTCP:LISTEN
  ```

  NOTE: if installed with [Homebrew](http://brew.sh/) run `brew info mongo` and
  check out the Caveats section.

  If you prefer to use an external MongoDB server, set `DATABASE_URI`:

  ```
  $ export DATABASE_URI=mongodb://example-mongo-hosting.com:1337/my-awesome-database
  ```

4. **Start Parse/GraphQL servers:**

  ```
  $ npm start
  ```

5. **Import sample data** (the local Parse Server should be running):

  ```
  $ npm run import-data
  ```

  Make sure everything works by visiting:

  * Parse Dashboard: [http://localhost:8080/dashboard](http://localhost:8080/dashboard)
  * Graph*i*QL: [http://localhost:8080/graphql](http://localhost:8080/graphql?query=query+%7B%0A++schedule+%7B%0A++++title%0A++++speakers+%7B%0A++++++name%0A++++++title%0A++++%7D%0A++++location+%7B%0A++++++name%0A++++%7D%0A++%7D%0A%7D)

  <img src=".github/screenshot-server@2x.png" width="800">


6. **Running on Android**:

  ```
  $ react-native run-android
  $ adb reverse tcp:8081 tcp:8081   # required to ensure the Android app can
  $ adb reverse tcp:8080 tcp:8080   # access the Packager and GraphQL server
  ```


7. **Running on iOS:**

  ```
  $ react-native run-ios
  ```


--------------------------

# Running on android (Arch Linux)

```sh
# open android folder in android-studio to install graddle

nvm use 5
npm uninstall -g react-native
npm install -g react-native-cli

# start local Mongo
sudo systemctl restart mongodb.service
# OR use mongo with azk (FIXME)
# export DATABASE_URI=mongodb://f8app-mongodb.dev.azk.io:80/my-awesome-database
# azk restart -Rvv

# start servers
npm install
npm start

# load sample data
npm run import-data

# emulator
genymotion
# OR ~/Android/Sdk/tools/emulator -netdelay none -netspeed full -avd Nexus_6_API_23
# OR plug your phone

# adb reverse
adb reverse tcp:8080 tcp:8080 && adb reverse tcp:8081 tcp:8081

# react native JS server
echo 256 | sudo tee -a /proc/sys/fs/inotify/max_user_instances
echo 32768 | sudo tee -a /proc/sys/fs/inotify/max_queued_events
echo 65536 | sudo tee -a /proc/sys/fs/inotify/max_user_watches
watchman shutdown-server
react-native start

# install app on device
react-native run-android
```

# Running on android (Windows)

```sh
# open android folder in android-studio to install graddle

# start local Mongo
"C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe"

# start servers
npm install
npm start

# load sample data
npm run import-data

# start an emulator at least with "Android 5"
# Open VSemulator
# Open genymotion
# OR plug your phone

# adb reverse
adb reverse tcp:8080 tcp:8080 && adb reverse tcp:8081 tcp:8081

# react native JS server
react-native start

# install app on device
react-native run-android

# next time just run:
"C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe"
windows-start.bat
```
