using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MYBUSINESS.Controllers
{
    public class NotAllowedController : Controller
    {
        //
        // GET: /NotAllowed/
        public ActionResult UnAuthorized()
        {
            return View();
        }
	}
}