define(["controllers/controllers"],function(e){e.controller("profile",function(e,t,n,r,i,s,o,u,a,f,l,c,h){function d(){t.userGroups=[],_.each($("div#editTab select.chosen-select option"),function(e){_.each(t.groups,function(n){e.innerHTML==n.name&&(t.userGroups.push(n),e.selected=!0)})}),$("div#editTab select.chosen-select").trigger("chosen:updated")}function v(n){t.views={profile:!1,edit:!1,password:!1,timeline:!1},h(function(){d()},100),n=="edit"&&e.phoneNumberParser(t.profilemeta.PhoneAddress),t.views[n]=!0,t.views.user=e.StandBy.resources.uuid.toLowerCase()==s.current.params.userId}function g(){t.timeline={id:"userTimeline",main:!1,user:{id:s.current.params.userId},current:t.current,options:{start:new Date(t.periods.weeks[t.current.week].first.day),end:new Date(t.periods.weeks[t.current.week].last.day),min:new Date(t.periods.weeks[t.current.week].first.day),max:new Date(t.periods.weeks[t.current.week].last.day)},range:{start:t.periods.weeks[t.current.week].first.day,end:t.periods.weeks[t.current.week].last.day},config:{legenda:{},legendarer:e.StandBy.config.timeline.config.legendarer,states:e.StandBy.config.timeline.config.states}};var n={};_.each(t.timeline.config.states,function(e,t){n[t]=e.label}),t.states=n,_.each(e.StandBy.config.timeline.config.states,function(e,n){t.timeline.config.legenda[n]=!0}),t.daterange=l.readable.date(t.timeline.range.start)+" / "+l.readable.date(t.timeline.range.end),$("#timeline").html(""),$("#timeline").append('<div id="userTimeline"></div>')}e.notification.status=!1,e.fixStyles(),e.resetPhoneNumberChecker(),t.self=this,t.deleteUserError=!1,t.userPassword="",t.showDeleteUserModal=function(){$("#deleteUserModal").modal("show")},t.deleteUser=function(n){t.deleteUserError=!1,n!=""&&n!=undefined?e.StandBy.resources.role<=1?e.StandBy.resources.uuid.toLowerCase()!=s.current.params.userId?c(n)==a("environment").get("askPass")?(e.statusBar.display(e.ui.profile.remove.inProgress),u.remove(o.resources.uuid).then(function(n){e.statusBar.off(),t.userPassword="",n.hasOwnProperty("error")?(t.deleteUserError=!0,t.deleteUserErrorMessage=e.ui.errors.profile.remove.general):(e.notifier.success(e.ui.profile.remove.success),r.path("/groups").hash("").search({}))})):(e.statusBar.off(),t.userPassword="",t.deleteUserError=!0,t.deleteUserErrorMessage=e.ui.errors.profile.remove.password):(e.statusBar.off(),t.deleteUserError=!0,t.deleteUserErrorMessage=e.ui.errors.profile.remove.self):(e.statusBar.off(),t.deleteUserError=!0,t.deleteUserErrorMessage=e.ui.errors.profile.remove.auth):(e.statusBar.off(),t.deleteUserError=!0,t.deleteUserErrorMessage=e.ui.errors.profile.remove.empty)},t.periods=l.getPeriods(),t.current={day:l.current.today()+1,week:l.current.week(),month:l.current.month()},e.StandBy.resources.uuid.toLowerCase()!=s.current.params.userId&&o&&o.slots&&(o.user=o.slots.data),t.data=o,h(function(){o.hasOwnProperty("resources")&&(t.profileRole=o.resources.role,o.resources.hasOwnProperty("EmailAddress")||(t.data.resources.EmailAddress=""),o.resources.hasOwnProperty("pagerId")||(t.data.resources.pagerId=""),o.resources.hasOwnProperty("PostAddress")||(t.data.resources.PostAddress=""),o.resources.hasOwnProperty("PostZip")||(t.data.resources.PostZip=""),o.resources.hasOwnProperty("PostCity")||(t.data.resources.PostCity=""))},25);var p={};_.each(e.StandBy.config.roles,function(e){p[e.id]=e.label}),t.roles=p,o.resources.PhoneAddresses||(o.resources.PhoneAddresses=[]),t.profilemeta=o&&o.resources,t.profilemeta.phones={1:o.resources.PhoneAddresses[0]||"",2:o.resources.PhoneAddresses[1],3:o.resources.PhoneAddresses[2]},t.phoneViews={second:angular.isDefined(o.resources.PhoneAddresses[1]),third:angular.isDefined(o.resources.PhoneAddresses[2])},t.addPhoneNumber=function(e){t.phoneViews[e]=!0},t.removePhoneNumber=function(e,n){t.phoneViews[n]=!1,t.profileResetPhoneNumberChecker(e),h(function(){t.data.resources.PhoneAddresses.splice(e-1,1),delete t.profilemeta.phones[e],t.profilePhoneNumberParser()})},t.profilePhoneNumberParsed={1:{},2:{},3:{}},t.profileResetPhoneNumberChecker=function(e){t.profilePhoneNumberParsed[e]={},t.profilePhoneNumberParsed[e].result=!0},t.$watch("profilemeta.phones[1]",function(e){e==""&&t.profileResetPhoneNumberChecker(1)}),t.$watch("profilemeta.phones[2]",function(e){e==""&&t.profileResetPhoneNumberChecker(2)}),t.$watch("profilemeta.phones[3]",function(e){e==""&&t.profileResetPhoneNumberChecker(3)}),t.profileResetPhoneNumberChecker(1),t.profileResetPhoneNumberChecker(2),t.profileResetPhoneNumberChecker(3),t.profilePhoneNumberParser=function(){var n;_.each([1,2,3],function(r){n=t.profilemeta.phones[r];if(n!="")if(n&&n.length>0){var i,s;i=s=phoneNumberParser(n,"NL"),t.profilePhoneNumberParsed[r].result=!0;if(i){var o=e.ui.errors.phone.notValid,u=e.ui.errors.phone.invalidCountry,a;if(i.error)t.profilePhoneNumberParsed[r]={result:!1,message:o};else if(!i.validation.isPossibleNumber){switch(i.validation.isPossibleNumberWithReason){case"INVALID_COUNTRY_CODE":a=u;break;case"TOO_SHORT":a=o+e.ui.errors.phone.tooShort;break;case"TOO_LONG":a=o+e.ui.errors.phone.tooLong}t.profilePhoneNumberParsed[r]={result:!1,message:a}}else i.validation.isValidNumber?i.validation.isValidNumberForRegion?(t.profilePhoneNumberParsed[r]={result:!0,message:e.ui.success.phone.message+i.validation.phoneNumberRegion+e.ui.success.phone.as+i.validation.getNumberType},t.profilemeta.phones[r]=i.formatting.e164,$(".inputPhoneNumbers").removeClass("error"),_.each([1,2,3],function(n){r!=n&&t.profilemeta.phones[n]==i.formatting.e164&&(t.profilePhoneNumberParsed[r]={result:!1,message:e.ui.profile.duplicateNumber})})):t.profilePhoneNumberParsed[r]={result:!1,message:u}:t.profilePhoneNumberParsed[r]={result:!1,message:o}}t.profilePhoneNumberParsed[r].all=s}else t.profilePhoneNumberParsed[r].result=!0,delete t.profilePhoneNumberParsed[r].message,$(".inputPhoneNumber-"+r).removeClass("error")})},h(function(){t.profilePhoneNumberParser()},50),t.groups=s.current.params.userId&&f.getMemberGroups(s.current.params.userId.toLowerCase()),t.availableGroups=a("network").get("groups"),t.passwords={current:"",new1:"",new2:""},t.forms={add:!1,edit:!1},t.toggleSlotForm=function(){t.forms.add?t.resetInlineForms():h(function(){t.slot={},t.slot={start:{date:(new Date).toString(e.StandBy.config.formats.date),time:(new Date).toString(e.StandBy.config.formats.time),datetime:(new Date).toISOString()},end:{date:(new Date).toString(e.StandBy.config.formats.date),time:(new Date).addHours(1).toString(e.StandBy.config.formats.time),datetime:(new Date).toISOString()},state:"",recursive:!1,id:""},t.forms={add:!0,edit:!1}},20)},t.resetInlineForms=function(){h(function(){t.slot={},t.original={},t.forms={add:!1,edit:!1}},20)},v(r.hash()),t.detectChanges=function(){h(function(){var e=[];_.each($(".chosen-choices .search-choice span"),function(t){_.each(a("network").get("groups"),function(n){var r=new RegExp(t.innerHTML);r.test(n.name)&&e.push(n)})}),t.userGroups=e})},t.setViewTo=function(e){t.$watch(r.hash(),function(){r.hash(e),v(e)})};var m=250;t.pincodeExistsValidation=!0,t.pincodeExists=function(){!angular.isDefined(t.profilemeta.pincode)||t.profilemeta.pincode==""?(t.pincodeExistsValidation=!1,t.pincodeExistsValidationMessage=e.ui.profile.pincodeNotValid):angular.isDefined(t.profilemeta.pincode)&&(t.checkPincode&&(clearTimeout(t.checkPincode),t.checkPincode=null),t.checkPincode=setTimeout(function(){t.checkPincode=null,u.pincodeExists(t.profilemeta.uuid,t.profilemeta.pincode).then(function(n){t.pincodeExistsValidation=n,t.pincodeExistsValidationMessage=e.ui.profile.pincodeInUse})},m))},t.checkPincode=null,t.save=function(n){if(!angular.isDefined(t.profilemeta.pincode)||t.profilemeta.pincode==""||!t.pincodeExistsValidation)return e.notifier.error(e.ui.profile.pincodeCorrect),e.statusBar.off(),$(window).scrollTop(0),!1;if(!t.pincodeExistsValidation)return e.notifier.error(e.ui.profile.pincodeInUse),e.statusBar.off(),$(window).scrollTop(0),!1;e.statusBar.display(e.ui.profile.saveProfile),n.Password&&(n.askPass=c(n.Password));if(!t.profilePhoneNumberParsed[1].result&&t.profilemeta.phones[1]!=""||!t.profilePhoneNumberParsed[2].result&&t.profilemeta.phones[2]!=""||!t.profilePhoneNumberParsed[3].result&&t.profilemeta.phones[3]!="")return e.notifier.error(e.ui.errors.phone.notValidOnSubmit),e.statusBar.off(),$(window).scrollTop(0),!1;var r;_.each(n.phones,function(e,t){angular.isDefined(e)&&e.length>0?(r=phoneNumberParser(n.phones[t],"NL"),n.PhoneAddresses[t-1]=r.formatting.e164):t==1&&(n.PhoneAddresses=[])}),delete n.PhoneAddress;var i=[];_.each(n.PhoneAddresses,function(e){e!==undefined&&e!==null&&e!==""&&i.push(e)}),n.PhoneAddresses=i,u.save(s.current.params.userId,n).then(function(n){if(n.error)e.notifier.error(e.ui.errors.profile.save),console.warn("error ->",n);else{e.statusBar.display(e.ui.profile.changingRole);if(!angular.isDefined(t.profileRole)||t.profileRole=="")t.profileRole=o.resources.role==0?"0":"3";u.role(o.resources.uuid,t.profileRole).then(function(n){if(n.error)console.warn("error with changing user role!");else{e.statusBar.display(e.ui.profile.settingGroups);var r=[];_.each(t.userGroups,function(e){r.push(e.uuid)}),u.membership(s.current.params.userId,r).then(function(n){n.error?(e.notifier.error(e.ui.errors.profile.settingGroups),console.warn("error ->",n)):(e.statusBar.display(e.ui.groups.refreshingGroupMember),f.query().then(function(n){if(n.error)e.notifier.error(e.ui.errors.groups.query),console.warn("error ->",n);else{var r=s.current.params.userId.toLowerCase();t.groups=s.current.params.userId&&f.getMemberGroups(r),e.statusBar.display(e.ui.profile.refreshing);var i=r==e.StandBy.resources.uuid;u.get(r,i).then(function(n){n.error?(e.notifier.error(e.ui.errors.profile.get),console.warn("error ->",n)):(e.notifier.success(e.ui.profile.dataChanged),t.profilemeta.phones[1]==""&&t.profilemeta.phones[2]!=""&&(t.profilemeta.phones[1]=t.profilemeta.phones[2],t.phoneViews.second=!1,t.profilemeta.phones[3]!=""?(t.profilemeta.phones[2]=t.profilemeta.phones[3],delete t.profilemeta.phones[3],t.phoneViews.second=!0,t.phoneViews.third=!1):delete t.profilemeta.phones[2]),t.profilemeta.phones[2]==""&&t.profilemeta.phones[3]!=""&&(t.profilemeta.phones[2]=t.profilemeta.phones[3],t.phoneViews.third=!1,delete t.profilemeta.phones[3]),h(function(){t.data=n}),_.each([{id:2,name:"second"},{id:3,name:"third"}],function(e){if(t.profilemeta.phones[e.id]==undefined||t.profilemeta.phones[e.id]=="")t.phoneViews[e.name]=!1}),e.statusBar.off(),$(window).scrollTop(0))})}}))})}})}})},t.change=function(n){if(n.new1==""||n.new2=="")return e.notifier.error(e.ui.profile.pleaseFill,!0),!1;if(n.new1!=n.new2)return e.notifier.error(e.ui.profile.passNotMatch,!0),!1;e.StandBy.resources.askPass==c(n.current)?(e.statusBar.display(e.ui.profile.changingPass),u.changePassword(n).then(function(n){n.error?(e.notifier.error(e.ui.errors.profile.changePassword),console.warn("error ->",n)):(e.statusBar.display(e.ui.profile.refreshing),u.get(e.StandBy.resources.uuid,!0).then(function(n){n.error?(e.notifier.error(e.ui.errors.profile.get),console.warn("error ->",n)):(e.notifier.success(e.ui.profile.passChanged),t.data=n,e.statusBar.off())}))})):e.notifier.error(e.ui.profile.passwrong,!0)},s.current.params.userId&&e.StandBy.resources.uuid!=s.current.params.userId.toLowerCase()&&g(),t.redraw=function(){setTimeout(function(){t.self.timeline&&t.self.timeline.redraw()},e.StandBy.config.timers.TICKER)}})});