/**
 * Created by Halck on 25.06.2018.
 */

excel = require('exceljs');
ease = require('./ease.js');

var dby = new excel.Workbook();

var nodes = new Array(3000);

dby.xlsx.readFile('dby.3.xlsx').then(() => {

    //reading nodelist

    var nodelist = dby.getWorksheet(1);

    var total_nodes = nodelist.rowCount;

    for (var i = 1; i < 10; i++) {
        var row = nodelist.getRow(i);
        var tmp_node = {
            name: row.getCell(1).value,
            states: ease.parse_states(row.getCell(2).value),
            n: row.getCell(3).value,
            type: row.getCell(4).value,
            doctors: [row.getCell(6).value]
        }
        var n = row.getCell(3).value;
        nodes[n] = tmp_node;
        console.log(n);
    }

    //reading absolute
    nodelist = null;
    var absolute = dby.getWorksheet('dby.absolute');

    var total_rows = absolute.rowCount;

    for (var i = 1; i < 100; i++) {
        var row = absolute.getRow(i);

        var n = row.getCell(1).value;

        if (n.hasOwnProperty('formula')) {
            n = n.result;
        }

        if ((nodes[n] == undefined)||(nodes[n] == null)) {
            console.log("Error in line #" + i + ". No node #" + n);
        } else {
            var state_name = row.getCell(3).value;
            var state_prob = row.getCell(4).value;
            var state_n = nodes[n].states.findIndex((el) => {return el.name == state_name});
            console.log(state_n);
            if (state_n > -1) {
                if (nodes[n].states[state_n].hasOwnProperty('prob')) {
                    console.log("Error on list absolute in line " + i + ". Node already has prob in state " + state_n);
                } else {
                    nodes[n].states[state_n]['prob'] = Number(state_prob);
                }
            }
            //console.log(nodes[n]);
        }
    }

    //reading conditional

    var conditional = dby.getWorksheet('dby.3.conditional');



});