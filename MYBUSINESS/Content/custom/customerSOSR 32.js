var productColumns = [{ name: 'Barcode', minWidth: '200px' }, { name: 'Id', minWidth: '30px' }, { name: 'Product', minWidth: '320px' }, { name: 'Sale Price', minWidth: '100px' }, { name: 'Qty', minWidth: '20px' }];
//var products = []; //[['Ciplet', '10', '60'], ['Gaviscon', '85', '12'], ['Surficol', '110', '8']];
var products = new Array();

var customerColumns = [{ name: 'Id', minWidth: '100px' }, { name: 'Name', minWidth: '320px' }, { name: 'Address', minWidth: '200px' }, { name: 'Balance', minWidth: '70px' }];
//var products = []; //[['Ciplet', '10', '60'], ['Gaviscon', '85', '12'], ['Surficol', '110', '8']];
var customers = new Array();

//var focusedBtnId = "";
//var focusedBtnSno = "";
var txtSerialNum = 0;
var clickedTextboxId = "name0";
var clickedIdNum = "";
var x, y;
var _total = 0;
function OnTypeCustomerName(param) {

    $(param).mcautocomplete({
        showHeader: true,
        columns: customerColumns,
        source: customers,
        select: function (event, ui) {
            this.value = (ui.item ? ui.item[1] : '');
            //productName = this.value;
            $('#idnCustomer').val(ui.item ? ui.item[0] : '');
            $('#customerAddress').val(ui.item ? ui.item[2] : '');
            $('#PreviousBalance').val(ui.item ? ui.item[3] : '');
            //document.getElementById(clickedTextboxId).focus();
            update_itemTotal();
            return false;
        }

    });

}

var productName = "";
function OnTypeName(param) {
    //alert(products);
    //alert(clickedTextboxId);
    //$('#name' + txtSerialNum).mcautocomplete({

    $(param).keyup(function (e) {

        clickedTextboxId = $(document.activeElement).attr("id");
        clickedIdNum = clickedTextboxId.substring(4);

        if (e.keyCode === 13 && (e.ctrlKey === true)) {

            $('#addNewRow').trigger('click');
        }

    });


    $(param).mcautocomplete({
        showHeader: true,
        columns: productColumns,
        source: products,
        select: function (event, ui) {
            this.value = (ui.item ? ui.item[2] : '');
            productName = this.value;
            $('#salePrice' + clickedIdNum).val(ui.item ? ui.item[3] : '');
            $('#quantity' + clickedIdNum).val(ui.item ? 1 : '');
            $('#idn' + clickedIdNum).val(ui.item ? ui.item[1] : '');
            //document.getElementById(clickedTextboxId).focus();
            update_itemTotal();
            //$('#addNewRow').trigger('click');
            return false;
        }
    });


    //alert("yes");
}

function OnTypeSearchBar(param) {
    //alert("hi");
    //alert(clickedTextboxId);
    //$('#name' + txtSerialNum).mcautocomplete({

    $(param).keyup(function (e) {

        //clickedTextboxId = $(document.activeElement).attr("id");
        //clickedIdNum = clickedTextboxId.substring(4);
        //alert(clickedIdNum);
        if (e.keyCode === 13 && (e.ctrlKey === true)) {

            $('#addNewRow').trigger('click');
            //$('#addNewRow').append('selectedProducts tr:last-child');
        }

    });

    var idRelatedTosearchBar = 0;
    $(param).mcautocomplete({
        showHeader: true,
        columns: productColumns,
        source: products,
        select: function (event, ui) {

            if (txtSerialNum == 0) {
                $('#delete0').trigger('click');
            }
            $('#addNewRow').trigger('click');

            //this.value = (ui.item ? ui.item[2] : '');

            productName = this.value;
            idRelatedTosearchBar = txtSerialNum;
            $('#name' + txtSerialNum).val(ui.item ? ui.item[2] : '');
            $('#salePrice' + txtSerialNum).val(ui.item ? ui.item[3] : '');
            $('#quantity' + txtSerialNum).val(ui.item ? 1 : '');
            $('#idn' + txtSerialNum).val(ui.item ? ui.item[1] : '');
            //document.getElementById(clickedTextboxId).focus();
            update_itemTotal();
            //alert("hi");
            //$('#addNewRow').trigger('click');
            return false;

        }
    });


    //alert("yes");
}

