/* This reads a TimelineJS CSV and writes out a plain text timeline.
 * Columns:
 *   Year,Month,Day,Time,End Year,End Month,End Day,End Time,Display Date,Headline,Text,Media,Media Credit,Media Caption,Media Thumbnail,Type,Group,Background
 *
 * The above CSVs can be translated into a web friendly format, compliant with CSVW.
 * For example, CSVW has a built in "datatype" for time codes, xsd:dateTime, which 
 * is formatted as an ISO8601 date/time code.
 *
 * In terms of programming data model, here is the used internally here, translating the above column headers sequentially:
 * Let's call each row and event, which can be a point in time or a period of time. 
 * Columns Year, Month, Day, Time are the "start" time.
 * Columns End Month, End Day, and End Time are the "end time.
 * The event can optionally have a Display Date.
 * Column Headline is the title of the event and Text is the HTML blurb for the event.
 * Columns Media, Media Credit, Media Caption, Media Thumbnail describe a web resource being linked to by the event
 *
 * Object model derived from CSV:
 * timeline.events
 * timeline.headline
 *   event.headline = 'string'
 *   event.text = 'string'
 *   event.displayDate = 'string'
 *   event.type == 'moment' || event.type == 'period'
 *     if moment:
 *       event.moment = ISO8601 time code
 *     if period
 *       event.startMoment = ISO8601 time code
 *       event.endMoment = ISO8601 time code
 *   event.media = {
 *     url: 'https://', 
 *     credit: 'string',
 *     caption: 'string',
 *     thumbnail: 'string'
 *     }   
 *   
 *   Columns not used by this program:
 *     Column Type is not used in this program
 *     Column Group is not used in this program.
 *     Column Background is the HTML color code if rendering the event in a slideshow, it is not used in this program
 */

(()=>{
'use strict';
  
let fs = require('fs');
let d3 = require('d3');
let _  = require('lodash');
let h2p = require('html2plaintext');
  
let inputFilename = process.argv[2];
let outputFilename = process.argv[3];
console.log(inputFilename + ' to ' + outputFilename);

let startTimeComparator = (a,b) => {
  let aStart = a.type == 'moment' ? a.moment : a.startMoment;
  let bStart = b.type == 'moment' ? b.moment : b.startMoment;

  if (aStart < bStart) {
    return -1;
    }
  if (aStart > bStart ) {
    return 1;
    }
  return 0;
  };


let formatDating = anEvent => {
  if(anEvent.displayDate) {
    return anEvent.displayDate;
    } else {
      if(anEvent.type === 'moment')
	return anEvent.moment;
      else
        return anEvent.startMoment;
      }
  };
	
let dumpTimeline = (aTimeline, dumpFilename) => {
  let output = aTimeline.headline + '\n================\n';
  aTimeline.events.forEach((anEvent) => {
    output += formatDating(anEvent) + ': ';
    output += anEvent.headline + '\n';
    output += anEvent.plainText + '\n';
    output += '\n';
    });
  console.log(output);;
  };    




  
fs.readFile(inputFilename, 'utf8', function(error, data) {
  if(error) {
    console.error(error);
    return;
    };

  //console.log(data);
  let aTimeline = {};
  let hasABlankLinePreviouslyBeenDetected = false; // a blank line means do not process rows below this one
  aTimeline.events = d3.csvParse(data, (d,i,columnNames) => {
    //if(i==0)console.log(d);
    if( hasABlankLinePreviouslyBeenDetected ) return null;

    // Detect if we have a blank line, which should halt parsing.
    let hasANonBlankCellBeenDetected = false;
    columnNames.forEach((aName) => {
      if(d[aName]) hasANonBlankCellBeenDetected = true;
      });
    if(!hasANonBlankCellBeenDetected){
      hasABlankLinePreviouslyBeenDetected = true;
      return null;
      }

    if(d['Type'] === 'title') {
      aTimeline.headline = d['Headline'];
      return null;
      } else {  
        let anEvent = {};
        anEvent.headline = d['Headline'];
	anEvent.plainText = h2p(d['Text']).replace(/(\r\n|\n|\r)/gm,""); // i.e. strip newlines
        if(d['Time']) {
          anEvent.startMoment = d['Year'] + '-' + d['Month'] + '-' + d['Day'] + 'T' + d['Time']; 
          } else {
	    // kill off trailng T
            anEvent.startMoment = d['Year'] + '-' + d['Month'] + '-' + d['Day']; 
            }
        let endMoment = d['End Year'] + '-' + d['End Month'] + '-' + d['End Day'] + 'T' + d['End Time']; 
        if( endMoment == '--T' ) {
          // then all 4 End columns were blank i.e. this event is a moment, not a period
          anEvent.type = 'moment';
	  anEvent.moment = anEvent.startMoment;
	  delete anEvent.startMoment;
          } else {
    	anEvent.type = 'period';
            anEvent.endMoment = endMoment;
            }
        if(d['Display Date'])
          anEvent.displayDate = d['Display Date'];
    
        return anEvent;
        };
    });

  aTimeline.events.sort(startTimeComparator);

  dumpTimeline(aTimeline, outputFilename);
  });
})();
