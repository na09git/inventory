using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MYBUSINESS.CustomClasses
{
    public class Utilities
    {
        /// <summary>
        /// minus returnTotal and discount from the OrderTotal and return Payable Amount
        /// </summary>
        /// <param name="OrderTotal"></param>
        /// <param name="returnTotal"></param>
        /// <param name="discount"></param>
        /// <returns></returns>
        public decimal GetPayableAmount(decimal OrderTotal, decimal returnTotal, decimal discount )
        {
            return OrderTotal - returnTotal - discount;
        }
        /// <summary>
        /// pass value of GetPayableAmount(decimal OrderTotal, decimal returnTotal, decimal discount) in first argument
        /// Amount Paid in second argument
        /// </summary>
        /// <param name="PayableAmount"></param>
        /// <param name="AmountPaid"></param>
        /// <returns></returns>
        public decimal GetBalanceAmount(decimal PayableAmount, decimal AmountPaid)
        {
            return PayableAmount - AmountPaid;
        }

    }
}