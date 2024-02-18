var txtSerialNum = 0;
var clickedTextboxId = "name0";
var clickedIdNum = "";
var x, y;
var _total=0;
function OnTypeSupplierName(param) {
    //alert(param);
    $(param).keyup(function (e) {
        //alert(param);
        //var focused = document.activeElement;
        //clickedTextboxId = $(document.activeElement).attr("id");

        //if ($.isNumeric(clickedTextboxId.substring(4)) == true) {

        //    $('#supplier').val("");
        //}
        $('#idnSupplier').val("");
        $('#supplierAddress').val("");
        
        var input, filter, table, tr, td, i;
        //input = document.getElementById("name");
        //alert(thisTextValue);
        filter = $(document.activeElement).val().toUpperCase();//input.value.toUpperCase();
        table = document.getElementById("suppliersTable");
        //alert(table);
        tr = table.getElementsByTagName("tr");
        var displayCntr = 0;
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > 0) {
                    tr[i].style.display = "";
                    displayCntr += 1;
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
        //alert(displayCntr);

        if (displayCntr > 0) {

            $("#dialog-suppliers").dialog("open");
            document.getElementById('supplier').focus();
        } else {
            $("#dialog-suppliers").dialog("close");

        }

        ConfigDialogueSupplier('#supplier');

    });
}


function OnTypeName(param) {
    
    $(param).keyup(function (e) {
        //alert(param);
        //var focused = document.activeElement;
        clickedTextboxId = $(document.activeElement).attr("id");

        //alert(clickedTextboxId);
        if ($.isNumeric(clickedTextboxId.substring(4)) == true) {
            clickedIdNum = clickedTextboxId.substring(4);
            //alert(clickedIdNum);
            //alert(clickedTextboxId);
            $('#idn' + clickedIdNum).val("");
            $('#purchasePrice' + clickedIdNum).val("");
            $('#quantity' + clickedIdNum).val("");
            $('#itemTotal' + clickedIdNum).val("");
            //alert("yes");
        } else {
            //alert("khali");
            clickedIdNum = "";

        }

        var input, filter, table, tr, td, i;
        //input = document.getElementById("name");
        //alert(thisTextValue);
        filter = $(document.activeElement).val().toUpperCase();//input.value.toUpperCase();
        table = document.getElementById("productsTable");
        //alert(table);
        tr = table.getElementsByTagName("tr");
        var displayCntr = 0;
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > 0) {
                    tr[i].style.display = "";
                    displayCntr += 1;
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
        //alert(displayCntr);

        if (displayCntr > 0) {

            $("#dialog-products").dialog("open");
            document.getElementById(clickedTextboxId).focus();
        } else {
            $("#dialog-products").dialog("close");

        }

        ConfigDialogue('#' + clickedTextboxId);

    });
}

//function myFunction() {
//   //var focused = document.activeElement;
//    clickedTextboxId = $(document.activeElement).attr("id");

//    //alert(clickedTextboxId);
//    if ($.isNumeric(clickedTextboxId.substring(4)) == true) {
//        clickedIdNum = clickedTextboxId.substring(4);
//        //alert(clickedIdNum);
//        //alert(clickedTextboxId);
//        $('#idn' + clickedIdNum).val("");
//        $('#purchasePrice' + clickedIdNum).val("");
//        $('#quantity' + clickedIdNum).val("");
//        $('#itemTotal' + clickedIdNum).val("");
//    } else {
//        //alert("khali");
//        clickedIdNum = "";

//    }

//    var input, filter, table, tr, td, i;
//    //input = document.getElementById("name");
//    //alert(thisTextValue);
//    filter = $(document.activeElement).val().toUpperCase();//input.value.toUpperCase();
//    table = document.getElementById("productsTable");
//    //alert(table);
//    tr = table.getElementsByTagName("tr");
//    var displayCntr = 0;
//    for (i = 0; i < tr.length; i++) {
//        td = tr[i].getElementsByTagName("td")[0];
//        if (td) {
//            if (td.innerHTML.toUpperCase().indexOf(filter) > 0) {
//                tr[i].style.display = "";
//                displayCntr += 1;
//            } else {
//                tr[i].style.display = "none";
//            }
//        }
//    }
//    //alert(displayCntr);

//    if (displayCntr > 0) {

//        $("#dialog-products").dialog("open");
//        document.getElementById(clickedTextboxId).focus();
//    } else {
//        $("#dialog-products").dialog("close");

//    }
//    ConfigDialogue('#' + clickedTextboxId);
//}

