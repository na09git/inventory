using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MYBUSINESS.Models
{
    public class DashboardViewModel
    {
        //public IQueryable<Customer> Customers { get; set; }
        //public Customer Customer { get; set; }
        public IQueryable<SO> SOes { get; set; }
        public IQueryable<Customer> Customers { get; set; }
        //public List<SOD> SaleOrderDetail { get; set; }
        public IQueryable<Product> Products { get; set; }
        //public Product Product { get; set; }
        public IQueryable<PO> POes { get; set; }

        //public IQueryable<CustomersWiseSaleViewModel> CWS { get; set; }


    }


}