angular.module("md-datepicker",[]).directive("datepicker",["$filter","$parse",function(e,a){"use strict";function t(t,r,s){t.frenchDay=n,t.frenchMounth=c,t.frenchMinDay=d,t.pickDate=new Date,t.animateDate="animateDate";var u=1;t.months=[],t.selectMounth=0,t.calendarDay=[],t.validateFn=angular.noop,t.cancelFn=angular.noop;try{t.mindate&&(l=t.mindate),t.maxdate&&(i=t.maxdate),t.onok&&(t.validateFn=a(t.onok)),t.oncancel&&(t.cancelFn=a(t.oncancel))}catch(m){console.log(m)}t.calculateDay=function(e){return(e-u+7)%7};var h,v,y,D,f,g;v=o([l.getMonth(),l.getFullYear()]),y=o([i.getMonth(),i.getFullYear()]),D=t.pickDate.getDate(),f=v[0],g=v[1];var h,p,k;for(t.months=[];g<y[1]||g==y[1]&&f<=y[0];){var b={weeks:[],days:[],name:"",mounth:f,year:g};h=new Date(g,f,1),p=t.calculateDay(h.getDay()),b.name=c[f],h=new Date(g,f+1,0),k=h.getDate();for(var M=0;p>M;M++)b.days.push(void 0);for(var M=1;k>=M;M++){var x=new Date(g,f,M);b.days.push({n:M,day:n[t.calculateDay(x.getDay())],enabled:x>=l&&i>=x})}for(var M=0;5>=M;M++){for(var v=7*M,w=7,F=b.days.slice(v,7*M+w);F.length<7;)F.push(void 0);b.weeks.push(F)}(b.year<t.pickDate.getFullYear()||b.year==t.pickDate.getFullYear()&&b.mounth<t.pickDate.getMonth())&&t.selectMounth++,t.months.push(b),f++,12==f&&(f=0,g++)}console.log(t.months);var Y=s.format||"shortDate";t.nextMounth=function(){return t.selectMounth++,!1},t.previousMounth=function(){t.selectMounth--},t.selectedDate=function(e,a,n){t.pickDate=new Date(e,a,n),t.animateDate="scope.animateDate"==t.animateDate?"":"animateDate"},t.save=function(){t._modelValue=e("date")(t.pickDate,Y),t.validateFn()},t.cancel=function(){t.cancelFn()}}var n=["lundi","mardi","mercredi","jeudi","vendredi","samedi","dimanche"],d=["L","M","M","J","V","S","D"],c=["janvier","fevrier","mars","avril","mai","juin","juillet","aout","septembre","octobre","novembre","decembre"],l=new Date(1900,0,1),i=new Date(2100,11,31),o=function(e){var a=e[0]%12;return[0>a?a+12:a,e[1]+Math.floor(e[0]/12)]};return{restrict:"E",require:"^ngModel",template:'<div class="datepicker">    <div class="datepicker header md-primary" layout="column" layout-align="center center" ><div class="datepicker header day {{animateDate}}"> {{frenchDay[calculateDay(pickDate.getDay())]}}</div> <div class="datepicker header body">     <div class="mounth">{{frenchMounth[pickDate.getMonth()]}}</div>     <div class="day">{{pickDate.getDate()}}</div>     <div class="year">{{pickDate.getFullYear()}}</div> </div> </div> <div class="datepicker content body">    <div class="mounth" layout="row" >         <md-button  class="left button" flex  ng-click="previousMounth()" ng-disabled="selectMounth<=0" flex>           <                </md-button>         <span >{{frenchMounth[months[selectMounth].mounth]}} {{months[selectMounth].year}}</span>         <md-button  class="right button " flex ng-click="nextMounth()" ng-submit="false" ng-disabled="selectMounth >= months.length -1"  flex>             >         </md-button>     </div>     <div class="calendarNumber">         <div  class="row title-day" >             <div ng-repeat=" day in frenchMinDay track by $index"  class="calendarDayNumber " flex>{{day}} </div>         </div>        <div ng-repeat=" weeks in months[selectMounth].weeks track by $index"  class="row" >            <div ng-repeat=" day in weeks track by $index"  class="calendarDayNumber" flex>                <div ng-if="day === undefined" class="day" noflex></div>                <div ng-if="day != undefined" class="day"  enabled="{{day.enabled}}" data-date="{{day.n}}"  date-selected="{{day.n == pickDate.getDate() && months[selectMounth].mounth == pickDate.getMonth() && months[selectMounth].year == pickDate.getFullYear() }}"  noflex>                    <md-button class="md-fab" ng-disabled="!day.enabled" ng-click="selectedDate(months[selectMounth].year,months[selectMounth].mounth,day.n )">                       <span>{{day.n}}</span>                   </md-button>               </div>             </div>         </div>     </div>     <div class="calendar-action"  layout="row">       <md-button flex ng-click="cancel()">Cancel</md-button>       <md-button flex ng-click="save()">OK</md-button>    </div></div> </div>',link:t,scope:{date:"=?",mindate:"=?",maxdate:"=?",_modelValue:"=ngModel",format:"=?",onok:"=?",oncancel:"=?"}}}]);