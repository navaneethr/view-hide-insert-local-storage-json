var arr = [];// Empty array for me to push values retrieved from data.json
$(document).ready(function () {
    /*when the document is ready I want to get the data and store it
     in local storage and get it back to display in a table*/
    $.getJSON('data.json', function (data) { //gettig the JSON data

        // console.log(data[1]);

        for (var i = 0; i < data.length; i++) {

            arr.push(data[i]); // got all the data and pushed it into array

        }

        localStorage.setItem('details', JSON.stringify(arr)); //storing that array into local storage

        var retrievedDetails = JSON.parse(localStorage.getItem('details'));
        //Got the details back from LS to display in the table

        // console.log(retrievedDetails[2]);

        for (var x = 0; x < retrievedDetails.length; x++) {

            $('#table').append("<tr id='tr" + x + "'>" +
                "<td>" + retrievedDetails[x].firstname + " " + retrievedDetails[x].lastname + "</td>" +
                "<td>" + retrievedDetails[x].location + "</td>" +
                "<td>" + retrievedDetails[x].department + "</td>" +
                "<td><input class='view w3-button w3-light-blue' type='button' id='viewbtn" + x + "' value='view'></td>" +
                "<td><input class='edit w3-button w3-light-blue' type='button' id='editbtn" + x + "' value='edit'></td></tr>");

        }

        var isClicked = true;

        $(".view").click(function (e) {

            console.log(isClicked);


            var idClicked = e.target.id;
            //click function targeting the class and getting the id of the button clicked using the event

            var lenOfID = idClicked.length; //getting the length of the id of the btn

            var idStr = idClicked.substring(7, lenOfID); // ID in the form of a string

            var idNum = parseInt(idStr); // ID in the form of a Number
            //getting the number of the btn clicked and converting it to number

            console.log(idNum); //getting the number
            console.log(retrievedDetails[idNum].firstname);
            // getting the details from the local storage and displaying it for test


            var trLength = $(".infoTr" + idStr).length; //Getting the number of information table rows
            //using a class because, since IDs have to be unique, and the length property of jQuery always returns ZERO

            //trLength through first iteration is Zero and then a <tr> is created, so it doesnt count the first time

            console.log("The TR length is " + trLength);

            if (isClicked == true) { //if the view btn is clicked

                if (trLength < 1) {
                    $("<tr id='infoTrID" + idStr + "' class='infoTr" + idStr + " extraInfoRow'>" +
                        "<td class='infoTd w3-rest' colspan='5'>" +
                        "<b>Phone:</b> " + retrievedDetails[idNum].phone + "<br/>" +
                        "<b>Email:</b> " + retrievedDetails[idNum].email + "<br/>" +
                        "<b>Communication Address:</b> " + retrievedDetails[idNum].address_communication + "<br/>" +
                        "<b>Permanent Address:</b> " + retrievedDetails[idNum].address_permananet + "<br/>" +
                        "<b>Previous Employer:</b> " + retrievedDetails[idNum].previous_employer + "</td>" +
                        "</tr>").insertAfter("#tr" + idStr + "");
                    $('#viewbtn' + idStr + '').val("hide");
                }

                isClicked = false;

            }
            else { //if the view button is unclicked
                console.log(isClicked + " Hello")
                console.log(idStr);
                $(".infoTr" + idStr + "").remove();
                $('#viewbtn' + idStr + '').val("view");
                isClicked = true;
            }


        });

        $(".edit").click(function (e) {
            var idClicked = e.target.id;

            console.log(idClicked);
        });


    });

    $('#submitID').click(function () {

            var fname = $('#Fname').val();
            var lname = $('#Lname').val();
            var dept = $('#department').val();
            var ph = $('#phone').val();
            var email = $('#email').val();
            var CAdd = $('#CommAddress').val();
            var PAdd = $('#PermAddress').val();
            var PEmp = $('#PrevEmployer').val();
            var status = false;

            if (fname.length < 1) {
                $('#Fnameloc').html("Please enter your firstname");
                status = false;
            } else {
                $('#Fnameloc').html("");
                status = true;
            }
            if (lname.length < 1) {
                $('#Lnameloc').html("Please enter your lastname");
                status = false;
            } else {
                $('#Lnameloc').html("");
                status = true;
            }

            if (ph.length < 10) {
                $('#Phoneloc').html("Check the number of digits, minimum of 10");
                status = false;
            } else {
                $('#Phoneloc').html("");
                status = true;
            }
            if (dept.length < 1) {
                $('#Deptloc').html("Please enter your department");
                status = false;
            } else {
                $('#Deptloc').html("");
                status = true;
            }
            if (email.length < 1) {
                $('#Emailloc').html("Please enter your Email");
                status = false;
            } else {
                $('#Emailloc').html("")
                ;status = true;
            }
            if (CAdd.length < 1) {
                $('#ComAddloc').html("Please enter your Communication Address");
                status = false;
            } else {
                $('#ComAddloc').html("")
                ;status = true;
            }
            if (PAdd.length < 1) {
                $('#PermAddloc').html("Please enter your Permanent Address");
                status = false;
            } else {
                $('#PermAddloc').html("")
                ;status = true;
            }

            if (PEmp.length < 1) {
                $('#PrevEmploc').html("Please enter your Previous Employer name");
                status = false;
            } else {
                $('#PrevEmploc').html("")
                ;status = true;
            }
            //return status;
        }
    );


});