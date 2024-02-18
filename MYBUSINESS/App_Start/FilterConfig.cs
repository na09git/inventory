using LMSMYBUSINESS.Models;
using System.Web;
using System.Web.Mvc;

namespace MYBUSINESS
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
            filters.Add(new LMSFilter());
        }
    }
}
