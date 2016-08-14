using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace RajIndServices.Controllers
{
    //[EnableCorsAttribute("http://localhost/", "*", "*")]
    public class DaybookController : ApiController
    {
        public List<DayBook> Get()
        {

            var daybook = new List<DayBook>{
                new DayBook {Id = 1, Particulars = "To Hi-Tech Farms", ConfiguredTranId = 2, BankId = 3, TransferModeId = 1, CashPayment = 2400, CashReceipt = 0},
                new DayBook {Id = 2, Particulars = "To Dharanee", ConfiguredTranId = 1, BankId = 1, TransferModeId = 1, CashPayment = 2500, CashReceipt = 0},
                new DayBook {Id = 3, Particulars = "To Dharanee", ConfiguredTranId = 1, BankId = 2, TransferModeId = 3, CashPayment = 3000, CashReceipt = 0},
                new DayBook {Id = 3, Particulars = "By Sales", ConfiguredTranId = 0, BankId = 0, TransferModeId = 0, CashPayment = 0, CashReceipt = 3000}
            };

            //var daybook = new List<DayBook>()({ 
            //    new DayBook
            //{
            //    Id = 1,
            //    Particulars = "By Sales",
            //    ConfiguredTranId = 0,
            //    BankId = 0,
            //    TransferModeId = 0,
            //    CashPayment = 0,
            //    CashReceipt = 3400
            //}});

            return daybook.ToList();
        }
    }
}
