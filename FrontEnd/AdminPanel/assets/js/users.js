let UserName = document.getElementsByClassName('UserName');
let Email = document.getElementsByClassName('Email');
let Password = document.getElementsByClassName('Password');
let PhoneNumber = document.getElementsByClassName('PhoneNumber');
 let submitbtn = document.getElementsByClassName('submitbtn');

console.log(UserName,Email,Password,PhoneNumber,submitbtn)

let mode ='create';
let dataUser=[];

    if(localStorage.user != null){
        dataUser=JSON.parse(localStorage.user)
    }

   // showData()
submitbtn.onclick=function(){
    let newUser = {
        UserName:UserName.value.toLowerCase(),
        Email:Email.value,
        Password:Password.value,
        PhoneNumber:PhoneNumber.value
    }
        if(UserName.value != '' &&  Email.value!= '' && Password.value !=''){
        dataUser.push(newUser)
    }
   
}

function showData(){
    let table='';
    for(let i=0; i<dataUser.length; i++){
        table += `
        <tr>
        <th>${i+1}</th>
        <th>${dataUser[i].UserName}</th>
        <th>${dataUser[i].Email}</th>
        <th>${dataUser[i].Password}</th>
        <th>${dataUser[i].PhoneNumber}</th>
        <th><button onclick="updateData(${i})" id="update">Update</button></th>
        <th><button onclick="deleteData(${i})"  id="delete">Delete</button></th>
    </tr>
        `;
    }
    document.getElementById('tbody').innerHTML=table;
}

function deleteData(i){
    dataUser.splice(i,1);
    localStorage.user=JSON.stringify(dataUser)
    showData()
}


function searchData(value){
    let table='';
    for(let i=0; i<dataUser.length;i++){
      
            if(dataUser[i].UserName.includes(value.toLowerCase())){
               table += `
        <tr>
        <th>${i+1}</th>
        <th>${dataUser[i].UserName}</th>
        <th>${dataUser[i].Email}</th>
        <th>${dataUser[i].Password}</th>
        <th>${dataUser[i].PhoneNumber}</th>
        <th><button onclick="updateData(${i})" id="update">Update</button></th>
        <th><button onclick="deleteData(${i})"  id="delete">Delete</button></th>
    </tr>
        `;
        }
    }
    document.getElementById('tbody').innerHTML=table;
}
