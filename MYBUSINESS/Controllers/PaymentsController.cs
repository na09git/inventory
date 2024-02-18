using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Mvc;
using MYBUSINESS.CustomClasses;
using MYBUSINESS.Models;

namespace MYBUSINESS.Controllers
{
    public class PaymentsController : Controller
    {
        private BusinessContext db = new BusinessContext();
        private Utilities util = new Utilities();
        // GET: Payments
        //public ActionResult Index()
        //{
        //    var payments = db.Payments.Include(p => p.SO);
        //    return View(payments.ToList());
        //}
        public ActionResult Index(string orderId)
        {
            return null; //return to create insted
            orderId = Decode(orderId);
            SO sO = db.SOes.Where(x => x.Id == orderId).FirstOrDefault();
            ViewBag.Customer = sO.Customer.Name;
            ViewBag.OrderNo = sO.SOSerial;
            ViewBag.id = sO.Id;
            //var payments = db.Payments.Include(p => p.SO);
            var payments = db.Payments.Where(p => p.SOId == orderId);
            return View(payments.ToList());
        }

        // GET: Payments/Create
        public ActionResult Create(string custName, string orderNo, string id)
        {
            ViewBag.custName = custName;
            ViewBag.orderNo = orderNo;
            id = Decode(id);
            ViewBag.Payments = db.Payments.Where(p => p.SOId == id).OrderBy(i => i.Id);
            ViewBag.id = string.Join("-", ASCIIEncoding.ASCII.GetBytes(Encryption.Encrypt(id, "BZNS")));//Decode( id);
            //ViewBag.SOId = new SelectList(db.SOes.OrderByDescending(i => i.Date), "Id", "Remarks");
            ViewBag.TodayDate = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Pakistan Standard Time")).ToString("dd-MMM-yyy");
            SO sO= db.SOes.Where(x => x.Id == id).FirstOrDefault();

            ViewBag.PayableAmount = util.GetPayableAmount((decimal)sO.SaleOrderAmount, (decimal)sO.SaleReturnAmount, (decimal)sO.Discount); //sO.SaleOrderAmount;
            var LstPymnt = db.Payments.Where(x => x.SOId == id).ToList();

            decimal billPaidUptilnow=0;
            LstPymnt.ForEach(x => billPaidUptilnow += x.PaymentAmount);

            ViewBag.Paid = billPaidUptilnow;//sO.BillPaid;
            //ViewBag.Balance = sO.SaleOrderAmount - sO.SaleReturnAmount - sO.Discount - sO.BillPaid;//sO.Balance;
            ViewBag.Balance = util.GetBalanceAmount(ViewBag.PayableAmount, billPaidUptilnow);
            return View();
        }

