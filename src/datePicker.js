/**
 * Created by karab on 16/02/15.
 */

angular.module('md-datepicker',[])
    .directive('datepicker',['$filter',function( $filter) {
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

        function controller($scope, $element){
           
        }

        function link(scope, element, attrs){
            scope.frenchDay = frenchDay;
            scope.frenchMounth = frenchMounth;
            scope.frenchMinDay = frenchMinDay;
            scope.pickDate = new Date();
            scope.animateDate = "animateDate"
            var startDayOfWeek= 1; /* Day begin by Sunday in javasript 0:Sunday, 1:Monday, ... */
            scope.months = [];
            scope.selectMounth = 0;
            scope.calendarDay = [];

            try{
                if(scope.mindate){
                    var mindateArray =  scope.mindate.split('/');
                    min = new Date(parseInt(mindateArray[1]),parseInt(mindateArray[0]) -1,1);
                }
                if(scope.maxdate){
                    var maxdateArray =  scope.maxdate.split('/');
                    max = new Date(parseInt(maxdateArray[1]),parseInt(maxdateArray[0]) -1,1);
                }
            }catch(e){
                console.log(e);
            }
            

            scope.calculateDay = function(dateDay){
                return (dateDay - startDayOfWeek + 7) % 7;
            };

            var date, start, end, currentDay, curMonth, curYear ;
            start = cleanMonthDateArrayObject([min.getMonth(),min.getFullYear()]);
            end = cleanMonthDateArrayObject([max.getMonth(),max.getFullYear()]);
            currentDay= scope.pickDate.getDate();
            curMonth = start[0];
            curYear = start[1];
            var date, startPoint, endPoint;

            scope.months = [];
            while(curYear < end[1] || (curYear == end[1] && curMonth <= end[0])){

                var month = {
                    weeks:[],
                    days: [],
                    name: "",
                    mounth: curMonth,
                    year: curYear
                };

                date = new Date(curYear, curMonth, 1);
                startPoint = scope.calculateDay(date.getDay());
                month.name = frenchMounth[curMonth];
                date = new Date(curYear, curMonth +1, 0); /*Last day in same mounth*/
                endPoint = date.getDate();

                for(var i=0;i<startPoint;i++){
                    month.days.push(undefined);
                }

                for(var i=1;i<=endPoint;i++){
                    var thisDate = new Date(curYear, curMonth, i);
                    month.days.push({
                        n:i,
                        day: frenchDay[scope.calculateDay(thisDate.getDay())],
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

                if (month.year < scope.pickDate.getFullYear() || ( month.year == scope.pickDate.getFullYear() && month.mounth < scope.pickDate.getMonth())){
                    scope.selectMounth++;
                };
                 
                scope.months.push(month);

                curMonth++;
                if(curMonth == 12){
                    curMonth = 0;
                    curYear++;
                }

            }
            console.log(scope.months)
            var format = attrs.format || 'shortDate';
            scope.nextMounth = function(){
                scope.selectMounth++;
                return false;
            };
            scope.previousMounth = function(){
                scope.selectMounth--;
            };
            scope.selectedDate = function(year,month,day){
                scope.pickDate = new Date(year,month,day);
                if(scope.animateDate == "scope.animateDate"){
                    scope.animateDate = "";
                }else{
                    scope.animateDate = "animateDate";
                }
            }

            scope.save = function(){
                scope._modelValue = $filter('date')(scope.pickDate, format);
               // ngModel.$setDirty();
            }


            
            
        }
        return{
            restrict : 'E',
            require: '^ngModel',
            template : '<div class="datepicker">'+ 
                       '    <div class="datepicker header md-primary" layout="column" layout-align="center center" >' +
                        '<div class="datepicker header day {{animateDate}}"> {{frenchDay[calculateDay(pickDate.getDay())]}}</div> '+
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
                    '               <div ng-if="day === undefined" class="day" noflex></div> '+
                    '               <div ng-if="day != undefined" class="day"  enabled="{{day.enabled}}" data-date="{{day.n}}"  date-selected="{{day.n == pickDate.getDate() && months[selectMounth].mounth == pickDate.getMonth() && months[selectMounth].year == pickDate.getFullYear() }}"  noflex> '+
                    '                   <md-button class="md-fab" ng-click="selectedDate(months[selectMounth].year,months[selectMounth].mounth,day.n )">'+
                    '                       <span>{{day.n}}</span> '+
                    '                  </md-button>'+
                    '               </div> '+
                    '            </div> '+
                    '        </div> '+
                    '    </div> '+
                    '    <div class="calendar-action"  layout="row">'+
                    '       <md-button flex>Cancel</md-button>'+
                    '       <md-button flex ng-click="save()">OK</md-button>'+
                    '    </div>'+
                    '    <div>Mois + année slide</div> '+
                    '    <div>Calendar</div> '+
                    '    <div> pickDate.getMonth() == {{pickDate.getMonth()}}'+
                    '    <div> selectMounth == {{selectMounth}}</div> '+
                    '</div> '+
                    '</div>',
                   
            link : link,
           scope : {
                date : '=?',
                mindate : '=?', /* format M/yyyy en_US locale */
                maxdate : '=?',
                _modelValue: '=ngModel',
                format : '=?'

             }
        }
    }]);

