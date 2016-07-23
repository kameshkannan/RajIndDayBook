(function () {

    'use strict';

    angular.module(UCACS.SERVICES_MODULE).factory("disclosureService", disclosureService);

    disclosureService.$inject = ["$window", "viewDataService", "staticDataService"];

    function disclosureService($window, viewDataService, staticDataService) {
        var service = {};
        service.staticDisclosureData = staticDataService.disclosuresbyLanguage;

        //The below class is the Model used for setting the input parameters for Disclosure which is going to opened in new Window
        function InputModel() {
            this.language = "",
            this.SCRA = "",
            this.state = "",
            this.email = "",
            this.source = ""
        };

        service.disclosureInput = new InputModel();        
        service.showDisclosure = showDisclosure;
        service.setDisclosureStorage = setDisclosureStorage;
        service.setDisclosureViewModelStorage = setDisclosureViewModelStorage;
        service.setDisclosureStaticData = setDisclosureStaticData;

        function showDisclosure() {
            var getDisclosures = JSON.stringify(viewDataService.getDisclosures());
            this.setDisclosureStorage(JSON.stringify(this.disclosureInput));
            this.setDisclosureViewModelStorage(getDisclosures);
            //Set disclosure content from static data service
            this.setDisclosureStaticData(JSON.stringify(this.staticDisclosureData));
            openDisclosureWindow("Components/Disclosures/disclosure.html", "Disclosures", 1000, 700);
                                                                                    
        }

        function openDisclosureWindow(url, title, w, h) {
            // Fixes dual-screen position                         Most browsers      Firefox
            var dualScreenLeft = $window.screenLeft != undefined ? $window.screenLeft : screen.left;
            var dualScreenTop = $window.screenTop != undefined ? $window.screenTop : screen.top;

            var width = $window.innerWidth ? $window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
            var height = $window.innerHeight ? $window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

            var left = ((width / 2) - (w / 2)) + dualScreenLeft;
            var top = ((height / 2) - (h / 2)) + dualScreenTop;
            var newWindow = $window.open(url, title, 'location=0, status=0, resizable=1, scrollbars=1, menubar=0, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

            // Puts focus on the newWindow
            if ($window.focus) {
                newWindow.focus();
            }
        }

        function setDisclosureStorage(val) {
            $window.localStorage && $window.localStorage.setItem('disclosureInput', val);
            return this;
        }

        function setDisclosureViewModelStorage(val) {
            $window.localStorage && $window.localStorage.setItem('disclosureViewModel', val);
            return this;
        }

        function setDisclosureStaticData(val) {
            $window.localStorage && $window.localStorage.setItem('disclosureStaticData', val);
            return this;
        }

        return service;
    }


})();