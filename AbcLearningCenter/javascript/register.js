var jQueryScript = document.createElement('script')  
jQueryScript.setAttribute('src','https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js')
document.head.appendChild(jQueryScript)

function randomString(length= 6) {
	var result= "";
	var characters= "ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnpqrstuvwxyz123456789";
	var charactersLength = characters.length;

	for ( var i = 0; i < length; i++ ) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

function validate(){
    var name = document.forms.formRegister.name.value;
    var gender = document.forms.formRegister.gender.value;
    var email = document.forms.formRegister.email.value;
    
    if (isAlpha(name)){
        if (isAlpha(gender, email)){
            addData();
            return true;
        }
    }

    return false;
}

function mustFillValidation(value) {
	if (!value.trim().length) 
		return false

	return true
}

function addData(){
    var key= randomString()

    var name = document.forms.formRegister.name.value;
    var gender = document.forms.formRegister.gender.value;
    var email = document.forms.formRegister.email.value;

    if (!mustFillValidation(name) || !mustFillValidation(gender) || !mustFillValidation(email)) {
        alert("please fill out all form")
        return
    }

    const detail = JSON.stringify([name, gender, email]);
    
    localStorage.setItem(name, detail);
    showAll();
}

function editData(key) {
    $("#updateBtn").show()

    localStorage.setItem("currentKey", key)

    const {name, gender, email}= document.forms.formRegister

    let data = JSON.parse(localStorage.getItem(key));
    name.value = data[0];
    gender.value = data[1];
    email.value = data[2];
}

function deleteData(name){
    localStorage.removeItem(name);
    showAll();
    document.forms.formRegister.name.value = null;
    document.forms.formRegister.gender.value = null;
    document.forms.formRegister.email.value = null;;
}

function updateData() {
	var name = document.forms.formRegister.name.value;
	var gender = document.forms.formRegister.gender.value;
	var email = document.forms.formRegister.email.value;

	var currentKey= localStorage.getItem("currentKey") 

	var detail = JSON.stringify([name, gender, email])

	localStorage.setItem(currentKey, detail)
	localStorage.removeItem("currentKey")

	$("#updateBtn").hide()

	document.forms.formRegister.name.value = null;
	document.forms.formRegister.gender.value = null;
	document.forms.formRegister.email.value = null;

	showAll();
}

function clearAll(){
    localStorage.clear();
    showAll();
    document.forms.formRegister.name.value = null;
    document.forms.formRegister.gender.value = null;
    document.forms.formRegister.email.value = null;;
}

function showAll() {
    document.getElementById('list').innerHTML = "";
    var key = "";
    var list = `<tr>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Email</th>
                    <th colspan="10">Action</th>
                </tr> \n`;
    var i = 0;

    if (localStorage.length == 0) {
        list += `<tr>
                    <td colspan="100"><i>empty</i></td>
                </tr>\n`;
      } else {
        for (i = 0; i < localStorage.length; i++) {
            key = localStorage.key(i);

            if(key=="currentEmail") continue

          let data = JSON.parse(localStorage.getItem(key));
        
        list += `<tr>
            <td>${data[0]}</td>
            <td>${data[1]}</td>
            <td>${data[2]}</td>
            <td><input type="button" class="b-edit" value="Edit" onclick="editData('${key}')"></td>
            <td><input type="button" class="b-delete" value="Delete" onclick="deleteData('${key}')"></td>
        </tr>`;
        }
    }
    document.getElementById('list').innerHTML = list;
}