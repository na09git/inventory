using MYBUSINESS.CustomClasses;
using MYBUSINESS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace MYBUSINESS.Controllers
{
    public class HomeController : Controller
    {
        private BusinessContext db = new BusinessContext();
        //[NoCache]
        public ActionResult Index()
        {

            DateTime PKDate = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Pakistan Standard Time"));
            var dtStartDate = new DateTime(PKDate.Year, PKDate.Month, 1);
            var dtEndtDate = dtStartDate.AddMonths(1).AddSeconds(-1);

            
            ViewBag.Customers = db.Customers;
           

            ViewBag.StartDate = dtStartDate.ToString("dd-MMM-yyyy");
            ViewBag.EndDate = dtEndtDate.ToString("dd-MMM-yyyy");

            
            DashboardViewModel dbVM = new DashboardViewModel();
            ///////////////////////////////////////
            List<SO> FilteredSaleOrders;// = db.Customers;
            List<Customer> FilteredCustomers = new List<Customer>();
            foreach (Customer cust in db.Customers)
            {
                FilteredSaleOrders = new List<SO>();
                foreach (SO so in cust.SOes)
                {
                    if (so.Date >= dtStartDate && so.Date <= dtEndtDate)
                    {
                        FilteredSaleOrders.Add(so);
                    }
                }

                if (FilteredSaleOrders.Count > 0)
                {
                    cust.SOes = FilteredSaleOrders;
                    FilteredCustomers.Add(cust);

                }
            }

            dbVM.Customers = FilteredCustomers.OrderBy(x => x.Name).AsQueryable();
            /////////////////

            List<SOD> FilteredSaleOrderDetails;// = db.Customers;
            List<Product> FilteredProducts = new List<Product>();
            foreach (Product prod in db.Products)
            {
                //FilteredSaleOrders = new List<SO>();
                FilteredSaleOrderDetails = new List<SOD>();

                foreach (SOD sod in prod.SODs)
                {
                    if (sod.SO.Date >= dtStartDate && sod.SO.Date <= dtEndtDate)
                    {
                        FilteredSaleOrderDetails.Add(sod);
                    }
                }

                if (FilteredSaleOrderDetails.Count > 0)
                {
                    prod.SODs = FilteredSaleOrderDetails;
                    FilteredProducts.Add(prod);

                }
            }

            //IQueryable<Product> Products = db.Products;
            dbVM.Products = FilteredProducts.OrderBy(x => x.Name).AsQueryable();


            //dbVM.SOes = sOes;
            //dbVM.POes = db.POes;
            
            return View("Dashboard", dbVM);
            //return View("Dashboard", sOes);

        }
        public ActionResult FilterIndex(string custId, string suppId, string startDate, string endDate)
        {

            DateTime dtStartDate;
            DateTime dtEndtDate;

            if (startDate == string.Empty)
            {
                dtStartDate = DateTime.Parse("1-1-1800");
            }
            else
            {
                dtStartDate = DateTime.Parse(startDate);
            }

            if (endDate == string.Empty)
            {
                dtEndtDate = DateTime.Today.AddDays(1);
            }
            else
            {
                dtEndtDate = DateTime.Parse(endDate);
                dtEndtDate = dtEndtDate.AddDays(1);
            }

            ViewBag.Customers = db.Customers;

            ViewBag.StartDate = dtStartDate.ToString("dd-MMM-yyyy");
            ViewBag.EndDate = dtEndtDate.ToString("dd-MMM-yyyy");

            DashboardViewModel dbVM = new DashboardViewModel();
          
          
            IQueryable<SO> selectedSOes = null;
            /////////////////////////////////////////////////////////////////////////////
            List<SO> FilteredSaleOrders;// = db.Customers;
            List<Customer> FilteredCustomers = new List<Customer>();
            foreach (Customer cust in db.Customers)
            {
                FilteredSaleOrders = new List<SO>();
                foreach (SO so in cust.SOes)
                {
                    if (so.Date >= dtStartDate && so.Date <= dtEndtDate)
                    {
                        FilteredSaleOrders.Add(so);
                    }
                }

                if (FilteredSaleOrders.Count > 0)
                {
                    cust.SOes = FilteredSaleOrders;
                    FilteredCustomers.Add(cust);

                }
            }

            dbVM.Customers = FilteredCustomers.AsQueryable();

            ///////////////////////////////////////////////////////////////////////////

            List<SOD> FilteredSaleOrderDetails;// = db.Customers;
            List<Product> FilteredProducts = new List<Product>();
            foreach (Product prod in db.Products)
            {
                //FilteredSaleOrders = new List<SO>();
                FilteredSaleOrderDetails = new List<SOD>();

                foreach (SOD sod in prod.SODs)
                {
                    if (sod.SO.Date >= dtStartDate && sod.SO.Date <= dtEndtDate)
                    {
                        FilteredSaleOrderDetails.Add(sod);
                    }
                }

                if (FilteredSaleOrderDetails.Count > 0)
                {
                    prod.SODs = FilteredSaleOrderDetails;
                    FilteredProducts.Add(prod);

                }
            }

            //IQueryable<Product> Products = db.Products;
            dbVM.Products = FilteredProducts.AsQueryable();




            return PartialView("_Dashboard", dbVM);
            //return View("Some thing went wrong");
        }
        public ActionResult CustomerWiseSale(int custId, string custName)
        {

            //DateTime dtEndtDate = DateTime.Today.AddDays(1);
            //DateTime dtStartDate = dtEndtDate.AddDays(-7);
            DateTime PKDate = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Pakistan Standard Time"));
            var dtStartDate = new DateTime(PKDate.Year, PKDate.Month, 1);
            var dtEndtDate = dtStartDate.AddMonths(1).AddSeconds(-1);

            ViewBag.CustomerId = custId;
            ViewBag.CustName = custName;
            //ViewBag.SupplierName = supplierName;//db.Products.FirstOrDefault(x => x.Id == productId).Name;
            ViewBag.Customers = db.Customers;
            //01-Jan-2019

            ViewBag.StartDate = dtStartDate.ToString("dd-MMM-yyyy");
            ViewBag.EndDate = dtEndtDate.ToString("dd-MMM-yyyy");

            IQueryable<SO> sOes = db.SOes;//.Include(s => s.Customer);
            sOes = sOes.Where(x => x.CustomerId == custId && x.Date >= dtStartDate && x.Date <= dtEndtDate).OrderBy(i => i.SOSerial).AsQueryable();
            //foreach (SO itm in sOes)
            //{
            //    //itm.Id = Encryption.Encrypt(itm.Id, "BZNS");
            //    itm.Id = string.Join("-", ASCIIEncoding.ASCII.GetBytes(Encryption.Encrypt(itm.Id, "BZNS")));
            //}



            //      unitOfWork.deviceInstanceRepository.Get()
            //.GroupBy(w => new
            //{
            //    DeviceId = w.DeviceId,
            //    Device = w.Device.Name,
            //    Manufacturer = w.Device.Manufacturer,
            //})
            //.Select(s => new
            //{
            //    DeviceId = s.Key.DeviceId,
            //    Name = s.Key.Device,
            //    Manufacturer = s.Key.Manufacturer.Name,
            //    Quantity = s.Sum(x => x.Quantity)
            //})






            return View("Dashboard", sOes);

            //return View("CustomerWiseSale", sOes.OrderBy(i => i.Date).ToList());
        }
        public ActionResult FilterCustomerWiseSale(string custId, string suppId, string startDate, string endDate)
        {

            /////////////////////////////////////////////////////////////////////////////
            IQueryable<SO> sOes = db.SOes;//.Include(s => s.Customer);
                                          //sOes = sOes.Where(x => x.CustomerId == custId && x.Date >= dtStartDate && x.Date <= dtEndtDate).OrderBy(i => i.Date).OrderBy(i => i.SOSerial).AsQueryable();






            int intCustId;
            DateTime dtStartDate;
            DateTime dtEndtDate;
            IQueryable<SO> selectedSOes = null;
            if (endDate != string.Empty)
            {
                dtEndtDate = DateTime.Parse(endDate);
                dtEndtDate = dtEndtDate.AddDays(1);
                endDate = dtEndtDate.ToString();

            }

            if (custId != string.Empty && startDate != string.Empty && endDate != string.Empty)
            {
                intCustId = Int32.Parse(custId);
                dtStartDate = DateTime.Parse(startDate);
                dtEndtDate = DateTime.Parse(endDate);

                selectedSOes = sOes.Where(so => so.CustomerId == intCustId && so.Date >= dtStartDate && so.Date <= dtEndtDate);

            }

            if (custId == string.Empty && startDate == string.Empty && endDate == string.Empty)
            {

                dtStartDate = DateTime.Parse("1-1-1800");
                dtEndtDate = DateTime.Today.AddDays(1);

                selectedSOes = sOes;//.Where(so => so.CustomerId == intCustId && so.Date >= dtStartDate && so.Date <= dtEndtDate);

            }

            //get all customers data acornding to start end date
            if (custId == string.Empty && startDate != string.Empty && endDate != string.Empty)
            {

                dtStartDate = DateTime.Parse(startDate);
                dtEndtDate = DateTime.Parse(endDate);

                selectedSOes = sOes.Where(so => so.Date >= dtStartDate && so.Date <= dtEndtDate);

            }

            //get this customer with from undefined startdate to this defined enddate
            if (custId != string.Empty && startDate == string.Empty && endDate != string.Empty)
            {
                intCustId = Int32.Parse(custId);
                dtStartDate = DateTime.Parse("1-1-1800");
                dtEndtDate = DateTime.Parse(endDate);

                selectedSOes = sOes.Where(so => so.CustomerId == intCustId && so.Date >= dtStartDate && so.Date <= dtEndtDate);

            }

            //get this customer with from defined start date to undefined end date
            if (custId != string.Empty && startDate != string.Empty && endDate == string.Empty)
            {
                intCustId = Int32.Parse(custId);
                dtStartDate = DateTime.Parse(startDate);
                dtEndtDate = DateTime.Today.AddDays(1);

                selectedSOes = sOes.Where(so => so.CustomerId == intCustId && so.Date >= dtStartDate && so.Date <= dtEndtDate);

            }

            //get this customer with all dates
            if (custId != string.Empty && startDate == string.Empty && endDate == string.Empty)
            {
                intCustId = Int32.Parse(custId);
                dtStartDate = DateTime.Parse("1-1-1800");
                dtEndtDate = DateTime.Today.AddDays(1);

                selectedSOes = sOes.Where(so => so.CustomerId == intCustId && so.Date >= dtStartDate && so.Date <= dtEndtDate);

            }

            //get all customer with defined startdate and undefined end date
            if (custId == string.Empty && startDate != string.Empty && endDate == string.Empty)
            {

                dtStartDate = DateTime.Parse(startDate);
                dtEndtDate = DateTime.Today.AddDays(1);

                selectedSOes = sOes.Where(so => so.Date >= dtStartDate && so.Date <= dtEndtDate);

            }

            //get all customers with undifined start date with defined enddate
            if (custId == string.Empty && startDate == string.Empty && endDate != string.Empty)
            {

                dtStartDate = DateTime.Parse("1-1-1800");
                dtEndtDate = DateTime.Parse(endDate);

                selectedSOes = sOes.Where(so => so.Date >= dtStartDate && so.Date <= dtEndtDate);

            }


            //foreach (SO itm in selectedSOes)
            //{
            //    //itm.Id = Encryption.Encrypt(itm.Id, "BZNS");
            //    itm.Id = string.Join("-", ASCIIEncoding.ASCII.GetBytes(Encryption.Encrypt(itm.Id, "BZNS")));
            //}
            //GetTotalBalance(ref selectedSOes);
            //return PartialView("_SelectedSOSR", selectedSOes.OrderByDescending(i => i.Date).ToList());
            //_ProfitGainFromSupplier
            return PartialView("_Dashboard", selectedSOes.OrderBy(i => i.SOSerial).ToList());
            //return View("Some thing went wrong");
        }
        public ActionResult ProductWiseSale(int productId)
        {
            DateTime PKDate = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Pakistan Standard Time"));
            var dtStartDate = new DateTime(PKDate.Year, PKDate.Month, 1);
            var dtEndtDate = dtStartDate.AddMonths(1).AddSeconds(-1);
            ViewBag.ProductId = productId;
            ViewBag.ProductName = db.Products.FirstOrDefault(x => x.Id == productId).Name;
            ViewBag.Customers = db.Customers;
            ViewBag.StartDate = dtStartDate.ToString("dd-MMM-yyyy");
            ViewBag.EndDate = dtEndtDate.ToString("dd-MMM-yyyy");

            IQueryable<SO> sOes = db.SOes;//.Include(s => s.Customer);

            //sOes = db.SOes.Where(x => x.SODs.Where(y => y.ProductId == productId));

            List<SOD> lstSODs = db.SODs.Where(x => x.ProductId == productId).ToList();
            List<SO> lstSlectedSO = new List<SO>();
            foreach (SOD lsod in lstSODs)
            {
                //do not add if already added
                if (lstSlectedSO.Where(x => x.Id == lsod.SOId).FirstOrDefault() == null)
                {
                    lstSlectedSO.Add(lsod.SO);
                }
            }

            sOes = lstSlectedSO.Where(x => x.Date >= dtStartDate && x.Date <= dtEndtDate).AsQueryable();
            foreach (SO itm in sOes)
            {
                //itm.Id = Encryption.Encrypt(itm.Id, "BZNS");
                itm.Id = string.Join("-", ASCIIEncoding.ASCII.GetBytes(Encryption.Encrypt(itm.Id, "BZNS")));
            }

            return View("ProductWiseSale", sOes.OrderBy(i => i.SOSerial).ToList());
        }
        public ActionResult FilterProductWiseSale(string prodId, string custId, string suppId, string startDate, string endDate)
        {
            int intProdId;
            intProdId = Int32.Parse(prodId);
            IQueryable<SO> sOes = db.SOes;//.Include(s => s.Customer);

            //sOes = db.SOes.Where(x => x.SODs.Where(y => y.ProductId == productId));

            List<SOD> lstSODs = db.SODs.Where(x => x.ProductId == intProdId).ToList();
            List<SO> lstSlectedSO = new List<SO>();
            foreach (SOD lsod in lstSODs)
            {
                //do not add if already added
                if (lstSlectedSO.Where(x => x.Id == lsod.SOId).FirstOrDefault() == null)
                {
                    lstSlectedSO.Add(lsod.SO);
                }
            }
            sOes = lstSlectedSO.AsQueryable();
            //sOes = lstSlectedSO.Where(x => x.Date >= dtStartDate && x.Date <= dtEndtDate).AsQueryable();

            /////////////////////////////////////////////////////////////////////////////
            //IQueryable<SO> sOes = db.SOes;//.Include(s => s.Customer);
            //sOes = sOes.Where(x => x.CustomerId == custId && x.Date >= dtStartDate && x.Date <= dtEndtDate).OrderBy(i => i.Date).OrderBy(i => i.SOSerial).AsQueryable();






            int intCustId;
            DateTime dtStartDate;
            DateTime dtEndtDate;
            IQueryable<SO> selectedSOes = null;
            if (endDate != string.Empty)
            {
                dtEndtDate = DateTime.Parse(endDate);
                dtEndtDate = dtEndtDate.AddDays(1);
                endDate = dtEndtDate.ToString();

            }

            if (custId != string.Empty && startDate != string.Empty && endDate != string.Empty)
            {
                intCustId = Int32.Parse(custId);
                dtStartDate = DateTime.Parse(startDate);
                dtEndtDate = DateTime.Parse(endDate);

                selectedSOes = sOes.Where(so => so.CustomerId == intCustId && so.Date >= dtStartDate && so.Date <= dtEndtDate);

            }

            if (custId == string.Empty && startDate == string.Empty && endDate == string.Empty)
            {

                dtStartDate = DateTime.Parse("1-1-1800");
                dtEndtDate = DateTime.Today.AddDays(1);

                selectedSOes = sOes;//.Where(so => so.CustomerId == intCustId && so.Date >= dtStartDate && so.Date <= dtEndtDate);

            }

            //get all customers data acornding to start end date
            if (custId == string.Empty && startDate != string.Empty && endDate != string.Empty)
            {

                dtStartDate = DateTime.Parse(startDate);
                dtEndtDate = DateTime.Parse(endDate);

                selectedSOes = sOes.Where(so => so.Date >= dtStartDate && so.Date <= dtEndtDate);

            }

            //get this customer with from undefined startdate to this defined enddate
            if (custId != string.Empty && startDate == string.Empty && endDate != string.Empty)
            {
                intCustId = Int32.Parse(custId);
                dtStartDate = DateTime.Parse("1-1-1800");
                dtEndtDate = DateTime.Parse(endDate);

                selectedSOes = sOes.Where(so => so.CustomerId == intCustId && so.Date >= dtStartDate && so.Date <= dtEndtDate);

            }

            //get this customer with from defined start date to undefined end date
            if (custId != string.Empty && startDate != string.Empty && endDate == string.Empty)
            {
                intCustId = Int32.Parse(custId);
                dtStartDate = DateTime.Parse(startDate);
                dtEndtDate = DateTime.Today.AddDays(1);

                selectedSOes = sOes.Where(so => so.CustomerId == intCustId && so.Date >= dtStartDate && so.Date <= dtEndtDate);

            }

            //get this customer with all dates
            if (custId != string.Empty && startDate == string.Empty && endDate == string.Empty)
            {
                intCustId = Int32.Parse(custId);
                dtStartDate = DateTime.Parse("1-1-1800");
                dtEndtDate = DateTime.Today.AddDays(1);

                selectedSOes = sOes.Where(so => so.CustomerId == intCustId && so.Date >= dtStartDate && so.Date <= dtEndtDate);

            }

            //get all customer with defined startdate and undefined end date
            if (custId == string.Empty && startDate != string.Empty && endDate == string.Empty)
            {

                dtStartDate = DateTime.Parse(startDate);
                dtEndtDate = DateTime.Today.AddDays(1);

                selectedSOes = sOes.Where(so => so.Date >= dtStartDate && so.Date <= dtEndtDate);

            }

            //get all customers with undifined start date with defined enddate
            if (custId == string.Empty && startDate == string.Empty && endDate != string.Empty)
            {

                dtStartDate = DateTime.Parse("1-1-1800");
                dtEndtDate = DateTime.Parse(endDate);

                selectedSOes = sOes.Where(so => so.Date >= dtStartDate && so.Date <= dtEndtDate);

            }


            //foreach (SO itm in selectedSOes)
            //{
            //    //itm.Id = Encryption.Encrypt(itm.Id, "BZNS");
            //    itm.Id = string.Join("-", ASCIIEncoding.ASCII.GetBytes(Encryption.Encrypt(itm.Id, "BZNS")));
            //}
            //GetTotalBalance(ref selectedSOes);
            //return PartialView("_SelectedSOSR", selectedSOes.OrderByDescending(i => i.Date).ToList());
            //_ProfitGainFromSupplier
            return PartialView("_CustomerWiseSale", selectedSOes.OrderBy(i => i.SOSerial).ToList());
            //return View("Some thing went wrong");
        }

        public ActionResult About()
        {
            ViewBag.Message = "ShopON";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}