$(function () {
    //OnTypeName('#name0');
    //alert('#' + clickedTextboxId);


    ConfigDialogueCreateCustomer();
    ConfigDialogueCreateProduct();
});

$(document).ready(function () {
    //alert("abc");
    //$("#name0").scannerDetection({
    //    timeBeforeScanTest: 3000, // wait for the next character for upto 200ms
    //    avgTimeByChar: 3000, // it's not a barcode if a character takes longer than 100ms
    //    onComplete: function (barcode, qty) {
    //        $('#customer').text(barcode);
    //        alert(barcode);
    //    } // main callback function	
    //});

    //'[id^="saleType"]'

    $(Document).scannerDetection({

        //https://github.com/kabachello/jQuery-Scanner-Detection

        timeBeforeScanTest: 200, // wait for the next character for upto 200ms
        avgTimeByChar: 40, // it's not a barcode if a character takes longer than 100ms
        //preventDefault: false,

        endChar: [13],
        onComplete: function (barcode, qty) {
            validScan = true;
            //$('#customer').val(barcode);
            //alert(barcode);


            var activeControlId = $(document.activeElement).attr("id");
            //alert(activeControlId);
            if (activeControlId.substring(0, 4) != 'name') {
                alert("To scan product barcode, please place cursor in product name text box.");
                return false;
            }

            //var result = $.grep(products, function (e) { return e.Barcode == barcode; });


            var result = [];
            //if (typeof result === "undefined") {
            //    alert("something is undefined");
            //}

            //alert(result);
            for (var i = 0, len = products.length; i < len; i++) {
                if (products[i][0] === barcode) {
                    result = products[i];
                    //alert(result);
                    break;
                }
            }
            //alert(result.length);
            //var len = result.length;

            if (result.length === 0) {
                alert('unfortunately, No item found against this barcode ');
                return false;
            }




            //if (len == 0) {
            //    alert("unfortunately, No item found against this barcode " + string);
            //    return false;
            //}


            //alert('ji')
            //alert(result[1]);
            //alert(result[2]);
            //alert(result[3]);
            //alert(result[4]);

            //this.value = result[2];//(ui.item ? ui.item[1] : '');


            $('#name' + clickedIdNum).val(result[2]);
            $('#salePrice' + clickedIdNum).val(result[3]);
            $('#quantity' + clickedIdNum).val(1);
            $('#idn' + clickedIdNum).val(result[1]);
            //document.getElementById(clickedTextboxId).focus();
            update_itemTotal();
            $('#addNewRow').trigger('click');



            //if (result.length == 0) {
            //    // not found
            //    alert('0');
            //} else if (result.length == 1) {
            //    // access the foo property using result[0].foo
            //    alert('1');
            //} else {
            //    // multiple items found
            //    alert('m');
            //}




        } // main callback function	,
        //,
        //onError: function (string, qty) {
        //    var activeControlId = $(document.activeElement).attr("id");
        //    if (activeControlId.substring(0, 4) != 'name') {
        //        alert("To scan product barcode, please place cursor in product name text box.");
        //        return false;
        //    }
        //    alert("unfortunately not found product against this barcode" );
        //    //$('#customerAddress').val($('#customerAddress').val() + string);
        //}


    });



    //$(this).closest('form').find("input[type=text], textarea").val("");

    //alert('iam ready');
    document.getElementById('customer').focus();

    //$('#name').tooltip('show')

    //$('[data-toggle="tooltip"]').tooltip();
    var actions = $("table td:last-child").html();
    // Append table with add row form on add new button click

    $('#addNewRow').keydown(function (event) {
        //alert('keydown');
        if (event.keyCode == 13) {
            $('#addNewRow').trigger('click');
        }
    });

    $("#addNewRow").click(function (e) {
        //alert('click');
        //var key = e.which;
        //if (key !== 13)  // the enter key code
        //{

        //    return false;
        //}

        //$(this).attr("disabled", "disabled");
        txtSerialNum += 1;
        //alert(txtSerialNum)
        var index = $("table tbody tr:last-child").index();
        //var rowCount = 
        var row = '<tr>' +
            '<td id="SNo' + txtSerialNum + '">' + $('#selectedProducts tr').length + '</td>' +
            '<td style="display:none;"><input type="hidden" name="SaleOrderDetail.Index" value="' + txtSerialNum + '" /></td>' +
            '<td style="display:none;"><input type="text" readonly class="form-control classBGcolor" name="SaleOrderDetail[' + txtSerialNum + '].ProductId" id="idn' + txtSerialNum + '"></td>' +
            '<td style="text-align:center"><input style="width:130px"  type="text" class="form-control" autocomplete="off" name="name' + txtSerialNum + '" id="name' + txtSerialNum + '"></td>' +
            '<td><input style="width:90px" type="text"  class="form-control autocomplete="off" classBGcolor" name="SaleOrderDetail[' + txtSerialNum + '].SalePrice" id="salePrice' + txtSerialNum + '"></td>' +
            '<td style="float:right"><center><input style="width:50px" type="text" class="form-control" autocomplete="off" name="SaleOrderDetail[' + txtSerialNum + '].Quantity" id="quantity' + txtSerialNum + '"></center></td>' +
            '<td><input type="text" readonly class="form-control classBGcolor" name="itemTotal' + txtSerialNum + '" id="itemTotal' + txtSerialNum + '"tabindex="-1"></td>' +
            '<td><select  style="width:85px;" class="form-control" name="SaleOrderDetail[' + txtSerialNum + '].SaleType" id="saleType' + txtSerialNum + '"><option value="false" selected>Order</option><option value="true">Return</option></select></td>' +
            '<td><button type="button" id="delete' + txtSerialNum + '" class="delete btn btn-default add-new"> <a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a></button></td>' +
            '</tr>';

        //alert(row);
        $("#selectedProducts").append(row);
        //alert(txtSerialNum)

        $("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
        //$('[data-toggle="tooltip"]').tooltip();

        //document.getElementById('name' + txtSerialNum).focus();
        TriggerBodyEvents();

    });
    //////////adding new row working code//////////
    $("#btnCreateNewProd").click(function (e) {
        $("#selectedProducts").find("tr").each(function () {
            var tr = this;
            $([0, 2]).each(function () {
                //   alert($(tr[this]).html());
            });
        });
        //alert('click');
        //var key = e.which;
        //if (key !== 13)  // the enter key code
        //{
        var Itname = $("#ProductName").val();
        var SalepRice = $("#NewProductSalePrice").val();
        var TPrice = $("#totPrice").val();
        //    return false;
        //}
        //here $("#name0").val(Itname);
        //$(this).attr("disabled", "disabled");
        txtSerialNum += 1;
        //alert(txtSerialNum)
        var index = $("table tbody tr:last-child").index();
        //var rowCount = 
        var roww = '<tr>' +
            '<td id="SNo' + txtSerialNum + '">' + $('#selectedProducts tr').length + '</td>' +
            '<td style="display:none;"><input type="hidden" name="SaleOrderDetail.Index" value="' + txtSerialNum + '" /></td>' +
            '<td style="display:none;"><input type="text" readonly class="form-control classBGcolor" name="SaleOrderDetail[' + txtSerialNum + '].ProductId" id="idn' + txtSerialNum + '"></td>' +
            '<td style="text-align:center"><input style="width:100px" value="' + Itname + '"  type="text" class="form-control" autocomplete="off" name="name' + txtSerialNum + '" id="name' + txtSerialNum + '"></td>' +
            '<td><input style="width:90px" type="text" value="' + SalepRice + '" class="form-control autocomplete="off" classBGcolor" name="SaleOrderDetail[' + txtSerialNum + '].SalePrice" id="salePrice' + txtSerialNum + '"></td>' +
            '<td style="float:left"><center><input style="width:50px" type="text" class="form-control" value="1" autocomplete="off" name="SaleOrderDetail[' + txtSerialNum + '].Quantity" id="quantity' + txtSerialNum + '"></center></td>' +
            '<td><input type="text" readonly class="form-control classBGcolor" value="' + TPrice + '" name="itemTotal' + txtSerialNum + '" id="itemTotal' + txtSerialNum + '"tabindex="-1"></td>' +
            '<td><select class="form-control" name="SaleOrderDetail[' + txtSerialNum + '].SaleType" id="saleType' + txtSerialNum + '"><option value="false" selected>Order</option><option value="true">Return</option></select></td>' +
            '<td><button type="button" id="delete' + txtSerialNum + '" class="delete btn btn-default add-new"> <a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a></button></td>' +
            '</tr>';


        //alert(row);
        $("#selectedProducts").append(roww);
        //alert(txtSerialNum)

        // $("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
        //$('[data-toggle="tooltip"]').tooltip();

        document.getElementById('name' + txtSerialNum);
        TriggerBodyEvents();
        update_itemTotal();
    });

    //////////adding new row working code//////////


    // Edit row on edit button click
    $(document).on("click", ".edit", function () {
        $(this).parents("tr").find("td:not(:last-child)").each(function () {
            $(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
        });
        $(this).parents("tr").find(".add, .edit").toggle();
        $("#addNewRow").attr("disabled", "disabled");
    });



    //$(document).on("keyup", "#delete1", function (event) {
    //    if (event.keyCode == 13) {
    //        $("#delete1").trigger('click');
    //    }
    //});



    // Delete row on delete button click
    //$(document).on("click", "#delete1", function () {
    //    $(this).parents("tr").remove();
    //    $("#addNewRow").removeAttr("disabled");
    //    update_itemTotal();
    //});
    $(document).on("keypress", "form", function (event) {
        return event.keyCode != 13;
    });
    //$('td[id^="' + value +'"]')         "[id^='quantity']"


    TriggerFooterEvents();

    //$("[id^='quantity']").keydown(function (e) {

    //    // Allow: backspace, delete, tab, escape, enter and .(45) and -(46)
    //    if ($.inArray(e.keyCode, [8, 9, 27, 13, 110]) !== -1 ||

    //        // Allow: Ctrl+A, Command+A
    //        (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
    //        // Allow: home, end, left, right, down, up
    //        (e.keyCode >= 35 && e.keyCode <= 40)) {
    //        // let it happen, don't do anything

    //        return;
    //    }
    //    // Ensure that it is a number and stop the keypress
    //    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
    //        e.preventDefault();
    //    }
    //});

    //$('form').submit(function (e) {
    //    e.preventDefault();// but here
    //    // the rest of your code here
    //});
    $('#CreateSO').keydown(function (event) {
        if (event.keyCode == 13) {
            $('#CreateSO').trigger('click');
        }
    });
    $('#CreateSO').click(function () {

        if ($('#idnCustomer').val() == "") {
            alert('Customer not found. Please select customer from list or add new');
            return false;

        }

        //-----------------------------------------------------------------v-product stock check-v--------------------------
        //var EnteredQty1 = 0;
        //var EnteredProductId1 = 0;
        //var tblProductStock1 = 0;
        //var tblProductId = 0;
        //var saleType1 = false;
        //var idx1 = 0;
        //var isFalse = true;
        //$('#selectedProducts tbody tr').each(function () {
        //    idx1 += 1;
        //    EnteredQty1 = $(this).closest("tr").find("[id^='quantity']").val();
        //    EnteredProductId1 = $(this).closest("tr").find("[id^='idn']").val().trim();
        //    saleType1 = $(this).closest("tr").find("[id^='saleType']").val().trim();
        //    $('#productsTable tr').each(function () {
        //        tblProductId1 = $(this).find(".ProductId").html();
        //        if (typeof tblProductId1 != 'undefined') {
        //            if (EnteredProductId1 == tblProductId1.trim()) {
        //                //alert('abc');
        //                tblProductStock1 = $(this).find(".stock").html().trim();
        //            }
        //        }
        //    });
        //    if (Number(EnteredQty1) > Number(tblProductStock1) && saleType1 == "false") {
        //        alert("Item # " + idx1 + " available stock is " + tblProductStock1);
        //        //$(this).closest("tr").find("[id^='quantity']").val(tblProductStock1);
        //        isFalse = false;
        //        return false;
        //    }
        //});
        //if (isFalse == false) {
        //    return false;
        //}
        //-----------------------------------------------------------------^-product stock check-^--------------------------

        //alert($('#ItemsTotal').val());
        var wentRight = 1;
        var InvalidproductName;
        var idx = 0;



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
            var price = $(this).find("[id^='salePrice']").val();
            InvalidproductName = $(this).find("[id^='name']").val();
            //alert(InvalidproductName);
            if (!price) {
                //alert(price + " returning");

                //var text1 = $(this).find("[id^='delete']").html();
                //var deleteId = $(this).closest('tr').find('td:nth-child(1)').text();
                var deleteRow = $(this).find("[id^='delete']").attr('id');
                //alert(deleteRow);

                $('#' + deleteRow).trigger('click');

                //wentRight = 0;
                //return false;


                //commented above code reson: if row does not contain sale price, i told service side not save that row
            }
        });

        if (wentRight == 0) {
            //alert("item # " + idx + " " + InvalidproductName + " is not a valid product name. Please select valid product from product list");
            alert("(Item # " + idx + ") Product " + InvalidproductName + "not found. Please select appropriate product name from list");
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

        //$("#CreateSO").attr("disabled", true);
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
    //$(document).on("click", "OpenNewCustForm", function () {
    //    $("#dialog-CreateCustomer").dialog("open");
    //});

    $('#OpenNewCustForm').click(function () {
        
        $("#dialog-CreateCustomer").dialog("open");
    });
    $('#SidebarCustForm').click(function () {
        $("#dialog-CreateCustomer").dialog("open");
    });


    $('#OpenNewProdForm').click(function () {
        $("#dialog-CreateProduct").dialog("open");

    });

    $('#btnCreateNewCust').click(function () {

        $("#dialog-CreateCustomer").dialog("close");
        //$('#idnCustomer').val(CustomerId);
        var contents = $("#NewCustomerId").val();
        $("#idnCustomer").val(contents);

        contents = $("#NewCustomerName").val();

        $("#customer").val(contents);

        contents = $("#NewCustomerAddress").val();
        $("#customerAddress").val(contents);

        $("#PreviousBalance").val(0.00);
        update_itemTotal();
        //alert(contents);
    });
    $('#btnCreateNewProd').click(function () {

        $("#dialog-CreateProduct").dialog("close");

    });
    //$('[id^="saleType"]').change(function () {
    //    update_itemTotal();
    //});

});

function TriggerBodyEvents() {
    //alert('#name' + txtSerialNum);
    OnTypeName('#name' + txtSerialNum);

    $('#quantity' + txtSerialNum).keyup(function () {
        update_itemTotal();

    });
    $('#salePrice' + txtSerialNum).keyup(function () {
        update_itemTotal();
    });
    //$('#delete' + txtSerialNum).keyup(function () {
    //    update_itemTotal();
    //});
    $('#delete' + txtSerialNum).keyup(function (event) {
        //alert(txtSerialNum);
        if (event.keyCode == 13) {
            //var focused = document.activeElement;
            //alert('#' + document.activeElement.id);
            //$('#delete' + txtSerialNum).trigger('click');
            //$('#'+focused.id).trigger('click');
            $('#' + document.activeElement.id).trigger('click');
        }
    });
    $('#delete' + txtSerialNum).click(function () {
        //alert($(this).html);
        $(this).parents("tr").remove();
        $("#addNewRow").removeAttr("disabled");
        update_itemTotal();
    });
    //
    //$('#PreviousBalance').keyup(function () {
    //    alert("fff");
    //    update_itemTotal();
    //});
    $('#quantity' + txtSerialNum).keydown(function (e) {

        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [8, 9, 27, 13, 110, 46]) !== -1 ||
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
    $('#saleType' + txtSerialNum).change(function () {
        //var end = this.value;
        //var firstDropVal = $('#saleType').val();
        update_itemTotal();
    });
    //$("[id^='name']").keydown(function (e) {
    //    //alert('hi');
    //    if (e.keyCode === 13 && (e.ctrlKey === true || e.metaKey === true)) {

    //        $('#addNewRow').trigger('click');
    //    }

    //});
}
function TriggerFooterEvents() {
    $("#discount,#PreviousBalance").keyup(function () {
        //alert("afasf");
        update_itemTotal();
    });

    $("#paid").keyup(function () {
        //alert(_total);
        var paid = $('#paid').val();
        var balance = _total - paid;
        $('#balance').val(balance.toFixed(2));

    });

}
function ConfigDialogueCreateCustomer() {
    
    //alert("create customer configured");
    $("#dialog-CreateCustomer").dialog({
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
            $('#dialog-CreateCustomer').css('overflow', 'hidden'); //this line does the actual hiding
        }


    });

}
function ConfigDialogueCreateProduct() {
    //alert("create customer configured");
    $("#dialog-CreateProduct").dialog({
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
            $('#dialog-CreateProduct').css('overflow', 'hidden'); //this line does the actual hiding
        }


    });

}

$('td:first-child').each(function () {
    console.log($(this).text());
});

function update_itemTotal() {
    var ItemsTotal = 0;
    var ReturnsTotal = 0;
    var orderQty = 0;
    var returnQty = 0;
    var SN = 0;
    $("#OrderTotal").val('Order Total(' + parseInt(orderQty) + ')');
    $("#ReturnTotal").val('Return Total(' + parseInt(returnQty) + ')');
    $('#selectedProducts > tbody  > tr').each(function () {

        SN += 1;
        $(this).find("[id^='SNo']").text(SN);

        var qty = 0;
        var price = 0;

        //alert($(this).find("[id^='saleType']").val());
        if ($(this).find("[id^='saleType']").val() == "false") {
            qty = $(this).find("[id^='quantity']").val();
            if (!(qty)) { qty = 0; }
            price = $(this).find("[id^='salePrice']").val();
            orderQty += parseInt(qty);
            var itemAmount = (qty * price);
            ItemsTotal += itemAmount;
            $(this).find("[id^='itemTotal']").val(itemAmount.toFixed(2));
        } else {
            //alert($('#saleType').val());
            qty = $(this).find("[id^='quantity']").val();
            if (!(qty)) { qty = 0; }
            price = $(this).find("[id^='salePrice']").val();
            returnQty += parseInt(qty);
            var ItemAmount = (qty * price);
            ReturnsTotal += ItemAmount;
            $(this).find("[id^='itemTotal']").val(ItemAmount.toFixed(2));


        }

        $("#OrderTotal").val('Order Total(' + parseInt(orderQty) + ')');
        $("#ReturnTotal").val('Return Total(' + parseInt(returnQty) + ')');
    });

    //$('#OpenNewCustForm').click(function () {
    //    $("#dialog-CreateCustomer").dialog("open");
    //});

    //$('[id^="quantity"]').change(function () {
    //    alert("");
    //});

    //jQuery('[id^="quantity"]').on('change input propertychange paste', function () {
    //    alert("c");
    //});

    /////////////////////////////////
    //$('[id^="quantity"]').blur(function () {
    //    //var inputObj = this;
    //    var EnteredQty = 0;
    //    var EnteredProductId = 0;
    //    var tblProductStock = 0;
    //    var tblProductId = 0;
    //    var saleType = false;
    //    EnteredQty = this.value.trim();
    //    //alert(this.value.trim());
    //    EnteredProductId = $(this).closest("tr").find("[id^='idn']").val().trim();
    //    saleType = $(this).closest("tr").find("[id^='saleType']").val().trim();


    //    $('#productsTable tr').each(function () {
    //        tblProductId = $(this).find(".ProductId").html();

    //        if (typeof tblProductId != 'undefined') {
    //            if (EnteredProductId == tblProductId.trim()) {
    //                //alert('abc');
    //                tblProductStock = $(this).find(".stock").html().trim();
    //                //alert(tblProductStock.trim());
    //                //if (EnteredQty.trim() > tblProductStock.trim()) {
    //                //    alert("available stock is " + tblProductStock);
    //                //    return false; 
    //                //}
    //                //return false;
    //            }
    //        }
    //    });
    //    //alert(EnteredQty.trim());
    //    //alert(tblProductStock.trim());
    //    if (Number(EnteredQty) > Number(tblProductStock) && saleType == "false") {

    //        alert("available stock is " + tblProductStock);
    //        $(this).closest("tr").find("[id^='quantity']").val(EnteredQty.trim());
    //        //return false;

    //    }

    //    //$('#productsTable .ProductIdd').each(function () {
    //    //    alert($(this).html());
    //    //});

    //});
    /////////////////////////////////////




    //$('[id^="saleType"]').change(function () {
    //    //var end = this.value;
    //    //var firstDropVal = $('#saleType').val();
    //    update_itemTotal();
    //});

    //$('[id^="quantity"]').change(function () {
    //    //var end = this.value;
    //    //var firstDropVal = $('#saleType').val();

    //    update_itemTotal();
    //});


    //jQuery('[id^="quantity"]').on('input propertychange paste', function () {
    //    alert("qunatity was entered");
    //});

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
    //alert(subtotal);
    $('#subtotal').val(subtotal.toFixed(2));
    $('#total').val(total.toFixed(2));
    $('#paid').val(total.toFixed(2));
    _total = total;
    //alert(ItemsTotal + ", " + discount + ", " + ReturnsTotal + ", " + prevBal);
    var paid = $('#paid').val();
    var balance = _total - paid;
    $('#balance').val(balance.toFixed(2));

    //$('#ItemsTotal > tbody > tr > td').val(ItemsTotal);
    //just update the total to sum
    //$('.total').text(ItemsTotal);
}

