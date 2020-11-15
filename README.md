# cc-api-solo

This was created during my time as a student at [Code Chrysalis](https://codechrysalis.io/)

# Introduction

You may know the real name or super name of the HERO.

# How to use APIs

## related Characters

APIs for Characters
|Method| API | Contents |
|:------ | :---------------------- | :---------------------------------------------- |
|GET|/characters | Get all characters information.|
|GET|/characters/:char | Get characters information by `char`.|
|GET|/characters/:char/appear | Get character information who appears films. (Not Impelemented) |
|POST|/characters/ | Create a new character information. |
|POST|/characters/:char/appear/:film | Create character information who appears `film`. (Not Impelemented) |
|PATCH|/characters/:char | Update a character inforamtion. |
|DELETE|/characters/:char | Delete a character information. |

## related Films

APIs for Films.
|Method| API | Contents |
|:------ | :---------------------- | :---------------------------------------------- |
|GET|/films | Get all films information.|
|GET|/films/:film | Get films information by `film`.|
|POST|/films/ | Create a new film information.|
|PATCH|/films/:film | Update a film information.|
|DELETE|/films/:film | Delete a film information|

## related Appear （Not Implemented ）

APIs for Appear.
|Method| API | Contents |
|:------ | :---------------------- | :---------------------------------------------- |
|GET|/appear/:search | Get films information who appeard by `:search`|
|POST|/appear | Create a new film information.|
|PATCH|/appear/:appearId | Update a appear information. (Not Implemented) |
|DELETE|/appear/:appearId | Delete a film information. (Not Implemented) |
