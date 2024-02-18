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


    public interface ISaleOrder_MetadataType
    {
       
        //string Id { get; set; }
        [DisplayName("Bill Amount")]
        decimal BillAmount { get; set; }
        [DisplayName("Bill Paid")]
        decimal BillPaid { get; set; }
        [DisplayName("Order Qty")]
        Nullable<decimal> SaleOrderQty { get; set; }
        [DisplayName("Order Amount")]
        Nullable<decimal> SaleOrderAmount { get; set; }
        [DisplayName("Return Qty ")]
        Nullable<decimal> SaleReturnQty { get; set; }
        [DisplayName("Return Amount")]
        Nullable<decimal> SaleReturnAmount { get; set; }
        [DisplayFormat(DataFormatString = "{0:dd MMM yyyy h:mm:ss tt}")]
        Nullable<System.DateTime> Date { get; set; }
        //[DisplayFormat(DataFormatString = "{0:N}", ApplyFormatInEditMode = true)]
        [DisplayFormat(DataFormatString = "{0:0}", ApplyFormatInEditMode = true)]
        Nullable<decimal> Profit { get; set; }

    }

    [MetadataType(typeof(ISaleOrder_MetadataType))]
    public partial class SO : ISaleOrder_MetadataType
    {
        /* Id property has already existed in the mapped class */
    }


}


