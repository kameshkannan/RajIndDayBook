
(function () {

    'use strict';

    angular.module("app", ['ngNewRouter',
        RAJIND.SERVICES_MODULE,
        RAJIND.DAYBOOK_MODULE,
        RAJIND.CONFIGURE_BANK_MODULE,
        RAJIND.CONFIGURE_BANKTRAN_MODULE,
        RAJIND.BANK_TRANSACTIONS_MODULE,
        RAJIND.VIEW_TRNSACTIONS_MODULE
    ]);

})();


