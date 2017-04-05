## What

This folder contains information related to financial disclosure forms for White House staff.
These forms are officially known as U.S. Office of Government Ethics; 5 C.F.R. part 2634 | Form Approved: OMB No. (3209-0001) (March 2014)


### Code
#### The Center for Public Integrity <a name='Publici'></a>
As reported in [New database details White House officials' finances](https://www.publicintegrity.org/2017/04/04/20801/new-database-details-white-house-officials-finances):
>The Center for Public Integrity’s news developer, [Chris Zubak-Skees](https://www.publicintegrity.org/authors/chris-zubak-skees), extracted these details from more than 90 reports, released in PDF format, using a software tool he created.

That tool is called [pdf-parser](https://github.com/PublicI/pfd-parser):
>Very WIP parser for Office of Government ethics form 278 public financial disclosure PDFs

The code is written in NodeJS, using modern style JavaScript (read: Promises, etc).

The license is [unknown](https://github.com/PublicI/pfd-parser/issues/2).

The result of running the financial disclosure PDFs through `pdf-parser` are available in a downloadable spreadsheet.
[That spreadsheet](https://docs.google.com/spreadsheets/d/1V1axPEZNHVwgpJTkWMCRJaiAU67poc4ycOaMP3xtKuE/edit) is on Google Docs.

The columns are:
- file	
- #	
- organization-name	
- city-state	
- organization-type	
- position-held	
- from	
- to

### Data

#### CSVW Data
The core here is a key to an individual (i.e. their name, well formatted) and a link to the disclosure document.
Other attributes could be added but the above is the core so let's start there.
So, there should be a CSV (and CSVW metadata) listing of known disclosures.

#### Sources
- [BuzzFeed's postings on DocumentCloud](https://www.documentcloud.org/public/search/projectid:32477-WH-financial-disclosures)
  - 62 entries as of 2017-04-02
- [ProPublica's(?) Google Drive: Trump Admin Financial Disclosures](https://drive.google.com/drive/u/0/folders/0BwDYM_Qm5fLWelV6UUNPZ1REalE)
  - Google Doc Sheet
  - Associated form for [Submitting comments](https://docs.google.com/forms/d/1N9aWPc7EWCMeE5CYRJKeRuw6qFtrmn4K5Zsf6DJayfo/viewform?edit_requested=true)
- [](#Publici) [That spreadsheet](https://docs.google.com/spreadsheets/d/1V1axPEZNHVwgpJTkWMCRJaiAU67poc4ycOaMP3xtKuE/edit) is on Google Docs.
  - Google Doc Sheet
  - 546 rows as of 2017-04-04


#### Some interesting individuals' disclosures
- From [ProPublica](https://www.facebook.com/propublica/posts/10155255947269445)
  - Reince Priebus: http://propub.li/2ojSLY9
  - Steve Bannon: http://propub.li/2nJElz5
  - Stephen Miller: http://propub.li/2ollI62
  - Jared Kushner: http://propub.li/2nsAjZt
  - Omarosa Manigault: http://propub.li/2ollH2l

- From Politico
  - [List of interesting names](http://www.politico.com/story/2017/03/white-house-staff-financial-disclosure-forms-236770)

### Reportage

The following article were published on this topic. The list is sorted alphabetically by source.
- Axios
  - [White House releases up to 180 personal financial disclosures](https://www.axios.com/whose-financial-disclosures-are-included-in-the-wh-document-drop-2338924835.html) 2017-03-31
- BuzzFeed
  - [The White House Revealed The Finances Of Trump’s Top Staff. Here Are Some Of The Key Disclosures.](https://www.buzzfeed.com/chrisgeidner/the-white-house-revealed-the-finances-of-trumps-top-staff?utm_term=.ftMXbJRZMN)
- Center for Public Integrity
  - [New database details White House officials' finances](https://www.publicintegrity.org/2017/04/04/20801/new-database-details-white-house-officials-finances)
- NYT
  - [Who’s Worth What at the White House: The Financial Disclosures](https://www.nytimes.com/2017/03/31/us/politics/white-house-releases-staff-financial-disclosures.html) 2017-03-31
  - [Wealthy in the White House: President Trump’s Inner Circle](https://www.nytimes.com/2017/04/01/us/politics/white-house-wealth-cohn-kushner-spicer.html?smid=fb-nytimes&smtyp=cur) 2017-04-01
  - [How Much People in the Trump Administration Are Worth](https://www.nytimes.com/interactive/2017/04/01/us/politics/how-much-people-in-the-trump-administration-are-worth-financial-disclosure.html) 2017-04-0
- Politico
  - [White House staff financial disclosures: A deeper dive into the forms](http://www.politico.com/story/2017/03/white-house-staff-financial-disclosure-forms-236770) 2017-03-31
    - This includes a list of top names with links
- ProPublica
  - [The White House Wouldn’t Post Trump Staffers’ Financial Disclosures. So We Did.](https://www.propublica.org/article/white-house-wouldnt-post-trump-staffers-financial-disclosures) 2017-04-01
- Quartz
  - [Where to read the nitty-gritty details of White House employees’ personal finances](https://qz.com/947833/sean-spicer-steve-bannon-ivanka-trump-jared-kushner-where-to-read-the-financial-disclosures-of-over-60-of-the-white-houses-wealthiest-employees/) 2017-04-01
- Vox
  - [5 big takeaways from the White House financial disclosures](http://www.vox.com/2017/4/3/15147690/takeaways-white-house-financial-disclosures-trump-kushner)
- Washington Post
  - [Here is what Post reporters found in the financial disclosures of top White House aides](https://www.washingtonpost.com/news/post-politics/wp/2017/04/01/here-is-what-post-reporters-found-in-the-financial-disclosures-of-top-white-house-aides/) 2017-04-01