$(function () {
    //OnTypeName('#name0');
    //alert('#' + clickedTextboxId);
    ConfigDialogue('#' + clickedTextboxId);
    ConfigDialogueSupplier('#supplier');
    ConfigDialogueCreateSupplier();
    $('#dialog-suppliers').find('tr').click(function () {
        //alert($(this).find('td:eq(0)').text().trim() + " " + $(this).find('td:eq(1)').text().trim() + " " + $(this).find('td:eq(2)').text().trim() + " " + $(this).find('td:eq(3)').text().trim() + " " + $(this).find('td:eq(4)').text().trim());


        var content = $(this).find('td:eq(0)').text().trim();
        $('#supplier').val(content);
        content = $(this).find('td:eq(1)').text().trim();
        $('#supplierAddress').val(content);

        var PrevBal = $(this).find('td:eq(2)').text().trim();
        $('#PreviousBalance').val(PrevBal);

        var suppIdn = $(this).find('td:eq(3)').text().trim();
        $('#idnSupplier').val(suppIdn);
        //
        
        //$('#' + clickedTextboxId).val(col1);
        
        $("#dialog-suppliers").dialog("close");
        update_itemTotal();
        //alert(getPrevBalanceUrl);

        //$.ajax({
        //    url: getPrevBalanceUrl,
        //    data: { 'id': suppIdn },
        //    type: "GET",
        //    cache: false,
        //    success: function (data) {
        //        //alert(data);
        //        $("#PreviousBalance").val(data);

        //        //$("#hdnOrigComments").val($('#txtComments').val());
        //        //$('#lblCommentsNotification').text(savingStatus);
        //    },
        //    error: function (xhr, ajaxOptions, thrownError) {
        //        //$('#lblCommentsNotification').text("Error encountered while saving the comments.");
        //        alert('Data provided was not valid');
        //    }
        //});
    });

    $('#dialog-products').find('tr').click(function () {
        //alert($(this).find('td:eq(0)').text().trim() + " " + $(this).find('td:eq(1)').text().trim() + " " + $(this).find('td:eq(2)').text().trim() + " " + $(this).find('td:eq(3)').text().trim() + " " + $(this).find('td:eq(4)').text().trim());

        var col0 = $(this).find('td:eq(4)').text().trim();
        var col1 = $(this).find('td:eq(0)').text().trim();
        var col2 = $(this).find('td:eq(2)').text().trim();

        //$('#' + clickedTextboxId).val(col1);
        $('#name' + clickedIdNum).val(col1);
        $('#idn' + clickedIdNum).val(col0);
        $('#purchasePrice' + clickedIdNum).val(col2);
        $('#quantity' + clickedIdNum).val(1);
        $('#itemTotal' + clickedIdNum).val(col2);

        //$('[data-toggle="tooltip"]').tooltip();
        var actions = $("table td:last-child").html();

        update_itemTotal();
        $("#dialog-products").dialog("close");

    });
});

