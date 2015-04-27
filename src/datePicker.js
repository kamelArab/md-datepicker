/**
 * Created by karab on 16/02/15.
 */

angular.module('md-datepicker.service',[])
    .factory('datepickerSrv',['$locale','$filter', function($locale, $filter){
        'use strict';

        var startDayOfWeek = 1; /* Day begin by Sunday in javasript 0:Sunday, 1:Monday, ... */

        var tmpSmallDay,verySmallDay;
        var initStartDay = function(startDay){
            if(angular.isDefined(startDay)){
                startDayOfWeek = parseInt(startDay);
            }

            if(startDayOfWeek>0){
                tmpSmallDay = $locale.DATETIME_FORMATS.DAY.slice(startDayOfWeek).concat($locale.DATETIME_FORMATS.DAY.slice(0, startDayOfWeek));
            }else{
                tmpSmallDay = $locale.DATETIME_FORMATS.DAY
            }
            verySmallDay =  tmpSmallDay.map( function(value){
                return value.substring(0,1).toUpperCase();
            });
            return verySmallDay
        }


        tmpSmallDay = $locale.DATETIME_FORMATS.DAY.slice(startDayOfWeek).concat($locale.DATETIME_FORMATS.DAY.slice(0, startDayOfWeek));
        verySmallDay =  tmpSmallDay.map( function(value){
            return value.substring(0,1).toUpperCase();
        });

        //polyfill Array.prototype.findIndex
        // Array.prototype.findIndex ( predicate [ , thisArg ] ) :
        //Draft for 6th Edition  ECMA-262 (ES6)
        // http://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.prototype.findindex
        if (!Array.prototype.findIndex) {
            Array.prototype.findIndex = function(predicate) {
                if (this == null) {
                    throw new TypeError('Array.prototype.findIndex appelé sur null ou undefined');
                }
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate doit être une fonction');
                }
                var list = Object(this);
                var length = list.length >>> 0;
                var thisArg = arguments[1];
                var value;

                for (var i = 0; i < length; i++) {
                    value = list[i];
                    if (predicate.call(thisArg, value, i, list)) {
                        return i;
                    }
                }
                return -1;
            };
        }
        /**
         *obj : array with mounth and year ex: [1,2015] February 2015
         *
         * return array [nounth, year] ex: cleanMonthDateArrayObject([15,2014]) = [3,2015]
         * */
        var cleanMonthDateArrayObject = function(obj){
            var m = obj[0] % 12;
            return [m < 0 ? m + 12: m, obj[1]+Math.floor(obj[0]/12)];
        };
        /**
         * This function return a array of all mounth between minDate and maxDate
         *   var month = {
         *          weeks:[], //
         *          days: [],
         *          name: "",  //Name of mouth
         *          mounth: curMonth, // (int) mounth
         *          year: curYear
         *    };
         * @param minDate
         * @param maxDate
         * @param date
         * @param startday Start day of week  0:Sunday, 1:Monday... Default startday == startDayOfWeek == 1
         */


        var getMountDto = function(minDate, maxDate,  startday){
            if(angular.isUndefined(startday)){
                startday = startDayOfWeek
            }
            var start, end, currentDay, curMonth, curYear ;
            start = cleanMonthDateArrayObject([minDate.getMonth(),minDate.getFullYear()]);
            end = cleanMonthDateArrayObject([maxDate.getMonth(),maxDate.getFullYear()]);
            curMonth = start[0];
            curYear = start[1];
            var dateTmp, startPoint, endPoint;

            var months = [];
            while(curYear < end[1] || (curYear == end[1] && curMonth <= end[0])){

                var month = {
                    weeks:[],
                    days: [],
                    name: "",
                    mounth: curMonth,
                    year: curYear
                };
                dateTmp = new Date(curYear, curMonth, 1);
                startPoint = calculateDay(dateTmp.getDay(), startday);
                month.name = $filter('date')(dateTmp, "MMMM");
                dateTmp = new Date(curYear, curMonth +1, 0); /*Last day in same mounth*/
                endPoint = dateTmp.getDate();

                for(var i=0;i<startPoint;i++){
                    month.days.push(undefined);
                }

                for(var i=1;i<=endPoint;i++){
                    var thisDate = new Date(curYear, curMonth, i);
                    month.days.push({
                        n:i,
                        day: $locale.DATETIME_FORMATS.DAY[calculateDay(thisDate.getDay(), startday)],
                        enabled: thisDate >= minDate && thisDate <= maxDate
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
                months.push(month);

                curMonth++;
                if(curMonth == 12){
                    curMonth = 0;
                    curYear++;
                }
            }
            return months

        }
        var getIndexOfDate = function(months, date){
            var index = -1;
            if(!angular.isDate(date)){
                return index;
            }else{
                var curMount = date.getMonth();
                var curYear = date.getFullYear();
                index =  months.findIndex(function(month){
                    return month.year == curYear && month.mounth == curMount;
                    });
            }
            return index
        };
        var calculateDay = function(dateDay, startDay){
            if(angular.isUndefined(startDay)){
                startDay = startDayOfWeek
            }
            return (dateDay - startDay + 7) % 7;
        };
        return {
            initStartDay : initStartDay,
            getMountDto : getMountDto,
            getIndexOfDate : getIndexOfDate,
            getVerySmallDay : verySmallDay

        }
    }]);
angular.module('md-datepicker',['md-datepicker.service']).directive('datepicker',['$filter','$parse','datepickerSrv',function($filter, $parse, datepickerSrv) {
        'use strict';


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
            $scope.frenchMinDay = datepickerSrv.initStartDay($scope.starDayOfWeek);
        }

        function link(scope, element, attrs){

            scope.pickDate = new Date();
            scope.pickDateSelect = $filter('date')(scope.pickDate, 'yyyyMd');
            scope.animateDate = "animateDate";
            var startDayOfWeek= 1; /* Day begin by Sunday in javasript 0:Sunday, 1:Monday, ... */
            scope.months = [];
            scope.selectMounth = 0;
            scope.calendarDay = [];
            scope.validateFn = angular.noop;
            scope.cancelFn = angular.noop;
            scope.okLabelButtom = "OK";
            scope.cancelLabelButtom = "Cancel"

            try{
                if(angular.isDate(scope.date)){
                    scope.pickDate = scope.date;
                    scope.pickDateSelect = $filter('date')(scope.pickDate, 'yyyyMd');
                }
                if(angular.isDate(scope.mindate)){
                    min = scope.mindate;
                }
                if(angular.isDate(scope.maxdate)){
                    max = scope.maxdate;
                }
                if(scope.onok){
                    scope.validateFn = $parse(scope.onok); 
                }
                if(scope.oncancel){
                    scope.cancelFn = $parse(scope.oncancel); 
                }
                if(scope.oklabel){
                    scope.okLabelButtom = scope.oklabel;
                }
                if(scope.cancellabel){
                    scope.cancelLabelButtom = scope.cancellabel;
                }
                if(scope.starDayOfWeek){
                    startDayOfWeek = scope.starDayOfWeek;
                }



            }catch(e){
                console.log(e);
            }

            scope.months = datepickerSrv.getMountDto(min, max, scope.pickDate, startDayOfWeek);
            scope.selectMounth = datepickerSrv.getIndexOfDate(scope.months, scope.pickDate);

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
                scope.pickDateSelect = $filter('date')(scope.pickDate, 'yyyyMd');
                if(scope.animateDate == "scope.animateDate"){
                    scope.animateDate = "";
                }else{
                    scope.animateDate = "animateDate";
                }
            }

            scope.save = function(){
                scope._modelValue = $filter('date')(scope.pickDate, format);
                scope.validateFn();
                
               // ngModel.$setDirty();
            }
             scope.cancel = function(){
                scope.cancelFn();
                
               // ngModel.$setDirty();
            }
            scope.dateSelected = function(year,month,day){
                return (scope.pickDateSelect == year+""+(month+1)+""+day+"")?"dateSelected":"";

            }
            
        }
        return{
            restrict : 'E',
            require: '^ngModel',
            template : '<div class="datepicker">'+ 
                       '    <div class="datepicker header md-primary" layout="column" layout-align="center center" >' +
                        '<div class="datepicker header day {{animateDate}}"> {{ pickDate | date:"EEEE" }}</div> '+
                        '<div class="datepicker header body"> '+
                        '    <div class="mounth">{{ pickDate | date:"MMMM" }}</div> '+
                        '    <div class="day">{{pickDate.getDate()}}</div> '+
                        '    <div class="year">{{pickDate.getFullYear()}}</div> '+
                        '</div> '+
                    '</div> '+
                    '<div class="datepicker content body"> '+
                     '   <div class="mounth" layout="row" > '+
                    '        <md-button  class="left button" flex  ng-click="previousMounth()" ng-disabled="selectMounth<=0" flex> '+
                     '          <        '+
                    '        </md-button> '+
                    '        <span >{{ months[selectMounth].name }} {{months[selectMounth].year}}</span> '+
                    '        <md-button  class="right button " flex ng-click="nextMounth()" ng-submit="false" ng-disabled="selectMounth >= months.length -1"  flex> '+
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
                    '               <div ng-if="day != undefined" class="day"  enabled="{{day.enabled}}" data-date="{{day.n}}"  ng-class="dateSelected(months[selectMounth].year,months[selectMounth].mounth,day.n )"  noflex> '+
                    '                   <md-button class="md-fab" ng-disabled="!day.enabled" ng-click="selectedDate(months[selectMounth].year,months[selectMounth].mounth,day.n )">'+
                    '                       <span>{{day.n}}</span> '+
                    '                  </md-button>'+
                    '               </div> '+
                    '            </div> '+
                    '        </div> '+
                    '    </div> '+
                    '    <div class="calendar-action"  layout="row">'+
                    '       <md-button flex ng-click="cancel()" flex>{{cancelLabelButtom}}</md-button>'+
                    '       <md-button flex ng-click="save()" flex>{{okLabelButtom}}</md-button>'+
                    '    </div>'+
                    '</div> '+
                    '</div>',
                   
            link : link,
            controller :controller,
            scope : {
                date : '=?',
                mindate : '=?', /* date */
                maxdate : '=?',
                _modelValue: '=ngModel',
                format : '=?',
                onok : '=?',
                oncancel : '=?',
                oklabel : "=?",
                cancellabel: "=?",
                starDayOfWeek : "@?"
            }
        }
    }]);

