/**
 * Created by karab on 27/04/15.
 */

describe('Unit : Testing datepickerSrv Service', function(){

    var factory;


    beforeEach(module('md-datepicker.service'));
    beforeEach(inject(function (_datepickerSrv_, $locale, $filter) {
        factory = _datepickerSrv_;
    }));




    it('should have a initStartDay function', function() {
        expect(angular.isFunction(factory.initStartDay)).toBe(true);
    });

    it('should have a initStartDay with  param 0 ', function() {
        var usSmallDay = factory.initStartDay(0);
        expect(usSmallDay).toEqual(['D','L','M','M','J','V','S']);
    });

    it('should have a initStartDay with param ', function() {
        var usSmallDay = factory.initStartDay();
        expect(usSmallDay).toEqual(['L','M','M','J','V','S','D']);
    });



    it('should have a getMountDto function', function() {
        expect(angular.isFunction(factory.getMountDto)).toBe(true);
    });


  /*  it('should return an answer', function() {
        var result = factory.initAnswer(questions);
        var numberAnswer = 0;
        angular.forEach(result, function(value, key){
            numberAnswer =numberAnswer + 1;
        });

        expect(result.currentPage).toBe(1);
        expect(numberAnswer).toBe(questions.length);
    });

    it('Check Double luck', function() {
        var result = factory.initAnswer(questions);
        result['5'] = "test 1234";
        expect(factory.isDoubleLuck(1,result)).toBe(true);
        result['5'] = "";
        expect(factory.isDoubleLuck(1,result)).toBe(false);
        result['19'] = "test 1234";
        expect(factory.isDoubleLuck(1,result)).toBe(false);
    });
*/
});
