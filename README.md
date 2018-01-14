# Korean Conjugator Server
A JavaScript server for conjugating Korean words. Uses the [algorithm built by Dan Bravender](https://github.com/dbravender/korean_conjugation). This is the same server used by [Hanji](https://play.google.com/store/apps/details?id=com.a494studios.koreanconjugator), but with sensistive data removed.

## Usage
First instal the required node packages:
```
npm install
```
Then launch main.js:
```
node main.js
```
You should get a 'listening' message if everything is working correctly.

## Routes
### /stem 
Takes a word in conjugated form and returns it's infinitive form.

### /conjugate
Takes a word in infinitive form and returns a JSON array of conjugation objects.

### /searchKor
This is the main route for Korean searches. It takes a word in either infinitive or conjugated form. If the infinitive form is given or found, it will redirect to /conjugate and display the word's conjugations. If more than one infinitive form is found, then it will display a JSON array of the forms.

### /defineKor
Takes a Korean word in infinitive form and returns it's definition. Since this repo isn't connected to the database, this route **will not work by default.**

### /defineEng
Takes an English word and returns a list of possible Korean matches. Since this repo isn't connected to the database, this route **will not work by default.**

## Acknowledgements

This project could not have been done without the initial [algorithm built by Dan Bravender](https://github.com/dbravender/korean_conjugation). This project is basically a server wrapper around his code, most of it hasn't been modified.

The database I use with this server is [kengdic](https://github.com/garfieldnate/kengdic). While this repo is not connected to it by default, it's pretty easy to modify the source code to work with a local PostgreSQL server.
