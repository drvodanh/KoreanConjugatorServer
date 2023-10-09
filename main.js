var conjugator = require('./korean/conjugator');
var stemmer = require('./korean/stemmer');
let database = require('./database');
const express = require('express');
const app = express();

const server_port = process.env.PORT || 3000
#const server_ip_address = process.env.HOST;
const CONJUGATE_ROUTE = '/conjugate=';

app.get('/', function(req, res){
    res.redirect(CONJUGATE_ROUTE + '하다');
});

// Works for both conjugated and infinitive forms
app.get(CONJUGATE_ROUTE+':term', function (req, res) {
    let term = req.params.term;
    let regular = true;
    for (irregular_name in conjugator.verb_types) {
        let func = conjugator.verb_types[irregular_name];
        if (func(conjugator.base(term))) {
            regular = false;
            break;
        }
    }

    conjugator.conjugate(term,regular, function (conjugations) {
        res.json(conjugations);
    })
});

app.get('/searchKor=:term', function(req, res) {
    var stemList = stemmer.stem(req.params.term);
    if(stemList.length == 0){
        res.redirect(CONJUGATE_ROUTE+req.params.term);
    }if(stemList.length == 1){
        let stem = stemList[0].key;
        if(stem == undefined || stem.substr(stem.length-2,stem.length) == '드다'){
            stem = req.params.term;
        }
        res.redirect(CONJUGATE_ROUTE+stem);
    }else {
        var defCount = 0;
        res.json(stemList);

        // Uncomment this code if you're connecting a database
        /*stemList.forEach(function(item, index, array) {
            database.searchKor(item.key,function(value){
                stemList[index].def = value;
                defCount++;
                if(defCount == array.length){
                    res.json(stemList);
                }
            })
        });*/
    }
});

app.get('/stem=:term', function(req, res) {
    res.send(stemmer.stem(req.params.term));
});

app.get('/defineKor=:term', function(req, res){
    database.searchKor(req.params.term , function(value){
        res.send(value)
    });
});

app.get('/defineEng=:term', function(req, res){
   database.searchEng(req.params.term,function(value){
       res.send(value);
   })
});

app.listen(server_port,server_ip_address, function() {
    console.log('Listening on:'+server_ip_address+':'+server_port);
});

// Implement String.format. First, check if it isn't implemented already.
if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

String.prototype.regexIndexOf = function(regex, startpos) {
    let indexOf = this.substring(startpos || 0).search(regex);
    return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
};
