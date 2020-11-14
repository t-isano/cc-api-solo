# cc-api-solo

This was created during my time as a student at [Code Chrysalis](https://codechrysalis.io/)

# Introduction

You may know the real name or super name of the HERO.

# How to use APIs

## related Characters

APIs for Characters
|Method| API | 内容 |
|:------ | :---------------------- | :---------------------------------------------- |
|GET|/characters | Get all characters information.|
|GET|/characters/:char | Get characters information by `char`.|
|GET|/characters/:char/appear | Get character information who appears films. (Not Impelemented) |
|POST|/characters/ | Create a new character information. |
|POST|/characters/:char/appear/:film | Create character information who appears `film`. (Not Impelemented) |
|PATCH|/characters/:char | Update a character inforamtion. |
|DELETE|/characters/:char | Delete a character information. |

## related Films （Not Implemented ）

APIs for Films.
|Method| API | 内容 |
|:------ | :---------------------- | :---------------------------------------------- |
|GET|/films | Get all films information.|
|GET|/films/:film | Get films information by `film`.|
|POST|/films/ | Create a new film information.|
|PATCH|/films/:film | Update a film information.|
|DELETE|/films/:film | Delete a film information.s|
