# cc-api-solo

このリポジトリは [Code Chrysalis](https://codechrysalis.io/) の生徒であるときに作成しました。

# Introduction

ヒーロー等の本名とヒーロー名などがわかるかもしれません。

# How to use APIs

## related Characters

キャラクター情報に関する API
|Method| API | 内容 |
|:------ | :---------------------- | :---------------------------------------------- |
|GET|/characters | すべてのキャラクター情報を取得する。 |
|GET|/characters/:char | `char` に紐付いたキャラクター情報を取得する。 |
|GET|/characters/:char/appear | `char` のキャラクターが登場する映像作品の情報を取得する（Not Impelemented） |
|POST|/characters/ | 新しいキャラクター情報を登録する。 |
|POST|/characters/:char/appear/:film | `char` のキャラクターが登場する映像作品`film`の情報を登録する（Not Impelemented） |
|PATCH|/characters/:char | `char` に紐付いたキャラクター情報を修正する。 |
|DELETE|/characters/:char | `char` に紐付いたキャラクター情報を削除する。 |

## related Films

映画作品に関する API
|Method| API | 内容 |
|:------ | :---------------------- | :---------------------------------------------- |
|GET|/films | すべての映画作品の情報を取得する。 |
|GET|/films/:film | `film` に紐付いた映画作品の情報を取得する。 |
|POST|/films/ | 新しい映画作品の情報を登録する。 |
|PATCH|/films/:film | `film` に紐付いた映画作品の情報を修正する。 |
|DELETE|/films/:film | `film` に紐付いた映画作品の情報を削除する。 |

## related Apper

出演作品に関する API

| Method | API               | 内容                                                  |
| :----- | :---------------- | :---------------------------------------------------- |
| GET    | /appear/:search   | `search` で指定したキャラクターの出演作品を取得する。 |
| POST   | /appear/          | キャラクターの出演作品を登録する (Not Implemented)    |
| PATCH  | /appear/:appearId | `appearId` の出演情報を修正する (Not Implemented)     |
| DELETE | /appear/:appearId | `appearId` の出演情報を削除する (Not Implemented)     |