$(document).ready(function () {

    document.getElementById(clickedTextboxId).focus();

    //$('#name').tooltip('show')

    //$('[data-toggle="tooltip"]').tooltip();
    var actions = $("table td:last-child").html();
    // Append table with add row form on add new button click
    $("#addNewRow").click(function () {
        //$(this).attr("disabled", "disabled");
        txtSerialNum += 1;
        //alert(txtSerialNum)
        var index = $("table tbody tr:last-child").index();
        var row = '<tr>' +
            '<td style="display:none;"><input type="hidden" name="PurchaseOrderDetail.Index" value="' + txtSerialNum + '" /></td>' +
            '<td style="display:none;"><input type="text" readonly class="form-control classBGcolor" name="PurchaseOrderDetail[' + txtSerialNum + '].ProductId" id="idn' + txtSerialNum + '"></td>' +
            '<td><input type="text" class="form-control" autocomplete="off" name="name' + txtSerialNum + '" id="name' + txtSerialNum + '"></td>' +
            '<td><input type="text" readonly class="form-control classBGcolor" name="purchasePrice' + txtSerialNum + '" id="purchasePrice' + txtSerialNum + '"></td>' +
            '<td><input type="text" class="form-control" name="PurchaseOrderDetail[' + txtSerialNum + '].Quantity" id="quantity' + txtSerialNum + '"></td>' +
            '<td><input type="text" readonly class="form-control classBGcolor" name="itemTotal' + txtSerialNum + '" id="itemTotal' + txtSerialNum + '"></td>' +
            '<td><select class="form-control" name="PurchaseOrderDetail[' + txtSerialNum + '].SaleType" id="saleType' + txtSerialNum + '"><option value="false" selected>Order</option><option value="true">Return</option></select></td>' +
            '<td>' + actions + '</td>' +
            '</tr>';


        $("#selectedProducts").append(row);
        //alert(txtSerialNum)

        $("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
        //$('[data-toggle="tooltip"]').tooltip();

        document.getElementById('name' + txtSerialNum).focus();
        OnTypeName('#name' + txtSerialNum);
        ConfigDialogue('#name' + txtSerialNum);
        ConfigDialogueSupplier('#supplier');

        $('#quantity' + txtSerialNum).keyup(function () {
            update_itemTotal();
        });
        $('#purchasePrice' + txtSerialNum).keyup(function () {
            update_itemTotal();
        });
        //
        //$('#PreviousBalance').keyup(function () {
        //    alert("fff");
        //    update_itemTotal();
        //});
        $('#quantity' + txtSerialNum).keydown(function (e) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
                // Allow: Ctrl+A, Command+A
                (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                // Allow: home, end, left, right, down, up
                (e.keyCode >= 35 && e.keyCode <= 40)) {
                // let it happen, don't do anything
                return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });
    });

    // Edit row on edit button click
    $(document).on("click", ".edit", function () {
        $(this).parents("tr").find("td:not(:last-child)").each(function () {
            $(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
        });
        $(this).parents("tr").find(".add, .edit").toggle();
        $("#addNewRow").attr("disabled", "disabled");
    });
    // Delete row on delete button click
    $(document).on("click", ".delete", function () {
        $(this).parents("tr").remove();
        $("#addNewRow").removeAttr("disabled");
        update_itemTotal();
    });
    $(document).on("keypress", "form", function (event) {
        return event.keyCode != 13;
    });
    //$('td[id^="' + value +'"]')         "[id^='quantity']"

    $("[id^='quantity'],#purchasePrice,#discount,#PreviousBalance").keyup(function () {
        //alert("afasf");
        update_itemTotal();
    });

    $("#paid").keyup(function () {
        //alert(_total);
        var paid = $('#paid').val();
        var balance = _total - paid;
        $('#balance').val(balance.toFixed(2));

    });
    $("[id^='quantity']").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .(45) and -(46)
        if ($.inArray(e.keyCode, [8, 9, 27, 13, 110]) !== -1 ||
            
            // Allow: Ctrl+A, Command+A
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            // let it happen, don't do anything

            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    
    //$('#CreatePO').keyup(function () {
       
    //});
    //onFormSave
    //$('#discount,#PreviousBalance,#paid').blur(function () {

    //    var ele = jQuery(this).attr('id');
    //    if (!$.isNumeric($(this).val())) {
    //        alert("invalid amount");
    //        setTimeout(function () {
    //            $("#" + ele.toString()).focus();
    //        }, 0);
    //        //$(this).val(0);
    //        update_itemTotal();
    //    }

    //});
    $('#CreatePO').click(function () {
        
        //alert($('#ItemsTotal').val());
        var wentRight = 1;
        var InvalidproductName;
        var idx = 0;

        if ($('#idnSupplier').val() == "") {
            alert('Supplier not selected. Please select supplier from list or add new');
            return false;

        }
        if (isNaN($('#total').val())) {
            alert('Total is not valid');
            return false;
        }
        //
        if (isNaN($('#balance').val())) {
            alert('Balance is not valid');
            return false;
        }
        $('#selectedProducts > tbody  > tr').each(function () {
            idx += 1;
            var price = $(this).find("[id^='purchasePrice']").val();
            InvalidproductName = $(this).find("[id^='name']").val();
            //alert(price);
            if (!price) {
                //alert(price + " returning");
                wentRight = 0;
                return false;

            }
        });

        if (wentRight == 0) {
            //alert("item # " + idx + " " + InvalidproductName + " is not a valid product name. Please select valid product from product list");
            alert("(item # " + idx + ") " + InvalidproductName + " Please select appropriate product name from list");
            return false;
        }

        //if ($('#ItemsTotal').val() == 0) {
        //    alert('Please add at least one product to proceed');
        //    return;
        //}

        if ($('#discount').val().trim() == "") {
            $('#discount').val(0);
        }
        if ($('#paid').val().trim() == "") {
            $('#paid').val(0);
        }
        //if ($('#ItemsTotal').val().trim() == "") {
        //    $('#ItemsTotal').val(0);
        //}
        //if ($('#ReturnItemsTotal').val().trim() == "") {
        //    $('#ReturnItemsTotal').val(0);
        //}

        //$("#CreatePO").attr("disabled", true);
        $('form').preventDoubleSubmission();

    });

    jQuery.fn.preventDoubleSubmission = function () {
        $(this).on('submit', function (e) {
            var $form = $(this);
            //alert('abc');
            if ($form.data('submitted') === true) {
                // Previously submitted - don't submit again
                e.preventDefault();
            } else {
                // Mark it so that the next submit can be ignored
                $form.data('submitted', true);
            }
        });

        // Keep chainability
        return this;
    };

    //$(document).on("click", "OpenNewSuppForm", function () {
    //    $("#dialog-CreateSupplier").dialog("open");
    //});

    $('#OpenNewSuppForm').click(function () {
        $("#dialog-CreateSupplier").dialog("open");
    });

    $('#btnCreateNewSupp').click(function () {
        
        $("#dialog-CreateSupplier").dialog("close");
        //$('#idnSupplier').val(SuppomerId);
        var contents = $("#NewSupplierId").val();
        $("#idnSupplier").val(contents);

        contents = $("#NewSupplierName").val();
        
        $("#supplier").val(contents);

        contents = $("#NewSupplierAddress").val();
        $("#supplierAddress").val(contents);
        //alert(contents);
    });

});

function ConfigDialogueSupplier(param) {
    //alert(param);
    $("#dialog-suppliers").dialog({
        title: 'Select supplier',
        modal: false,
        autoOpen: false,
        resizable: true,
        draggable: true,
        height: '300',
        width: '480',
        closeOnEscape: true,
        position: {
            my: 'left top',
            at: 'left bottom',
            of: $(param)
        },
        open: function (event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
        }

    });

}

function ConfigDialogue(param) {
    //alert(param);
    $("#dialog-products").dialog({
        title: 'Select product',
        modal: false,
        autoOpen: false,
        resizable: true,
        draggable: true,
        height: '300',
        width: '650',
        closeOnEscape: true,
        position: {
            my: 'left top',
            at: 'left bottom',
            of: $(param)
        },
        open: function (event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
        }

    });

}

function ConfigDialogueCreateSupplier() {
    //alert("create supplier configured");
    $("#dialog-CreateSupplier").dialog({
        title: '',
        modal: true,
        autoOpen: false,
        resizable: true,
        draggable: true,
        height: '480',
        width: '600',
        closeOnEscape: true,
        //position: {
        //    my: 'left top',
        //    at: 'left bottom',
        //    of: $(param)
        //},
        open: function (event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog | ui).show();
            $('#dialog-CreateSupplier').css('overflow', 'hidden'); //this line does the actual hiding
        }
        

    });

}
// $('[id^="quantity"],#purchasePrice,#discount,#paid').keyup(function () {
function update_itemTotal() {
    var ItemsTotal = 0;
    var ReturnsTotal = 0;
    var orderQty = 0;
    var returnQty = 0;

    $("#OrderTotal").val('Order total(' + parseInt(orderQty) + ')');
    $("#ReturnTotal").val('Return Total(' + parseInt(returnQty) + ')');
    $('#selectedProducts > tbody  > tr').each(function () {
        var qty = 0;
        var price = 0;

        //alert($(this).find("[id^='saleType']").val());
        if ($(this).find("[id^='saleType']").val() == "false") {
            qty = $(this).find("[id^='quantity']").val();
            if (!(qty)) { qty = 0; }
            price = $(this).find("[id^='purchasePrice']").val();
            orderQty += parseInt(qty);
            var itemAmount = (qty * price);
            ItemsTotal += itemAmount;
            $(this).find("[id^='itemTotal']").val(itemAmount.toFixed(2));
        } else {

            qty = $(this).find("[id^='quantity']").val();
            if (!(qty)) { qty = 0; }
            price = $(this).find("[id^='purchasePrice']").val();
            returnQty += parseInt(qty);
            var ItemAmount = (qty * price);
            ReturnsTotal += ItemAmount;
            $(this).find("[id^='itemTotal']").val(ItemAmount.toFixed(2));
            

        }

        $("#OrderTotal").val('Order total(' + parseInt(orderQty) + ')');
        $("#ReturnTotal").val('Return Total(' + parseInt(returnQty) + ')');
        
    });

    $('[id^="saleType"]').change(function () {
        //var end = this.value;
        //var firstDropVal = $('#saleType').val();
        update_itemTotal();
    });


    //if (ItemsTotal > 0 || ReturnsTotal > 0) {
    //    $('#dvCalculations').show();
    //} else {
    //    $('#dvCalculations').hide();
    //}

    $('#ItemsTotal').val(ItemsTotal.toFixed(2));//for input element
    $('#ReturnItemsTotal').val(ReturnsTotal.toFixed(2));//for input element

    var discount = $('#discount').val();
    var prevBal = parseFloat($("#PreviousBalance").val());
    var subtotal = ItemsTotal - discount - ReturnsTotal;
    var total = ItemsTotal - discount - ReturnsTotal + prevBal;
    //total += $("#PreviousBalance").val();
    $('#subtotal').val(subtotal.toFixed(2));
    $('#total').val(total.toFixed(2));
    $('#paid').val(total.toFixed(2));
    _total = total;

    var paid = $('#paid').val();
    var balance = _total - paid;
    $('#balance').val(balance.toFixed(2));
    
    //$('#ItemsTotal > tbody > tr > td').val(ItemsTotal);
    //just update the total to sum
    //$('.total').text(ItemsTotal);
}
