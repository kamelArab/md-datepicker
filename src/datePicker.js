/**
 * Created by karab on 16/02/15.
 */

angular.module('md-datepicker',[])
    .directive('datepicker',['$compile',function($compile) {
        'use strict';

        // WTF Day begin by Sunday in javasript
        var frenchDay = ['dimanche','lundi', 'mardi' , 'mercredi' , 'jeudi' , 'vendredi', 'samedi'];
        var frenchMinDay = ['D','L', 'M' , 'M' , 'J' , 'V', 'S'];
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
        }
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
            var startDayOfWeek= 1;
            scope.months = [];
            scope.selectMounth = 0;
            var nonNumericDates = false;
            scope.calendarDay = [];

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
                    number: scope.curMonth,
                    year: scope.curYear
                };

                date = new Date(scope.curYear, scope.curMonth, 1);
                startPoint = (date.getDay() - startDayOfWeek + 7) % 7;
                month.name = frenchMounth[scope.curMonth];/*Intl.DateTimeFormat(this.locale, {month: 'long', year: 'numeric' }).format(date);*/
                date = new Date(scope.curYear, scope.curMonth, 0);
                endPoint = date.getDate();

                for(var i=0;i<=startPoint;i++){
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
                    month.weeks.push( month.days.slice(start, i*7 + add));
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

        }
        return{
            restrict : 'E',
            template : '<div class="datepicker">'+ 
                       '    <div class="datepicker header md-primary" layout="column" layout-align="center center" >' +
                        '<div class="datepicker header day"> {{frenchDay[pickDate.getDay()]}}</div> '+
                        '<div class="datepicker header body"> '+
                        '    <div class="mounth">{{frenchMounth[months[0].number]}}</div> '+
                        '    <div class="day">{{pickDate.getDate()}}</div> '+
                        '    <div class="year">{{months[0].year}}</div> '+
                        '</div> '+
                    '</div> '+
                    '<div class="datepicker content body"> '+
                     '   <div class="mounth" layout="row"> '+
                    '        <md-button  class="left button" flex  ng-click="previousMounth()" ng-disabled="selectMounth<=0"> '+
                     '          <        '+
                    '        </md-button> '+
                    '        <span flex>{{frenchMounth[months[selectMounth].number]}} {{months[selectMounth].year}}</span> '+
                    '        <md-button  class="right button " flex ng-click="nextMounth()" ng-submit="false" > '+
                    '            > '+
                    '        </md-button> '+
                    '    </div> '+
                    '    <div class="calendarNumber"> '+


                    '        <div  class="row" > '+
                    '            <div ng-repeat=" day in frenchMinDay track by $index"  class="calendarDayNumber " flex>{{day}} </div> '+
                    '        </div> '+
                    '       <div ng-repeat=" weeks in months[selectMounth].weeks track by $index"  class="row" > '+
                    '           <div ng-repeat=" day in weeks track by $index"  class="calendarDayNumber" > '+
                    '              <div ng-if="day === undefined"> '+
                    '                  <div class="day"></div> '+
                    '              </div> '+
                    '              <div ng-if="day != undefined"  > '+
                    '                 <div class="day" enabled="{{day.enabled}}" data-date="{{day.n}}" data-month="{{month.number}}" data-year="{{month.year}}"> '+
                    '                     <span>{{day.n}}</span> '+
                    '                    </div> '+
                    '                </div> '+
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

