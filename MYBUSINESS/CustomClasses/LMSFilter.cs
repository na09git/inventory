using MYBUSINESS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace LMSMYBUSINESS.Models
{
    public class LMSFilter : ActionFilterAttribute
    {
        private BusinessContext db = new BusinessContext();
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            string CurrentController = HttpContext.Current.Request.RequestContext.RouteData.Values["Controller"].ToString();
            string CurrentAction = HttpContext.Current.Request.RequestContext.RouteData.Values["Action"].ToString();

            if (HttpContext.Current.Session["CurrentUser"] != null)
            {
                //Employee emp = (Employee)HttpContext.Current.Session["CurrentUser"];
                //when all rights will enter in database. then this function will work correctly 



                //Right rt = db.Rights.FirstOrDefault(r => r.EmployeeId == emp.Id && r.Controller == CurrentController && r.Action == CurrentAction && r.Allowed == true);

                //if (rt == null && CurrentController != "NotAllowed")
                //{
                //    filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary { { "controller", "NotAllowed" }, { "action", "UnAuthorized" } });
                //    //////base.OnActionExecuting(filterContext);
                //}

                return;
            }
            if (HttpContext.Current.Session["CurrentUser"] == null && CurrentController == "UserManagement" && CurrentAction == "Login")
            {
                //Let things happend automatically.
                //return;
                //filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary { { "controller", "UserManagement" }, { "action", "Login" } });
                return;
            }
            if (HttpContext.Current.Session["CurrentUser"] == null || CurrentController == "UserManagement" && CurrentAction == "Login")
            {
                //Let things happend automatically.
                //return;
                filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary { { "controller", "UserManagement" }, { "action", "Login" } });
                return;
            }


            //if (CurrentController == "NotAllowed" && CurrentAction == "UnAuthorized")
            //{
            //    //base.OnActionExecuting(filterContext);
            //}

            //else
            //{
            //    filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary { { "controller", "NotAllowed" }, { "action", "UnAuthorized" } });
            //    //base.OnActionExecuting(filterContext);
            //}


        }

    }
}