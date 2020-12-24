// Submitting Emp Form to Local Storage

var empDetailsForm = document.getElementById('empDetailsForm');
empDetailsForm.addEventListener('submit',saveEmpData);


function saveEmpData(e){
    
    
    var d=new Date();
    var getId=d.getTime();

    var emp = {
        id:getId,
        emp_name: document.getElementById('emp_name').value,
        emp_email: document.getElementById('emp_email').value,
        emp_mobile: document.getElementById('emp_mobile').value,
        emp_address: document.getElementById('emp_address').value
    }

    if(localStorage.getItem('employees')===null){
        var employees=[];
        employees.push(emp);
        localStorage.setItem('employees', JSON.stringify(employees));
    }else{
        var employees=JSON.parse(localStorage.getItem('employees'));
        employees.push(emp);
        localStorage.setItem('employees', JSON.stringify(employees));
    }
    document.getElementById('exampleModalCenter').close();
    document.getElementById('empDetailsForm').reset();
    showEmpData();
    e.preventDefault();
}

// Displaying Employes 

window.onload = function(){
    this.showEmpData();
}

function showEmpData(){
    var tbody = document.getElementById('t-body');
    var employees = JSON.parse(localStorage.getItem('employees'));
    
    var eachEmpRow = ' ';
    for(let i=0;i<employees.length;i++){
        eachEmpRow += 
        `<tr>
            <th scope="row">${i}</th>
                <td>${employees[i].emp_name}</td>
                <td>${employees[i].emp_email}</td>
                <td>${employees[i].emp_mobile}</td>
                <td>${employees[i].emp_address}</td>
                <td>
                    <button id="${employees[i].id}" onclick="editEmp(this.id, this)" class="btn btn-sm btn-primary" title="Edit" ><i class="fa fa-pencil "></i></button>
                    <button id="${employees[i].id}" onclick="deleteEmp(this.id)" class="btn btn-sm btn-danger" title="Delete"><i class="fa fa-trash"></i></button>
                </td>
        </tr>`;
    }
    tbody.innerHTML = eachEmpRow;
}

// Deleting Employee From Local Storage  

function deleteEmp(id){
    var employees = JSON.parse(localStorage.getItem('employees'));

    for(let i=0;i<employees.length;i++){
        if(employees[i].id == id){
            employees.splice(i, 1);
        }
    }
    localStorage.setItem('employees', JSON.stringify(employees));
    showEmpData();
}

// Editing and saving the Emp Data
function editEmp(id, selectedrow){
    var employees = JSON.parse(localStorage.getItem('employees'));

    var activeRow = selectedrow.parentElement.parentElement.rowIndex;
    //console.log(activeRow-1);

    var tbody = document.getElementById('t-body').children[activeRow-1];
    var eachEmpRow = ' ';

    for(let i=0;i<employees.length;i++){
        if(id == employees[i].id){
            eachEmpRow += 
            `<tr>
                <th scope="row">${i}</th>
                    <td><input type="text" id="edit_emp_name" value="${employees[i].emp_name}" /></td>
                    <td><input type="text" id="edit_emp_email" value="${employees[i].emp_email}" /></td>
                    <td><input type="text" id="edit_emp_mobile" value="${employees[i].emp_mobile}" /></td>
                    <td><input type="text" id="edit_emp_address" value="${employees[i].emp_address}" /></td>
                    <td>
                        <button id="${employees[i].id}" onclick="saveEditEmp(this.id)" class="btn btn-sm btn-success edit" title="Save"><i class="fa fa-save"></i></button>
                        <button onclick="cancelEditEmp()" class="btn btn-sm btn-warning text-white" title="Cancel">X</button>
                    </td>
            </tr>`;
        }
    }
    tbody.innerHTML = eachEmpRow;
}

function saveEditEmp(id){
    var employees = JSON.parse(localStorage.getItem('employees'));
    
    for(let i=0;i<employees.length;i++){
        if(employees[i].id==id){
            employees[i].id=id;
            employees[i].emp_name = document.getElementById('edit_emp_name').value;
            employees[i].emp_email = document.getElementById('edit_emp_email').value;
            employees[i].emp_mobile = document.getElementById('edit_emp_mobile').value;
            employees[i].emp_address = document.getElementById('edit_emp_address').value;
        }
    }
    localStorage.setItem('employees', JSON.stringify(employees));
    showEmpData();
}

function cancelEditEmp(){
    showEmpData();
}

