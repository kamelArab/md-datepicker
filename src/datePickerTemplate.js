angular.module("template/ng-datepicker.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/ng-datepicker.html",
    '      <div class="datepicker"> 
    <div class="datepicker header md-primary" layout="column" layout-align="center center" >
        <div class="datepicker header day"> {{frenchDay[pickDate.getDay()]}}</div>
        <div class="datepicker header body">
            <div class="mounth">{{frenchMounth[months[0].number]}}</div>
            <div class="day">{{pickDate.getDate()}}</div>
            <div class="year">{{months[0].year}}</div>
        </div>
    </div>
    <div class="datepicker content body">
        <div class="mounth" layout="row">

            <md-button type="button" class="left button" flex  ng-click="previousMounth()" ng-disabled="selectMounth<=0">
               
            </md-button>
            <span flex>{{frenchMounth[months[selectMounth].number]}} {{months[selectMounth].year}}</span>
            <md-button  class="right button " flex ng-click="nextMounth()" ng-submit="false" >
                >
            </md-button>
        </div>
        <div class="calendarNumber">


            <div  class="row" >
                <div ng-repeat=" day in frenchMinDay track by $index"  class="calendarDayNumber">{{day}} </div>
            </div>
            <div ng-repeat=" weeks in months[selectMounth].weeks track by $index"  class="row" >
                <div ng-repeat=" day in weeks track by $index"  class="calendarDayNumber" >
                    <div ng-if="day === undefined">
                        <div class="day"></div>
                    </div>
                    <div ng-if="day != undefined"  >
                        <div class="day" enabled="{{day.enabled}}" data-date="{{day.n}}" data-month="{{month.number}}" data-year="{{month.year}}">
                            <span>{{day.n}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>Mois + année slide</div>
        <div>Calendar</div>
    </div>
</div>');
}]);
