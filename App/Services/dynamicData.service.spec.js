
/// <reference path="C:\0_Curr\UAP\UA\UCA\WF.UAP.UA.UCA\Global/Scripts/Lib/angular 1.4/jquery-2.1.4.js"/>
/// <reference path="C:\0_Curr\UAP\UA\UCA\WF.UAP.UA.UCA\Global/Scripts/Lib/angular 1.4/angular.js" />
/// <reference path="C:\0_Curr\UAP\UA\UCA\WF.UAP.UA.UCA\Global/Scripts/Lib/angular 1.4/angular-mocks.js"/>
/// <reference path="C:\0_Curr\UAP\UA\UCA\WF.UAP.UA.UCA\Global/Scripts/Lib/angular 1.4/jasmine.js"/>
/// <reference path="C:\0_Curr\UAP\UA\UCA\WF.UAP.UA.UCA\Global/Scripts/Lib/angular 1.4//jasmine-html.js"/>


/// <reference path="../app.constants.js" />
/// <reference path="app.service.module.js" />
/// <reference path="dynamicData.service.js" />

describe("Dynamic Data Service Test Suite", function () {
    var scope;
    var achService;
    var response;

    beforeEach(function () {

        module('UCACS.Services');

        inject(function ($injector) {
            achService = $injector.get("dynamicDataService");
        });
    });


    describe("ACH Service", function () {
        it("should have the service method defined - use MOCK", function () {
            spyOn(achService, 'getAchAccountNumbers');
            expect(achService.getAchAccountNumbers).toBeDefined();
        });

        it("should call the actual service", function () {
            expect(achService.getAchAccountNumbers).not.toBeNull();
        });
    })
});