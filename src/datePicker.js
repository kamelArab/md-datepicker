/**
 * Created by karab on 16/02/15.
 */

angular.module('md-datepicker',[])
    .directive('datepicker',['$compile',function($compile) {
        'use strict';

        var frenchDay = ['lundi', 'mardi' , 'mercredi' , 'jeudi' , 'vendredi', 'samedi','dimanche'];
        var frenchMinDay = ['L', 'M' , 'M' , 'J' , 'V', 'S','D'];
        var frenchMounth = ['janvier' , 'fevrier', 'mars' , 'avril' , 'mai' ,'juin' , 'juillet' , 'aout', 'septembre' , 'octobre' , 'novembre' , 'decembre'];


        /**
         * Lowest selectable date (inclusive)
         *
         * @attribute min
         * @type Date
         * @default 1/1/1900
         */
        var min = new Date(1900,0,1);

        /**
         * Highest selectable date (inclusive)
         *
         * @attribute max
         * @type Date
         * @default 31/12/2100
         */
         var max = new Date(2100,11,31);
        var cleanMonthDateArrayObject = function(obj){
            var m = obj[0] % 12;
            return [m < 0 ? m + 12: m, obj[1]+Math.floor(obj[0]/12)];
        };

        function link(scope, element, attrs){
            scope.frenchDay = frenchDay;
            scope.frenchMounth = frenchMounth;
            scope.frenchMinDay = frenchMinDay;
            scope.pickDate = new Date();
            scope.currentYear, scope.currentMonth , scope.currentDay = 0;
            var loadedRange = 14;
            var triggerRange = 1;
            var loadPerTrigger = 7;
            var weekDayNames = [];
            var startDayOfWeek= 1; /* Day begin by Sunday in javasript 0 :Sundat 1 Monday */
            scope.months = [];
            scope.selectMounth = 0;
            var nonNumericDates = false;
            scope.calendarDay = [];
            scope.calculateDay = function(dateDay){
                return (dateDay - startDayOfWeek + 7) % 7;
            };

            var date, start, end;
            start = cleanMonthDateArrayObject([scope.pickDate.getMonth(),scope.pickDate.getFullYear()]);
            end = cleanMonthDateArrayObject([12,2100]);
            scope.currentDay= scope.pickDate.getDate();
            scope.curMonth = start[0];
            scope.curYear = start[1];
            var date, startPoint, endPoint

            scope.months = [];
            while(scope.curYear < end[1] || (scope.curYear == end[1] && scope.curMonth <= end[0])){

                var month = {
                    weeks:[],
                    days: [],
                    name: "",
                    mounth: scope.curMonth,
                    year: scope.curYear
                };

                date = new Date(scope.curYear, scope.curMonth, 1);
                startPoint = scope.calculateDay(date.getDay());
                month.name = frenchMounth[scope.curMonth];/*Intl.DateTimeFormat(this.locale, {month: 'long', year: 'numeric' }).format(date);*/
                date = new Date(scope.curYear, scope.curMonth, 0);
                endPoint = date.getDate();

                for(var i=0;i<startPoint;i++){
                    month.days.push(undefined);
                }

                for(var i=1;i<=endPoint;i++){
                    var thisDate = new Date(scope.curYear, scope.curMonth, i);
                    month.days.push({
                        n:i,
                        day: frenchDay[thisDate.getDay()]/*this.intl.day(thisDate)*/,
                        enabled: thisDate >= min && thisDate <= max
                    });
                }
                for(var i=0; i<=5 ; i++){
                    var start = i*7;
                    var add = 7;
                    var tmpWeek = month.days.slice(start, i*7 + add);
                    while(tmpWeek.length <7){
                        tmpWeek.push(undefined);
                    }
                    month.weeks.push( tmpWeek);
                }

                scope.months.push(month);

                scope.curMonth++;
                if(scope.curMonth == 13){
                    scope.curMonth = 1;
                    scope.curYear++;
                }

            }
            scope.nextMounth = function(){
                scope.selectMounth++;
                return false;
            };
            scope.previousMounth = function(){
                scope.selectMounth--;
            };
            scope.selectedDate = function(year,month,day){
                scope.pickDate = new Date(year,month,day);
            }
            
            console.log(scope.months)

        }
        return{
            restrict : 'E',
            template : '<div class="datepicker">'+ 
                       '    <div class="datepicker header md-primary" layout="column" layout-align="center center" >' +
                        '<div class="datepicker header day"> {{frenchDay[calculateDay(pickDate.getDay())]}}</div> '+
                        '<div class="datepicker header body"> '+
                        '    <div class="mounth">{{frenchMounth[pickDate.getMonth()]}}</div> '+
                        '    <div class="day">{{pickDate.getDate()}}</div> '+
                        '    <div class="year">{{pickDate.getFullYear()}}</div> '+
                        '</div> '+
                    '</div> '+
                    '<div class="datepicker content body"> '+
                     '   <div class="mounth" layout="row" > '+
                    '        <md-button  class="left button" flex  ng-click="previousMounth()" ng-disabled="selectMounth<=0" flex> '+
                     '          <        '+
                    '        </md-button> '+
                    '        <span >{{frenchMounth[months[selectMounth].mounth]}} {{months[selectMounth].year}}</span> '+
                    '        <md-button  class="right button " flex ng-click="nextMounth()" ng-submit="false" flex> '+
                    '            > '+
                    '        </md-button> '+
                    '    </div> '+
                    '    <div class="calendarNumber"> '+
                    '        <div  class="row title-day" > '+
                    '            <div ng-repeat=" day in frenchMinDay track by $index"  class="calendarDayNumber " flex>{{day}} </div> '+
                    '        </div> '+
                    '       <div ng-repeat=" weeks in months[selectMounth].weeks track by $index"  class="row" > '+
                    '           <div ng-repeat=" day in weeks track by $index"  class="calendarDayNumber" flex> '+
                    '                  <div ng-if="day === undefined" class="day" noflex></div> '+
                    '                 <div ng-if="day != undefined" class="day"  enabled="{{day.enabled}}" data-date="{{day.n}}"    noflex> '+
                    '                      <md-button class="md-fab" ng-click="selectedDate(months[selectMounth].year,months[selectMounth].mounth,day.n )">'+
                    '                       <span>{{day.n}}</span> '+
                    '                       </md-button>'+
                    '                  </div> '+
                    '            </div> '+
                    '        </div> '+
                    '    </div> '+
                    '    <div>Mois + année slide</div> '+
                    '    <div>Calendar</div> '+
                    
                    '    <div> selectMounth == {{selectMounth}}</div> '+
                    '</div> '+
                    '</div>',
            link : link
           /* scope : {
                beginDate : '='
            }*/
        }
    }]);

