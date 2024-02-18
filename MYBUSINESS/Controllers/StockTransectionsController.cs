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
    public class StockTransectionsController : Controller
    {
        private BusinessContext db = new BusinessContext();
        //[NoCache]
        public ActionResult Summary()
        {

            DateTime PKDate = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Pakistan Standard Time"));
            var dtStartDate = new DateTime(PKDate.Year, PKDate.Month, 1);
            var dtEndtDate = dtStartDate.AddMonths(1).AddSeconds(-1);

            
            ViewBag.Customers = db.Customers;
           

            ViewBag.StartDate = dtStartDate.ToString("dd-MMM-yyyy");
            ViewBag.EndDate = dtEndtDate.ToString("dd-MMM-yyyy");

            
            DashboardViewModel dbVM = new DashboardViewModel();
            
            List<SOD> FilteredSaleOrderDetails;// = db.Customers;
            List<POD> FilteredPurchaseOrderDetails;// = db.Customers;
            List<Product> FilteredProducts = new List<Product>();
            foreach (Product prod in db.Products)
            {
                
                FilteredSaleOrderDetails = new List<SOD>();

                foreach (SOD sod in prod.SODs)
                {
                    if (sod.SO.Date >= dtStartDate && sod.SO.Date <= dtEndtDate)
                    {
                        FilteredSaleOrderDetails.Add(sod);
                    }
                }

                //if (FilteredSaleOrderDetails.Count > 0)
                //{
                    //prod.SODs = FilteredSaleOrderDetails;
                    

                //}
                


                /////////////////////////////

                FilteredPurchaseOrderDetails = new List<POD>();

                foreach (POD pod in prod.PODs)
                {
                    if (pod.PO.Date >= dtStartDate && pod.PO.Date <= dtEndtDate)
                    {
                        FilteredPurchaseOrderDetails.Add(pod);
                    }
                }

                //if (FilteredPurchaseOrderDetails.Count > 0)
                //{
                    //prod.PODs = FilteredPurchaseOrderDetails;
                    

                //}
                


                if (FilteredSaleOrderDetails.Count > 0 || FilteredPurchaseOrderDetails.Count > 0)
                {
                    prod.SODs = FilteredSaleOrderDetails;
                    prod.PODs = FilteredPurchaseOrderDetails;
                    FilteredProducts.Add(prod);

                }



            }

            dbVM.Products = FilteredProducts.OrderBy(x => x.Name).AsQueryable();



            ////////////////////////
           

            //dbVM.SOes = sOes;
            //dbVM.POes = db.POes;
            
            return View("Summary", dbVM);
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
          
          
          
            List<SOD> FilteredSaleOrderDetails;// = db.Customers;
            List<POD> FilteredPurchaseOrderDetails;// = db.Customers;
            List<Product> FilteredProducts = new List<Product>();
            foreach (Product prod in db.Products)
            {

                FilteredSaleOrderDetails = new List<SOD>();

                foreach (SOD sod in prod.SODs)
                {
                    if (sod.SO.Date >= dtStartDate && sod.SO.Date <= dtEndtDate)
                    {
                        FilteredSaleOrderDetails.Add(sod);
                    }
                }

                //if (FilteredSaleOrderDetails.Count > 0)
                //{
                    //prod.SODs = FilteredSaleOrderDetails;


                //}
                


                /////////////////////////////

                FilteredPurchaseOrderDetails = new List<POD>();

                foreach (POD pod in prod.PODs)
                {
                    if (pod.PO.Date >= dtStartDate && pod.PO.Date <= dtEndtDate)
                    {
                        FilteredPurchaseOrderDetails.Add(pod);
                    }
                }

                //if (FilteredPurchaseOrderDetails.Count > 0)
                //{
                    //prod.PODs = FilteredPurchaseOrderDetails;


                //}
               



                if (FilteredSaleOrderDetails.Count > 0 || FilteredPurchaseOrderDetails.Count > 0)
                {
                    prod.SODs = FilteredSaleOrderDetails;
                    prod.PODs = FilteredPurchaseOrderDetails;
                    FilteredProducts.Add(prod);

                }



            }

            dbVM.Products = FilteredProducts.OrderBy(x => x.Name).AsQueryable();





            return PartialView("_Summary", dbVM);
            //return View("Some thing went wrong");
        }
       
      
    }
}