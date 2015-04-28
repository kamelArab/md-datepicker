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

    it('should getMountDto of mount april 2015 get mounth name and year', function(){

        var dateMine = new Date(2015, 3, 1);
        var dateMax = new Date(2015, 3, 30);
        var test = factory.getMountDto(dateMine,dateMax);

        expect(test.length).toBe(1);
        expect(test[0].name).toEqual("avril");
        expect(test[0].mounth).toEqual(3);
        expect(test[0].year).toEqual(2015);
    });

    it('should getMountDto of mount april 2015 first day week is undenied object with week begin monday', function(){

        var dateMine = new Date(2015, 3, 1);
        var dateMax = new Date(2015, 3, 30);
        var test = factory.getMountDto(dateMine,dateMax);
        expect(test[0].weeks[0][0]).toBe(undefined);
    });

    it('should getMountDto of mount april 2015 second day week is undenied object with week begin monday', function(){

        var dateMine = new Date(2015, 3, 1);
        var dateMax = new Date(2015, 3, 30);
        var test = factory.getMountDto(dateMine,dateMax);

        expect(test[0].weeks[0][1]).toBe(undefined);

    });

    it('should getMountDto  of mount april 2015 third day week is object with week begin monday', function(){

        var premierAvril ={
            n:1,
            day: "mercredi",
            enabled: true
        };

        var dateMine = new Date(2015, 3, 1);
        var dateMax = new Date(2015, 3, 30);
        var test = factory.getMountDto(dateMine,dateMax);
        expect(test[0].weeks[0][2]).toEqual(premierAvril);
    });

    it('should have a getIndexOfMounthDto function', function() {
        expect(angular.isFunction(factory.getIndexOfMounthDto)).toBe(true);
    });

    it('should getIndexOfMounthDto return index of date', function(){

        var dateMine = new Date(2015, 3, 1);
        var date = new Date(2015, 3, 20);
        var dateMax = new Date(2016, 3, 30);
        var test = factory.getMountDto(dateMine,dateMax);

        expect(factory.getIndexOfMounthDto(test,date)).toBe(0);

    });

    it('should getIndexOfMounthDto return index of date 2', function(){

        var dateMine = new Date(2015, 3, 1);
        var date2 = new Date(2016, 1, 20);
        var dateMax = new Date(2016, 3, 30);
        var test = factory.getMountDto(dateMine,dateMax);

        expect(factory.getIndexOfMounthDto(test,date2)).toBe(10);

    });

    it('should getIndexOfMounthDto return index -1 error', function(){

        var dateMine = new Date(2015, 3, 1);
        var date3 = new Date(2011, 1, 20);
        var dateMax = new Date(2016, 3, 30);
        var test = factory.getMountDto(dateMine,dateMax);

        expect(factory.getIndexOfMounthDto(test,date3)).toBe(-1);

    });
    it('should getIndexOfMounthDto return index -1 error', function(){

        var dateMine = new Date(2015, 3, 1);

        var dateMax = new Date(2016, 3, 30);
        var test = factory.getMountDto(dateMine,dateMax);

        expect(factory.getIndexOfMounthDto(test,"25/01/2016")).toBe(-1);
    });

});
