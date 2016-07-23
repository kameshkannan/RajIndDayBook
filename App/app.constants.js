////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// This file is the GLobal Constants file used across this Application
// 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var SERVICE_API = {
    GETDAYBOOK: "RajIndustries/GetDayBook",
};

var RAJIND = {

    //Application Modules 
    SERVICES_MODULE: "RAJIND.Services",
    DAYBOOK_MODULE: "RAJIND.DayBook",
    CONFIGURE_BANK_MODULE: "RAJIND.ConfigureBank",
    CONFIGURE_BANKTRAN_MODULE: "RAJIND.ConfigureBankTran",
    DAYBOOK_CONSTANTS_MODULE: "RAJIND.DayBook_Constants",
    BANK_TRANSACTIONS_MODULE: "RAJIND.BankTransactions",
    VIEW_TRNSACTIONS_MODULE: "RAJIND.ViewTransactions",

    DASHBOARD_MODULE:"RAJIND.DashBoard",

    //Directive Modules
    DAYBOOK_DIRECTIVE_MODULE: "RAJIND.DayBook.Directives",

    //URL Constants
    DAYBOOK_WEBAPI_URL: window.localStorage.getItem("webApiURL") + SERVICE_API.GETDAYBOOK
};