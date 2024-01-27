
var selecteBannerid = 0;
var user = []
displayCoupon()
function displayCoupon() {
    fetch("http://localhost:5001/admin/getALLcoupon")

        .then(response => response.json())
        .then(data => {
            
            user = data.coupons;
            console.log(user);
            setUser()

        })
        .catch(error => {
            console.error("the error is:", error);
        });
}
function setUser() {
    const tbody = document.getElementById("data-body");
    user.forEach(item => {
        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = user.indexOf(item) + 1;
        row.appendChild(idCell) ;

        const userCell = document.createElement("td");
        userCell.textContent = item.code;;
        row.appendChild(userCell);

        const emailCell = document.createElement("td");
        emailCell.textContent = item.description;
        row.appendChild(emailCell);

        const statusCell = document.createElement("td");
        statusCell.textContent = item.discount;
        row.appendChild(statusCell);

        const expiryCell = document.createElement("td");
        expiryCell.textContent = item.validFrom;
        row.appendChild(expiryCell);

        const validity = document.createElement("td");
        validity.textContent = item.validTo;
        row.appendChild(validity);



        // DELETE BUTTON
        const buttCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("btn", "btn-info");
        deleteButton.textContent = "BLOCK";
        deleteButton.addEventListener("click", function () {
            Swal.fire({
                title: 'You Sure?',
                text: "This user will be BLOCKED !",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#1CC88A',
                cancelButtonColor: '#d33',
                confirmButtonText: 'YES'
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch("http://localhost:5001/user/userDelete/" + item._id, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            location.reload();
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                    console.log("DELETE button  clicked!!");
                }
            });
        });


        buttCell.appendChild(deleteButton);
        row.appendChild(buttCell);



        tbody.appendChild(row);
    })
}

// ---------------------------------------------------------------------------------------------------
// UPDATE USER FUNCTION
function updateBanner() {
    // var categoryName = document.getElementById("categoryname").value;
    // var description = document.getElementById("categorydescription").value;
    let body = {
        bannerTitle: document.getElementById("couponname").value,
        description: document.getElementById("bannerdescription").value,
        bannerImage: document.getElementById("bannerimage").value,
    }
    fetch("http://localhost:5001/banner/updateBanner/" + selecteBannerid, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
        .then(response => response.json())
        .then(data => {
            selecteBannerid = ""
            console.log(data);
            location.reload()
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// -----------------------------------------------------

// create BANNER
function createCoupon() {
    let body = {
        code: document.getElementById("couponname").value,
        description: document.getElementById("coupondescription").value,
        discount: document.getElementById("couponamount").value,
        validFrom: document.getElementById("couponstartdate").value,
        validTo: document.getElementById("couponExpiry").value,
    }
    console.log(body);
    fetch("http://localhost:5001/admin/create-coupon", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        ``.then(data => {
            banner = data.data
            console.log(data);
            if (data.statusCode === 400) {
                Swal.fire({
                    icon: 'ERROR !',
                    title: 'Please fill ...',
                    text: "Required fields :" + data.error.missing
                })
            }
            else {
            }

        })
        .catch(error => {
            console.error('Error:', error);
        });
}
