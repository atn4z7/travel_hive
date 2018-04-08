# Travel Hive

# Openshift manual server build

## Before starting:
 This build process needs to be done in a branch off master. The temporary branch will be discarded after build process is complete.

## Scope:
 Basic build process as it currently exists for Openshift platform. Other deployments on different platform, maybe available in the future. This is a simplistic process flow, other details on initial setup have been left out. Please see below link for a tutorial on the basics of setting up a server and database on Openshift.
 - [Openshift - beyond the basics](https://docs.openshift.com/online/getting_started/beyond_the_basics.html)

## Background:
 Although you can setup a automatic build process through webhooks, you need access to the repositories settings. If you don't have access to settings to setup a webhook a somewhat manual build process is necessary. This a simplistic build with no CI/CD process. Git's subtree method allows you to only push the build folder up to a branch so your not clouding your build distribution with alot of unecessary development files.
- [Git Subtree Example](https://gist.github.com/cobyism/4730490)
- [Openshift website](https://www.openshift.com/)
  ## Instructions :
    1) Create a local branch off master called `openshift_server_deploy'.and switch to it. The easiest way to do this in the cli is `git checkout -b openshift_server_deploy`, while on the master branch.

    2) `npm run build:server `
    this will create a build folder in the root directory with a serverDist folder inside containing the base build files for the server.
    
    3) On the `openshift_server_deploy` branch you will see the same folders that the build process created, plus two addition files in the root directory. 
       - `package.json` <- This has the base dependencies for the server build only, not the entire project. Plus a simple start script for Openshift to trigger. This was generated manually, it would be nice to derive this file from the project's package.json file instead of manually creating it.
       
       - `.babelrc` <- The server was written in es5/es6 syntax, so a babel plugin was required to handle the async functions in the server. That's why this babel config file is necessary. 
       
            *^The above files are considered static and not necessary to change unless the server dependencies change.*

    4) Before running the below npm command triggering the substree push you have to remove the build folder temporarily from the .gitignore file.

    5) After setting up the necessary build files and removing the build folder from .gitignore you can push the build to the `openshift_server_deploy` branch with the following command, while in the root directory of the project.
      - `npm run server:openshift:deploy`
      
    6)   After pushing the build files you can manually trigger a build by logging in the console, or using the command line tool. Use of these tools are beyond the scope of this document.
    
    7) Add the build folder back to .gitignore.

    * This is not a optimal process and will need to be refined in the future. For now it works, if your careful. :)*