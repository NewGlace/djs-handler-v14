# Handler Discord.Js V14

Handler for commands, interactions and events. easy-to-use and simple-to-setup.
*If you have errors, it is because you have not followed this great guide :)*

#
## Installation Guide

- **Node.js 16.9.0** or newer is required..

- `npm install` to Install Packages/dependencies.. 

- Please make sure to Invite your bot from discord.dev Oauth Section with application.commands scope! ([Learn more](https://discordjs.guide/interactions/registering-slash-commands.html#guild-commands))

- Update the bot setup in `./res/config.json`, inside you'll find `dev.token` & `master.token`, `dev.token` is the development version and `master.token` is the official version. If your using replit, I suggest you keep the empty string. 

- Update the help setup in `./res/help.json`, inside you'll find `category` & `igonre`. In `category` you will put the list of categories with their display name and an emoji to represent it, in `igonre` you will put the name of the categories you do not want to display in the help.

- `npm run build` to Build Typescript

- `npm run start` to Start the bot

- `npm run build:start` to build and start

- Note : In the commands interaction folder it is necessary to respect the paths: `category/command`, `category/command/subCommand`, `category/command/subCommandGroup/subCommand`, for the other interactions there is no specific path, please yourself ;)

#
## Caractéristiques

- **DevelopersOnly** system (*You can make commands "unusable" for users, but not for bot developers*)
- **Sub-Folders** (*Make as many folders as you want, just keep it clean*)
- **Dynamic help command** with select menu (*with the config `./res/help.json`*) 
- **Command help** (*Gives information about the command*)
- **Events Manager**
- **Interaction Permission** (*Manage user perms and bot perms for all interactions.*)
- **Handler all Interraction** (*Handles all types of interaction*)
- **Message OP Ready** (*When your bot is ready, it displays on the console...*).
- And more...

#
## Improvements
This Command Handler is still in **Beta**.
Any errors? Any problems? Any suggestions? Don't worry, contact me!   

- Discord User: `NewGlace 🧊#2408`
- Discord Server: [Join](https://discord.gg/6pnDcSs)
#
# Thanks for using this Handler <3.