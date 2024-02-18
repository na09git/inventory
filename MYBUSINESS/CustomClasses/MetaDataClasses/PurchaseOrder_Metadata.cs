using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MYBUSINESS.Models
{
    //[MetadataType(typeof(ProductMetaData))]
    //public partial class Product
    //{
    //}

    //public class ProductMetaData
    //{
    //    [DisplayName("Sale Price")]
    //    public Nullable<decimal> SalePrice { get; set; }
    //}


    public interface IPurchaseOrder_MetadataType
    {
       
        //string Id { get; set; }
        [DisplayName("Bill Amount")]
        decimal BillAmount { get; set; }
        [DisplayName("Bill Paid")]
        decimal BillPaid { get; set; }
        [DisplayName("Order Qty")]
        Nullable<decimal> PurchaseOrderQty { get; set; }
        [DisplayName("Order Amount")]
        Nullable<decimal> PurchaseOrderAmount { get; set; }
        [DisplayName("Return Qty ")]
        Nullable<decimal> PurchaseReturnQty { get; set; }
        [DisplayName("Return Amount")]
        Nullable<decimal> PurchaseReturnAmount { get; set; }
        [DisplayFormat(DataFormatString = "{0:dd MMM yyyy h:mm:ss tt}")]
        Nullable<System.DateTime> Date { get; set; }




    }

    [MetadataType(typeof(IPurchaseOrder_MetadataType))]
    public partial class PO : IPurchaseOrder_MetadataType
    {
        /* Id property has already existed in the mapped class */
    }


}


