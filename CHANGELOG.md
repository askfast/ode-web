# WebPaigeBase Change Log
-----------------------------------------------------------------------------------------------------------

## Installations
	- 100T		test environment
	- 110K		knrm live
	- 120G	gvrb
	- 130B 	isparaat

## Versions

2.3.11
- feature Implementation for dynamic divisions and capcodes 11-4-2014

2.3.10
- fix Fix for the function of the forward and back button in the timeline navigation bar. 2-1-2014

2.3.9
- release Planned version release. 9-12-2013
- fix For not selectable newly created groups in group selector widget in dashboard. 6-12-2013
- fix Re-designed password reset emails. 5-12-2013
- fix Friendly error messages for background sync mechanism of agenda data. 5-12-2013
- fix Changing amount of required members in group view. 5-12-2013
- feature Fast availability button web app. 5-12-2013
- fix Removed ‘WebPaige’ terms from web app. 5-12-2013
- feature TV monitor views for smartAlarming. 3-12-2013
- feature Enhancing the smartAlarming widget in dashboard with real availabilities. 3-12-2013
- fix Rounding end time based on the start time (#54). 25-11-2013
- feature Cache mechanism for smartAlarming team members list. 11-11-2013
- feature Hooking new P2000 api with new StandBy installations. 11-11-2013

2.3.8
- release Version released. 20-11-2013
- feature Easy planning for later years 20-11-2013
- feature Message broadcast buttons replaced with checkboxes (#51) 19-11-2013

2.3.7
- release Version released. 28-10-2013
- fix Fix for not correctly switching timeline navigational scope buttons (day-week-month). Fix made in this week where the daylight time saving occurs so this fix will cover other daylight saving periods as well. 25-10-2013
- feature Sorting alphabetically on search results. 24-10-2013
- fix Fix on not displaying receiver names on replying a message. 24-10-2013
- fix Fix on not displaying success message by removing multiple users from a group. 24-10-2013
- fix Fix on 'undefined' values by registering new users with empty phone fields. 24-10-2013
- fix IOS7 corrections and enhancements targeting iPad users. 23-10-2013
- fix Fix on not displaying correct error message on wrong credential login attempts. 21-10-2013
- feature Enhancement of forcing search results to refresh after adding user to an another group. 21-1-2013
- feature Enhancement of smart alarming functionality in the web application. 14-10-2013

2.3.6
- release Version released. 11-10-2013
- fix Bug fix for lower cased user names on registering 11-10-2013
- fix Bug fix for re-setting name during the login 9-10-2013

2.3.5
- release Version released. 26-8-2013
- feature Sorting on last name in agenda, message receivers and groups&users listings (#44) 26-8-2013
- feature Added the possibility to download an experimental version of the app, with geo-fencing functionality 23-8-2013

2.3.4
- release Version released. 21-8-2013
- feature Addressed monitoring when used with multiple divisions, enhancing division monitoring in both agenda and dashboard view (#14) 21-8-2013

2.3.3
- release Version released. 26-7-2013
- fix Fixed issues with IE8 (not displaying title and missing data in planboard) 26-7-2013
- fix Improved translations (#33) 12-7-2013
- feature Implement the moving of time-slots starting in the past and ending in the future by slicing them 10-7-2013
- feature Enabling changing of group member passwords for planners 9-7-2013
- fix Multiple IE bugs fix for library loading order issue 9-7-2013

2.3.2
- release Version released. 8-7-2013
- feature Applying alphabetical sorting on receivers list when composing a message 8-7-2013
- Internationalization updates with a focus on the Dutch language 8-7-2013
- feature Major performance improvement when adding, modifying or deleting new time-slots (back-end improvement) 8-7-2013
- fix Addressed a bug in the functionality of changing the availability of another team member 8-7-2013

2.3.1
- release Version released. 3-7-2013
- fix Hot fix for bug in changing view (e.g. jump back to week-view) after mutating planboard (#26/#3) 3-7-2013
- fix Performance issues: Live instance (#25) 28-6-2013
- feature Performance issues: Grouped calls for member timelines (#25) 28-6-2013
- feature Background syncing for P2000 alerts (#32) 2-7-2013
- fix Extreme mutations in the past has been reviewed and blocked (#31) 2-7-2013
- feature Show slot form fields already filled with time and date when opening (#2) 1-7-2013
- feature Adjust slot form times when mutation planboard items (#37) 1-7-2013
- fix Auto-refresh kicks in while mutating (#28) 1-7-2013
- fix Remove slot form after planboard mutation (#36) 1-7-2013
- fix Clicking today shows yesterday (#35) 1-7-2013
- feature Set standard agenda view to today +6days (#30) 1-7-2013

2.3.0
- release Version released. 27-5-2013
- feature Always change a timeslot through slot form in planboard 27-6-2013
- fix Planboard auto refresher is being blocked while working on planboard 27-6-2013
- fix Hot fix for not clearing cache for users 20-6-2013
- feature Percentage counter for members timeline in status bar 5-6-2013
release Live release for 120G 5-6-2013
- feature Help & Support 4-6-2013
- feature Download mobile app functionality. 4-6-2013

2.2.0
- release Version released. 16-5-2013
- fix Hot fix for stability issues in profile timeline 15-5-2013
- fix Hot fix for not displaying user information on profile editing form 15-5-2013
- feature Background planboard sync (60 seconds interval) 13-5-2013
- feature Message job scheduler 13-5-2013
- fix IE 8/9/10 planboard stabilization 13-5-2013
- fix Hotfix for not going further than 6th page in pagination in messages 4-5-2013

2.1.0
- release Version released. 3-5-2013
- fix IE9 & IE10 support, IE8 (temporarily) and less are blocked 3-5-2013
- feature Google Anlaytics implemented 3-5-2013
- feature Pagination in messages center 2-5-2013
- feature Instruct user with email address placeholder when remembering account info at login 29-4-2013
- fix Conflict error message by registering same username 29-4-2013
- fix Fixed not displaying alarm messages in dashboard 26-4-2013
- fix Fixed centering styling issue for login button in login screen for IE8 26-4-2013
- fix Language corrections in planboard statistics 19-4-2013
- fix Hot fix for not displaying correct weeks by previous/future weeks in profile timeline 19-4-2013

2.0.2
- release Version released. 17-4-2013
- feature Core modules separated 17-4-2013
- feature Background syncing for every minute and displaying webkit desktop notification for new messages (still in development, temporarily disabled) 16-4-2013
- feature By adding a new slot, slot form now opens with time of now and 1 hour later 15-4-2013
- feature Full screen ability for webkit browsers 15-4-2013
- feature Compressed third party libraries (performance tweak) 15-4-2013
- feature AMD support added for loading third-party-libraries (performance tweak) 15-4-2013
- feature Major app loading performance tweaks with reducing requests and minified and compiled to one version of app libraries 13-4-2013
- fix Meridian time (hour) issue with selecting time range with mouse either by shift or ctrl keys is resolved 12-4-2013
- fix Tablet issues has been solved 12-4-2013
- fix Corrected a localization issue with 'no messages' in the box 11-4-2013
- feature Tablet datetime selectors for planboard and profile timeline 11-4-2013
- fix Removed footer for mobile and tablets and changed it to portable preloader 10-4-2013
- feature Main navigation menu more friendly with apple or android tablets or mobiles 10-4-2013
- feature First group to render setting functionality 10-4-2013
- feature Default wish value setting for groups 9-4-2013
- feature Dashboard 2.0 8-4-2013

2.0.1
- fix Fixed rendering issues with pie chart of totals in statistics in plan 5-4-2013
- feature Dynamic listing for legend based on available states of that particular installation 4-4-2013
- fix Hot fix for not displaying date time conversions in message center 4-4-2013
- fix Case-insensitive login 4-4-2013
- fix Quick css fix for IE. (Not showing timeslots) 3-4-2013
- fix CSS fix for tabs left border. (Bug with dynamic height sizing when there is no content in tab is still open !) 3-4-2013

2.0.0
- release Version released. 3-4-2013

## Changes in libraries
	timepicker.js
		* showMeridian property in libs/bootstrap-timepicker/timepicker.js changed to false for displayin 24 hours clock.