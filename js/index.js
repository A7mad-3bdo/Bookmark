var form = document.querySelector(".section-inputs");
var siteName = document.getElementById("bookmarkNameInput");
var siteUrl = document.getElementById("siteUrlInput");
var row = document.getElementById("showData");
var explanation = document.querySelector(".explanation");
var explanationClose = document.querySelector(".explanation-close");
var siteInfo = [];


function storeSite() {
    var site = {
        bookmarkNameInput: siteName.value,
        siteUrlInput: siteUrl.value
    }
    siteInfo.push(site);
    displaySite();
    localStorage.setItem("site", JSON.stringify(siteInfo));

    // clearForm();

}

/* Start Form Actions */ 

form.addEventListener("submit", function(event) {
    event.preventDefault();
    storeSite();
})

/* End Form Actions */ 



/* Start of display */
function displaySite() {
    var x = ``;

    for(var i= 0; i < siteInfo.length; i++){
        x += `
        <tr>
            <td>${i+1}</td>
            <td>${siteInfo[i].bookmarkNameInput}</td>
            <td>
                <button class="btn" id="tabelbutton1"><a href="${siteInfo[i].siteUrlInput}" target="_blank"><i class="fa-solid fa-eye pe-2"></i>Visit</a></button>
            </td>
            <td>
                <button onclick="deleteSite(${i})" class="btn" id="tabelbutton2"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button>
            </td>
        </tr>
    `   
    } 
    row.innerHTML = x;
}

function displayNone() {

    var x = null;
    row.innerHTML = x;
}

if (siteName.value == "" || siteUrl.value == "" ){
    form.addEventListener("submit", function() {
        explanation.classList.replace ("d-none", "d-flex");
        displayNone();
    })
}

explanationClose.addEventListener("click", function(){
    explanation.classList.replace("d-flex", "d-none")
})
/* End of display */




/* Start of delete */

function deleteSite (indexDelete) {
    siteInfo.splice(indexDelete, 1);
    displaySite();

}
/* End of delete */

/* Start of clear */

function clearForm () {
    siteName.value = null;
    siteUrl.value = null;
}
/* End of delete */


/* Start of Validation */

function validateInputs(element) {
    var regex = {
        bookmarkNameInput: /^[\w]{3,}$/,
        siteUrlInput: /^(https?:\/\/www\.[a-zA-Z0-9-]+\.(com|net|org)\/?)$/
    }
    if (regex[element.id].test(element.value))
        {
            element.classList.add("is-valid");
            element.classList.remove("is-invalid");
            element.nextElementSibling.classList.replace("d-block", "d-none");
            form.addEventListener("submit", function() {
                explanation.classList.replace ("d-flex", "d-none");
                displaySite();
            })
            

        } 
    else {
            element.classList.add("is-invalid");
            element.classList.remove("is-valid");
            element.nextElementSibling.classList.replace("d-none", "d-block");
            form.addEventListener("submit", function() {
                explanation.classList.replace ("d-none", "d-flex");
                displayNone();
            })
            
        }
}

/* End of Validation */






