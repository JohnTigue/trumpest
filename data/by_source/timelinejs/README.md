Technically TimelineJS is not a data source, so these notes are collected here simply for lack of a better location.

Modifying the code for TimelineJS seems foolish. Better simply to look at TimelineJS spreadsheets as a build artifact transform of the core data.
So, core data has times (start and optional stop) as ISO 8601 and some transformer hacks each of those single column times into the multiple columns
that TimelineJS wants.

The only loss here is that non-tech folks will not be able to enter data in Google Docs and see the results... Could upcast from TimelineJS time formats to ISO 8601. See code in tools/timelines/timeline_dumper.js for much of that already available.

## Potential format improvements
### Time
- ISO 8601
  - how to specify year or month in ISO 8601
  
## Licensing
According to [the TimelineJS docs](https://timeline.knightlab.com/docs/faq.html):
>Is TimelineJS free for commercial use?
> TimelineJS is released under the Mozilla Public License (MPL), version 2.0. That means that TimelineJS is free to "use, reproduce, make available, modify, display, perform, distribute" or otherwise employ. You don't need our permission to publish stories with TimelineJS and you don't need to pay us any fees or arrange any further license beyond the MPL. To read more about what you can do with TimelineJS, read our license page.
  