        // POST: Payments/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "SOId,PaymentMethod,PaymentAmount,Id,ReceivedDate,Remarks")] Payment payment)
        {
            string codedId = payment.SOId;
            
            string SOId= Decode(payment.SOId);
            SO sO = db.SOes.Where(x => x.Id == SOId).FirstOrDefault();
            //Customer thisCust= sO.Customer;
            int maxId = db.Payments.DefaultIfEmpty().Max(p => p == null ? 0 : p.Id);
            maxId += 1;
            payment.Id = maxId;
            if (ModelState.IsValid)
            {

                payment.ReceivedDate = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Pakistan Standard Time"));
                payment.SOId = SOId;
                db.Payments.Add(payment);
                ////////////////add to SO table
                //SO newSO = new SO();
                //newSO.Id = System.Guid.NewGuid().ToString().ToUpper();
                //newSO.SOSerial = sO.SOSerial;
                //newSO.BillAmount = 0;
                sO.BillPaid += payment.PaymentAmount;
                sO.PrevBalance = sO.Customer.Balance; //customer last balnce will go to prev balance
                sO.Customer.Balance-= payment.PaymentAmount;//minus this amout from total balance also
                sO.Balance = sO.Customer.Balance;
                sO.Date = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Pakistan Standard Time"));
                
                //db.SOes.Add(sO);
                db.Entry(sO).State = EntityState.Modified;
                /////////////
                db.SaveChanges();

                string orderId = string.Join("-", ASCIIEncoding.ASCII.GetBytes(Encryption.Encrypt(payment.SOId, "BZNS")));
                //public ActionResult Create(string custName, string orderNo, string id)
                return RedirectToAction("Create", new { custName=sO.Customer.Name, orderNo=sO.SOSerial, id=orderId });
            }
            return RedirectToAction("Create", new { custName=sO.Customer.Name, orderNo=sO.SOSerial, id=codedId });

            //SO sO1 = db.SOes.Where(x => x.Id == SOId).FirstOrDefault();
            //ViewBag.custName = sO1.Customer.Name;
            //ViewBag.orderNo = sO1.SOSerial;
            //ViewBag.Payments = db.Payments.Where(p => p.SOId == SOId);
            //ViewBag.id = string.Join("-", ASCIIEncoding.ASCII.GetBytes(Encryption.Encrypt(SOId, "BZNS")));//Decode( id);
            ////ViewBag.SOId = new SelectList(db.SOes.OrderByDescending(i => i.Date), "Id", "Remarks");
            //ViewBag.TodayDate = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Pakistan Standard Time")).ToString("dd-MMM-yyy");
            //return View(payment);
        }
        // POST: Payments/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "SOId,PaymentMethod,PaymentAmount,Id,ReceivedDate,Remarks")] Payment payment)
        {
            Payment oldPymnt = db.Payments.Where(x => x.Id == payment.Id).FirstOrDefault();
            SO sO = db.SOes.Where(x => x.Id == payment.SOId).FirstOrDefault();
            if (ModelState.IsValid)
            {
                

                

                ////first recover old payment 
                sO.BillPaid -= oldPymnt.PaymentAmount;
                sO.Customer.Balance += oldPymnt.PaymentAmount;//minus this amout from total balance also
                decimal addedPmnts = 0;
                foreach (Payment pmt in db.Payments)
                {
                    if (pmt.SOId == payment.SOId && pmt.Id != payment.Id)
                    {
                        addedPmnts += pmt.PaymentAmount;
                    }
                }
                decimal a = (decimal)sO.Discount + (decimal)sO.SaleReturnAmount + (decimal)addedPmnts;
                decimal b = (decimal)sO.BillAmount - a;
                sO.PrevBalance = sO.Customer.Balance - b; //sO.Customer.Balance - (double) sO.SaleOrderAmount ; //customer last balance will go to prev balance
                sO.Balance = sO.Customer.Balance;
                //sO.Date = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Pakistan Standard Time"));


                //db.SOes.Add(sO);
                

                ////then update new payment 


                sO.BillPaid += payment.PaymentAmount;
                sO.PrevBalance = sO.Customer.Balance; //customer last balnce will go to prev balance
                sO.Customer.Balance -= payment.PaymentAmount;//minus this amout from total balance also
                sO.Balance = sO.Customer.Balance;
                sO.Date = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Pakistan Standard Time"));


                oldPymnt.PaymentAmount = payment.PaymentAmount;
                oldPymnt.PaymentMethod= payment.PaymentMethod;
                oldPymnt.ReceivedDate = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Pakistan Standard Time"));
                oldPymnt.Remarks = payment.Remarks;

                db.Entry(oldPymnt).State = EntityState.Modified;
                db.Entry(sO).State = EntityState.Modified;






                db.SaveChanges();
                //return RedirectToAction("Index");
                //SO sO = db.SOes.Where(x => x.Id == payment.SOId).FirstOrDefault();

                string orderId = string.Join("-", ASCIIEncoding.ASCII.GetBytes(Encryption.Encrypt(payment.SOId, "BZNS")));
                //public ActionResult Create(string custName, string orderNo, string id)
                return RedirectToAction("Create", new { custName = sO.Customer.Name, orderNo = sO.SOSerial, id = orderId });
                //return RedirectToAction("Create", new { orderId });
            }
            ViewBag.SOId = new SelectList(db.SOes, "Id", "Remarks", payment.SOId);
            return View(payment);
        }
        // GET: Payments/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            List<MyPaymentMethod> myOptionLst = new List<MyPaymentMethod> {
                            new MyPaymentMethod {
                                Text = "Cash",
                                Value = "Cash"
                            },
                            new MyPaymentMethod {
                                Text = "Cheque",
                                Value = "Cheque"
                            },
                            new MyPaymentMethod {
                                Text = "Other",
                                Value = "Other"
                            }
                        };



            ViewBag.OptionLst = myOptionLst;

            Payment payment = db.Payments.Find(id);
            if (payment == null)
            {
                return HttpNotFound();
            }
            //ViewBag.SOId = new SelectList(db.SOes, "Id", "Remarks", payment.SOId);
            return View(payment);
        }

       

        // GET: Payments/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Payment payment = db.Payments.Find(id);
            if (payment == null)
            {
                return HttpNotFound();
            }
            return View(payment);
        }

        // POST: Payments/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Payment payment = db.Payments.Find(id);
            db.Payments.Remove(payment);
            db.SaveChanges();
            return RedirectToAction("Index");
        }
        // GET: Payments/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Payment payment = db.Payments.Find(id);
            if (payment == null)
            {
                return HttpNotFound();
            }
            return View(payment);
        }
        private string Decode(string id)
        {
            byte[] BytesArr = id.Split('-').Select(byte.Parse).ToArray();
            id = new string(Encoding.UTF8.GetString(BytesArr).ToCharArray());
            id = Encryption.Decrypt(id, "BZNS");
            return id;
        }
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
