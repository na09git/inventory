var txtSerialNum = 0;
var clickedTextboxId = "name0";
var clickedIdNum = "";
var x, y;

function OnTypeSupplierName(param) {
    //alert(param);
    $(param).keyup(function (e) {
        //alert(param);
        //var focused = document.activeElement;
        //clickedTextboxId = $(document.activeElement).attr("id");

        //if ($.isNumeric(clickedTextboxId.substring(4)) == true) {

        //    $('#Supplier').val("");
        //}
        $('#idnSupplier').val("");
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
    //alert(param);
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

    $('#dialog-suppliers').find('tr').click(function () {
        //alert($(this).find('td:eq(0)').text().trim() + " " + $(this).find('td:eq(1)').text().trim() + " " + $(this).find('td:eq(2)').text().trim() + " " + $(this).find('td:eq(3)').text().trim() + " " + $(this).find('td:eq(4)').text().trim());


        var col0 = $(this).find('td:eq(0)').text().trim();
        var col1 = $(this).find('td:eq(1)').text().trim();

        //$('#' + clickedTextboxId).val(col1);
        $('#supplier').val(col0);
        $('#idnSupplier').val(col1);

        $("#dialog-suppliers").dialog("close");
    });

    $('#dialog-products').find('tr').click(function () {
        //alert($(this).find('td:eq(0)').text().trim() + " " + $(this).find('td:eq(1)').text().trim() + " " + $(this).find('td:eq(2)').text().trim() + " " + $(this).find('td:eq(3)').text().trim() + " " + $(this).find('td:eq(4)').text().trim());
        
        var idnCol = $(this).find('td:eq(4)').text().trim();
        var nameCol = $(this).find('td:eq(0)').text().trim();
        var PPCol = $(this).find('td:eq(1)').text().trim();
        //alert(PPCol);
        //$('#' + clickedTextboxId).val(col1);
        $('#name' + clickedIdNum).val(nameCol);
        $('#idn' + clickedIdNum).val(idnCol);
        $('#purchasePrice' + clickedIdNum).val(PPCol);
        $('#quantity' + clickedIdNum).val(1);
        $('#itemTotal' + clickedIdNum).val(PPCol);

        $('[data-toggle="tooltip"]').tooltip();
        var actions = $("table td:last-child").html();

        update_itemTotal();
        $("#dialog-products").dialog("close");
    });
});

$(document).ready(function () {

    document.getElementById(clickedTextboxId).focus();

    //$('#name').tooltip('show')

    $('[data-toggle="tooltip"]').tooltip();
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
            '<td>' + actions + '</td>' +
            '</tr>';


        $("#selectedProducts").append(row);
        //alert(txtSerialNum)

        $("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
        $('[data-toggle="tooltip"]').tooltip();

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

    $('[id^="quantity"],#purchasePrice,#discount,#paid').keyup(function () {

        update_itemTotal();
    });

    $('[id^="quantity"],#discount,#paid').keydown(function (e) {
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

    //onFormSave
    $('#CreatePO').click(function () {
        //$("#CreatePO").attr("disabled", true);
        //alert($('#ItemsTotal').val());
        var wentRight = 1;
        var InvalidproductName;
        var idx = 0;

        if ($('#idnSupplier').val() == "") {
            alert('Please select supplier');
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

        if ($('#ItemsTotal').val() == 0) {
            alert('Please add at least one product to proceed');
            return;
        }

        if ($('#discount').val() == "") {
            $('#discount').val(0);
        }
        if ($('#paid').val() == "") {
            $('#paid').val(0);
        }
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
        width: '280',
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

function update_itemTotal() {
    var ItemsTotal = 0;
    $('#selectedProducts > tbody  > tr').each(function () {
        //var qty = $(this).find('td:eq(2)').text().trim();

        var qty = $(this).find("[id^='quantity']").val();
        var price = $(this).find("[id^='purchasePrice']").val();

        var itemAmount = (qty * price);
        ItemsTotal += itemAmount;
        $(this).find("[id^='itemTotal']").val(itemAmount.toFixed(2));

    });

    if (ItemsTotal > 0) {
        $('#dvCalculations').show();
    } else {
        $('#dvCalculations').hide();
    }

    $('#ItemsTotal').val(ItemsTotal.toFixed(2));//for input element

    var discount = $('#discount').val();

    var total = ItemsTotal - discount;
    $('#total').val(total.toFixed(2));

    var paid = $('#paid').val();

    var balance = total - paid;
    $('#balance').val(balance.toFixed(2));

    //$('#ItemsTotal > tbody > tr > td').val(ItemsTotal);
    //just update the total to sum
    //$('.total').text(ItemsTotal);
}
