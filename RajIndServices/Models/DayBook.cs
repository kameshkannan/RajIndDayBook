using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RajIndServices.Controllers
{
    public class DayBook
    {
        public int Id { get; set; }
        public String Particulars { get; set; }
        public int ConfiguredTranId { get; set; }
        public int BankId { get; set; }
        public int TransferModeId { get; set; }
        public int CashReceipt { get; set; }
        public int CashPayment { get; set; }

    }
}
