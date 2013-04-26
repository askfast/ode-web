# WebPaigeBase Change Log
---

## Versions

	2.1.0 (snapshot)
		* Fixed not displaying alarm messages in dashboard 26-402013
		* Fixed centering styling issue for login button in login screen for IE8 26-4-2013
		* Language corrections in planboard statistics 19-4-2013
		* Hotfix for not displaying correct weeks by previous/future weeks in profile timeline 19-4-2013

	2.0.2
		* KNRM (live) 17-4-2013
		* Core modules seperated 17-4-2013
		* Background syncing for every minute and displaying webkit desktop notification for new messages (still in development, temporarily disabled) 16-4-2013
		* By adding a new slot, slot form now opens with time of now and 1 hour later 15-4-2013
		* Full screen ability for webkit browsers 15-4-2013
		* Compressed third party libraries 15-4-2013
		* AMD support added for loading third-party-libraries (performance tweak) 15-4-2013
		* Major app loading performanace tweaks with reducing requests and minified and compiled to one version of app libraries 13-4-2013
		* Meridian time (hour) issue with selecting time range with mouse either by shift or ctrl keys is resolved 12-4-2013
		* Tablet issues has been solved 12-4-2013
		* Corrected a localization issue with 'no messages' in the box 11-4-2013
		* Tablet datetime selectors for planboard and profile timeline 11-4-2013
		* Removed footer for mobile and tablets and changed it to portable preloader 10-4-2013
		* Main navigation menu more friendly with apple or android tablets or mobiles 10-4-2013
		* First group to render setting functionality 10-4-2013
		* Default wish value setting for groups 9-4-2013
		* Dashboard 2.0 8-4-2013

	2.0.1
		* Fixed rendering issues with pie chart of totals in statistics in plan 5-4-2013
		* Dynamic listing for legenda based on available states of that particular installation 4-4-2013
		* Hot fix for not displaying date time conversions in message center 4-4-2013
		* Case-insesitive login 4-4-2013
		* Quick css fix for IE. (Not showing timeslots) 3-4-2013
		* CSS fix for tabs left border. (Bug with dynamic height sizing when there is no content in tab is still open!!) 3-4-2013
	
	2.0.0
		* KNRM (live) 3-4-2013
		* Reddingsbrigade (test) 3-4-2013
		* Brandweer (demo) 3-4-2013


## Changes in libraries
	timepicker.js
		* showMeridian property in libs/bootstrap-timepicker/timepicker.js changed to false for displayin 24 hours clock.