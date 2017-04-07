/* This file beachhead_filter.js is a CSV filter:
 *   input:  a CSV, with individual's names in some column
 *   output: a CSV, the input rows but filtered for matching individual names in ProPublica's Beachhead CSV
 *
 * Usage:
 *   node beachhead_filter.js trumpworld_individuals.csv trumpworld_filtered.csv
 *   (This assumes beachhead.csv is in the same directory as beachhead_filter.js)
 * 
 * Intent:
 *   ProPublica has compiled a table of c. 400 individual's names of early Trump adminstration officials.
 *   This tool uses ProPublica's data as a filter on other datasets.
 *   For example, BuzzFeed's TrumpWorld dataset can be filtered down to find any info on those c. 400 individuals.
 *
 * ProPublica's Beachhead data:
 *   https://projects.propublica.org/graphics/beachhead
 *   ProPublica's data is ProPublica's property
 *   Column header:
 *     Agency, Name, Position Title, Grade Level, Start Date, Left Administration, Obama Holdover, Other FOIAs
 *  
 * BuzzFeed's TrumpWorld
 *   https://www.buzzfeed.com/johntemplon/help-us-map-trumpworld   
 *   BuzzFeed's TrumpWold data is BuzzFeed's property
 *   Column header:
 *     org-org-connections.csv
 *       Organization A, Organization B, Connection, Source(s)
 *     person-person-connections.csv
 *       Person A, Person B, Connection, Source(s)
 *     person-org-connections.csv
 *        Organization,Person,Connection,Source(s)
 *
 * This software:
 *   Language: JavaScript, runnable via NodeJS on CLI
 *   License: MIT (i.e. have fun, good luck)
 *   Author: John Tigue john@tigue.com
 *   What it does: reads both CSVs and knows what columns to use as keys for a database-style join across the 2 tables
 */

(()=>{
'use strict';

// ===== Begin configurables:
// How to tell the code which column of the input CSV has the individual names
const columnNumberForNames = 0; // 0 is first, 1 is second, ... from: Organization,Person,Connection,Source(s)

// How to specify the filename for ProPublica's Beachhead CSV
const propublicasFileName = 'Full-Beachhead-CSV_2.2017-03-09.csv';
// ===== End   configurables

/* Schema map between the 2 databases  
 *   Column header:
 *     org-org-connections.csv
 *       Organization A, Organization B, Connection, Source(s)
 *     person-person-connections.csv
 *       Person A, Person B, Connection, Source(s)
 *     person-org-connections.csv
 *        Organization,Person,Connection,Source(s)
 */
let schemas = {};
schemas.trumpworld = {};  
schemas.trumpworld.nameColumns = [
  {file:'person-person-connections.csv', column:'Person A'},
  {file:'person-person-connections.csv', column:'Person B'},
  {file:'person-org-connections.csv',    column:'Person'  }
  ];
  
// TODO: take these 2 from CLI
//const inputFileName = 'person-org-connections.csv';
const inputFileName = 'person-person-connections.csv';
  
const outputFileName = 'person-org-connections.filtered.csv';

  
// So that can promisifyAll(): http://stackoverflow.com/a/34642827/4669056
const Promise = require('bluebird');

const d3 = require('d3');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');

fs.readFileAsync(path.join(__dirname, propublicasFileName))
  .then((propublicasData) => {
    // Extract names
    let rows = d3.csvParse(propublicasData.toString(), (d,i) => {
      d.Name = d.Name.toLowerCase();
      return d;
      });
    
    let propublicaNames = [];
    rows.forEach((aRow) => {
      if(propublicaNames.indexOf(aRow.Name) == -1) {
	propublicaNames.push(aRow.Name);
        }
      });

    return propublicaNames;
    })
  .then((probulicasNames)=>{
    // Load subject CSV and filter it
    console.log('Total names in Propublica\'s filter list: ' + probulicasNames.length + '\n' );

    schemas.trumpworld.nameColumns.forEach((aTarget) => {
      //{file:'person-person-connections.csv', column:'Person A'},
      fs.readFileAsync(path.join(__dirname, aTarget.file))
        .then((someTrumpworldData) => {
          console.log('Filtering ' + aTarget.file + ' on column ' + aTarget.column);
          let trumpworldRows = d3.csvParse(someTrumpworldData.toString(), (d,i) => {
	    //console.log(d);
	    d[ aTarget.column ] = d[ aTarget.column ].toLowerCase();
	    return d;
            });
	  trumpworldRows.forEach((aRow) => {
	    if(probulicasNames.indexOf( aRow[aTarget.column] ) > -1) {
	      console.log(aRow);
	      };
	    });
          console.log('');
	  });
      //let matchingRows = trumpworldRows.filter((names)=>{});
      });



/*    
    fs.readFileAsync(inputFileName)
      .then((inputData) => {	
	let rowsFiltered = [];
        let rows = d3.csvParseRows(inputData.toString(), (d,i) => {
	  let aName = d[columnNumberForNames].toLowerCase();
	  //console.log(aName);
    	  if(names.indexOf(aName) > -1) {
	    rowsFiltered.push(d);
	    }
	  });
	console.log(rowsFiltered);
        //outputFileName
        });

*/
	
  
    })
  .catch((error) => {
    console.log('Read of ' + propublicasFileName + ' errored' );
    console.log(error);
  });
})();
