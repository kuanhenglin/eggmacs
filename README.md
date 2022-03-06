# Tabletop Map Creator
UCLA 22W CS 35L project for team "Eggmacs" (Joice, Jordan, Kay, Meghana, Sean).

## Introduction
This project is an implementation of the T-Eggletop Map Creator (TeMC), a webtool
that allows the user to create their own maps for Tabletop Role Playing Games (TTRPs)!
By creating a profile, users can create their own maps in the 'Creator' tab,
search for other users or their creations in the 'Search' tab, and adjust their
own user profile in the 'Profile' tab!  

## Design & Implementation
TeMC is created using React and Node.js, with a backend database that utilizes
MongoDB. *Remember to add info about our hosting platform here!*

#### Frontend
A large portion of TeMC is the frontend code, implemented within /client/src .
Within this, the code is organized into **components**, **methods**, and **pages**.

###### Components
[Components](https://github.com/kuanhenglin/eggmacs/tree/main/client/src/components)
are modules that include visual React *components*, such as the templates
for forms (profile updates, for example) and templates for the search results.  This
is to provide visual clarity in the react implementation, and simplify the creation
of the website visuals.

###### Methods
[Methods](https://github.com/kuanhenglin/eggmacs/tree/main/client/src/methods)
are the 'connecting routines' for the website; these are what the frontend
uses to connect with the backend code, and ultimately fetch data from MongoDB

###### Pages
[Pages](https://github.com/kuanhenglin/eggmacs/tree/main/client/src/pages)
are the visualization of each individual component of TeMC.  These are
implemented using *methods* and *components*, along with supplemental code.
If App.js is the heart of the website, these are the limbs, with each website
page being divided into its own file here!

#### Backend
Located within [/server/routes](https://github.com/kuanhenglin/eggmacs/tree/main/server/routes), 
the backend of TeMC is what connects the websiteto our remote database! 
In order to simplify implementation and the expansion of
features, every item within our database can be described as an **Object**.
Many objects share characteristics, such as an _id: because many of the Objects
share qualities, algorithms such as those in the search and fetch routines are
able to handle a variety of components (e.g, users, maps, and visual assets)

## Team Info
**[Joice](https://github.com/Jomeimei)**
**[Jordan](https://github.com/kuanhenglin)**
**[Kay](https://github.com/the-bay-kay)**
**[Meghana](https://github.com/mvchfvn)**
**[Sean](https://github.com/shalphan)**


*README written by the-bay-kay!*