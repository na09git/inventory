using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using MYBUSINESS.Models;

namespace MYBUSINESS.Controllers
{
    public class EmployeesController : Controller
    {
        private BusinessContext db = new BusinessContext();

        // GET: Employees
        //public ActionResult Index()
        //{
        //    return View(db.Employees.ToList());
        //}

        //// GET: Employees/Details/5
        //public ActionResult Details(decimal id)
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
        //    return View(employee);
        //}

        // GET: Employees/Create
        //public ActionResult Create()
        //{
        //    return View();
        //}

        //// POST: Employees/Create
        //// To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        //// more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Create([Bind(Include = "Id,FirstName,LastName,Gender,Login,Password,Email,EmployeeTypeId,RightId,RankId,DepartmentId,Designation,Probation,RegistrationDate,Casual,Earned,IsActive,tblCreatedDate,tblModifiedDate")] Employee employee)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        db.Employees.Add(employee);
        //        db.SaveChanges();
        //        return RedirectToAction("Index");
        //    }

        //    return View(employee);
        //}

        // GET: Employees/Edit/5
        public ActionResult Edit(decimal id)
        {
            Employee CurrentUser = (Employee)Session["CurrentUser"];
            id = CurrentUser.Id;
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

        // POST: Employees/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        //public ActionResult Edit([Bind(Include = "Login,Password")] Employee employee)
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Login,Password")] Employee userChanges,FormCollection fc)
        {
            string oldPass = fc["OldPassword"];
            string pass1 = fc["Password1"];
            string pass2 = fc["Password2"];
            
            Employee CurrentUser = (Employee)Session["CurrentUser"];

            if (CurrentUser.Login == userChanges.Login && CurrentUser.Password == Encryption.Encrypt(oldPass, "d3A#") && pass1 == pass2)
            {
                userChanges.Id = CurrentUser.Id;
                //userChanges.Login = userChanges.Login;
                userChanges.Password = Encryption.Encrypt(pass2, "d3A#");

                if (ModelState.IsValid)
                {
                    
                    db.Entry(userChanges).State = EntityState.Modified;
                    db.SaveChanges();
                    Session.Add("CurrentUser", userChanges);
                    
                    return RedirectToAction("Create","SOSR");
                }
            }

            ViewBag.Error = "Password does not match";
            return View(userChanges);
        }

        // GET: Employees/Delete/5
        //public ActionResult Delete(decimal id)
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
        //    return View(employee);
        //}

        //// POST: Employees/Delete/5
        //[HttpPost, ActionName("Delete")]
        //[ValidateAntiForgeryToken]
        //public ActionResult DeleteConfirmed(decimal id)
        //{
        //    Employee employee = db.Employees.Find(id);
        //    db.Employees.Remove(employee);
        //    db.SaveChanges();
        //    return RedirectToAction("Index");
        //}

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
