using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using MYBUSINESS.CustomClasses;
using MYBUSINESS.Models;

namespace MYBUSINESS.Controllers
{
    public class UserManagementController : Controller
    {
        private BusinessContext db = new BusinessContext();
        public ActionResult Login()
        {
            
            //if (StaticClass.CurrentAction != null) StaticClass.ReturnUrl = ControllerContext.HttpContext.Request.UrlReferrer.ToString();
            //if (StaticClass.PreviousAction != null) StaticClass.ReturnUrl = ControllerContext.HttpContext.Request.Url.ToString();
            //if (StaticClass.CurrentAction != null) StaticClass.ReturnUrl = ControllerContext.HttpContext.Request.Url.ToString();
            //if (CurrentAction != "Login")
            
            Session.Clear();
            Session.Abandon();
            
            //return Redirect(ControllerContext.HttpContext.Request.UrlReferrer.ToString());
            return View();
        }
       
        public ActionResult Logout()
        {
            
            Session.Clear();
            Session.Abandon();

            return RedirectToAction("Login");
            

        }

        [HttpPost]
        public ActionResult Login(Employee emp)
        //public ActionResult Login(Employee emp, Right right)
        {
            
            
            
            if (emp.Password == null) { emp.Password = string.Empty; }
            emp.Password = Encryption.Encrypt(emp.Password, "d3A#");

            //it sounds singelordefault will give error if value is more than one.
            MYBUSINESS.Models.Employee user = db.Employees.SingleOrDefault(usr => ((usr.Login == emp.Login) && (usr.Password == emp.Password)));
            if (user != null)
            {
                //MYBUSINESS.Models.EmployeeLeaveViewModel elViewModel = new  MYBUSINESS.Models.EmployeeLeaveViewModel();
                //user = db.Employees.FirstOrDefault();
                Session.Add("CurrentUser", user);
                //return RedirectToAction("Create", "SOSR",new {IsReturn="false" });//change it from 'if condtion' to here
                return RedirectToAction("Index", "Dashboard");//change it from 'if condtion' to here
                //return View("Index", "DashBoard",user);
            }
            else
            {
                TempData["message"] = "Password is not valid";
                return RedirectToAction("Login", "UserManagement");
            }
            
            //return RedirectToAction("RecoverPassword", "UserManagement");
            
            //return RenderAction("Login", "UserManagement");
        }

        //// GET: /UserManagement/
        //public ActionResult Index()
        //{
        //    var employees = db.Employees.Include(e => e.Department);
        //    return View(employees.ToList());
        //}

        // GET: /UserManagement/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Employee employee = db.Employees.Find(id);
            if (employee == null)
            {
                return HttpNotFound();
            }
            return View(employee);
        }

        //// GET: /UserManagement/Create
        //public ActionResult Create()
        //{
        //    ViewBag.DepartmentId = new SelectList(db.Departments, "Id", "DepartmentName");
        //    return View();
        //}

        //// POST: /UserManagement/Create
        //// To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        //// more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Create([Bind(Include = "Id,FirstName,LastName,Gender,Login,Password,EmployeeTypeId,RightId,RankId,DepartmentId,Probation,RegistrationDate,IsActive,tblCreatedDate,tblModifiedDate")] Employee employee)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        db.Employees.Add(employee);
        //        db.SaveChanges();
        //        return RedirectToAction("Index");
        //    }

        //    ViewBag.DepartmentId = new SelectList(db.Departments, "Id", "DepartmentName", employee.DepartmentId);
        //    return View(employee);
        //}

        //// GET: /UserManagement/Edit/5
        //public ActionResult Edit(int? id)
        //{
        //    if (id == null)
        //    {
        //        return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
        //    }
        //    Employee employee = db.Employees.Find(id);
        //    if (employee == null)
        //    {
        //        return HttpNotFound();
        //    }
        //    ViewBag.DepartmentId = new SelectList(db.Departments, "Id", "DepartmentName", employee.DepartmentId);
        //    return View(employee);
        //}

        //// POST: /UserManagement/Edit/5
        //// To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        //// more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Edit([Bind(Include = "Id,FirstName,LastName,Gender,Login,Password,EmployeeTypeId,RightId,RankId,DepartmentId,Probation,RegistrationDate,IsActive,tblCreatedDate,tblModifiedDate")] Employee employee)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        db.Entry(employee).State = EntityState.Modified;
        //        db.SaveChanges();
        //        return RedirectToAction("Index");
        //    }
        //    ViewBag.DepartmentId = new SelectList(db.Departments, "Id", "DepartmentName", employee.DepartmentId);
        //    return View(employee);
        //}

        // GET: /UserManagement/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Employee employee = db.Employees.Find(id);
            if (employee == null)
            {
                return HttpNotFound();
            }
            return View(employee);
        }

        // POST: /UserManagement/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Employee employee = db.Employees.Find(id);
            db.Employees.Remove(employee);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            //w iam commiting this beacuse this function dispose employee and leave objects, in DashBoard/Index page.
            //w but this is not good approach. good approch is to made a view model and pass ti to the dashboard.
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
