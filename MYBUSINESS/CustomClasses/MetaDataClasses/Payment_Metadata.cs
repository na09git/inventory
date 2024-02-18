using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MYBUSINESS.Models
{
    


    public interface IPayment_MetadataType
    {
        //[Required(AllowEmptyStrings = false)]
        string PaymentMethod { get; set; }

    }

    [MetadataType(typeof(IPayment_MetadataType))]
    public partial class Payment : IPayment_MetadataType
    {
        /* Id property has already existed in the mapped class */
    }


}


