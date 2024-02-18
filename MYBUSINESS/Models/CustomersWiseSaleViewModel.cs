using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MYBUSINESS.Models
{
    public class CustomersWiseSaleViewModel
    {
        public int CustomerId { get; set; }
        public string CustomerName { get; set; }
        public int SaleOrderQty { get; set; }
        public decimal SaleOrderAmount { get; set; }
        public int SaleReturnQty { get; set; }
        public decimal SaleReturnAmount { get; set; }
        public decimal Discount { get; set; }

        //public object CustomerId { get; set; }

        //public object SaleOrderQty { get; set; }
        //public object SaleOrderAmount { get; set; }
        //public object SaleReturnQty { get; set; }
        //public object SaleReturnAmount { get; set; }
        //public object Discount { get; set; }
    }
}