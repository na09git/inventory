using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MYBUSINESS.Models
{
    


    public interface IProduct_MetadataType
    {
        [Required(AllowEmptyStrings = false)]
        [DisplayName("Product Name")]
        string Name { get; set; }

        [Range(typeof(Decimal), "0", "9999999999", ErrorMessage = "{0} must be a decimal/number between {1} and {2}.")]
        [DisplayName("Sale Price")]
        decimal SalePrice { get; set; }

        [Range(typeof(Decimal), "0", "9999999999", ErrorMessage = "{0} must be a decimal/number between {1} and {2}.")]
        [DisplayName("Purchase Price")]
        decimal PurchasePrice { get; set; }

        [DisplayName("Per Pack")]
        [Range(1, int.MaxValue, ErrorMessage = "Please enter a value more than 0")]
        Nullable<int> PerPack { get; set; }

    }

    [MetadataType(typeof(IProduct_MetadataType))]
    public partial class Product : IProduct_MetadataType
    {
        /* Id property has already existed in the mapped class */
    }


}


