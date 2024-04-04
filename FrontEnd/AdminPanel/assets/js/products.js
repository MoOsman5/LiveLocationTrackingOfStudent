let SourceImage = document.getElementById('SourceImage');
let ProductName = document.getElementById('ProductName');
let Price = document.getElementById('Price');
let Discount = document.getElementById('Discount');
let ProductCode = document.getElementById('ProductCode');
let Category = document.getElementById('Category');
let total = document.getElementById('total');
let submit = document.getElementById('submit');

let mode ='create';
let temp;

function getTotal(){
    if(Price.value !=''){
        let result=+Price.value - +Discount.value;
        total.innerHTML=result;
    }
}

let dataPro=[];

    if(localStorage.product != null){
        dataPro=JSON.parse(localStorage.product)
    }


showData()
submit.onclick=function(){
    let newPro = {
        SourceImage:SourceImage.value,
        ProductName:ProductName.value.toLowerCase(),
        ProductCode:ProductCode.value,
        Category:Category.value.toLowerCase(),
        Price:Price.value,
        Discount:Discount.value,
        total:total.innerHTML
    }
    if(mode =='create'){
        if(SourceImage.value != '' &&  ProductName .value!= '' && ProductCode.value !='' && Category.value !='' && Price.value !=''){
        dataPro.push(newPro)
   }
}
else{
    dataPro[temp]=newPro;
    mode ='create';
    submit.innerHTML='Add Product';
    scroll({
        top:0,
        behavior:"smooth"
    })
   }
   localStorage.setItem('product' , JSON.stringify(dataPro) )
   showData()
   clearData()
}

function clearData(){
    SourceImage.value='';
    ProductName.value='';
    ProductCode.value='';
    Category.value='';
    Price.value='';
    Discount.value='';
    total.innerHTML='';
}

function showData(){
    let table='';
    for(let i=0; i<dataPro.length; i++){
        table += `
        <tr>
        <th>${i+1}</th>
        <th>${dataPro[i].SourceImage}</th>
        <th>${dataPro[i].ProductName}</th>
        <th>${dataPro[i].ProductCode}</th>
        <th>${dataPro[i].Category}</th>
        <th>${dataPro[i].Price}</th>
        <th>${dataPro[i].Discount}</th>
        <th>${dataPro[i].total}</th>
        <th><button onclick="updateData(${i})" id="update">Update</button></th>
        <th><button onclick="deleteData(${i})"  id="delete">Delete</button></th>
    </tr>
        `;
        getTotal()
    }
    document.getElementById('tbody').innerHTML=table;
    let btnDelete=document.getElementById('deleteAll');
    if(dataPro.length > 0){
        btnDelete.innerHTML = `<button onclick="deleteAll()">Delete All</button>`
    }
    else{
        btnDelete.innerHTML='';
    }
}

 function updateData(i){
    SourceImage.value=dataPro[i].SourceImage;
    ProductName.value=dataPro[i].ProductName;
    ProductCode.value=dataPro[i].ProductCode;
    Category.value=dataPro[i].Category;
    Price.value=dataPro[i].Price;
    Discount.value=dataPro[i].Discount;
    getTotal()
    submit.innerHTML='Update';
    mode ='update';
    temp=i;
 }
function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product=JSON.stringify(dataPro)
    showData()
}
function deleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    showData()
}

let searchMood='ProductName';

function getSearchMood(id){
    if(id=='searchName'){
        searchMood = 'ProductName';
        search.placeholder='Search By Product Name'
    }
    else{
        searchMood = 'Category';
        search.placeholder='Search By Product Category'
    }
    search.focus()
    search.value='';
    showData()
}

function searchData(value){
    let table='';
    for(let i=0; i<dataPro.length;i++){
    
        if(searchMood == 'ProductName'){
      
            if(dataPro[i].ProductName.includes(value.toLowerCase())){
                table += `
                <tr>
                <th>${i+1}</th>
                <th>${dataPro[i].SourceImage}</th>
                <th>${dataPro[i].ProductName}</th>
                <th>${dataPro[i].ProductCode}</th>
                <th>${dataPro[i].Category}</th>
                <th>${dataPro[i].Price}</th>
                <th>${dataPro[i].Discount}</th>
                <th>${dataPro[i].total}</th>
                <th><button onclick="updateData(${i})" id="update">Update</button></th>
                <th><button onclick="deleteData(${i})"  id="delete">Delete</button></th>
            </tr>
                `; 
            }
            console.log(dataPro[i].ProductName.includes(value))
        }
    else{
            if(dataPro[i].Category.includes(value.toLowerCase())){
                table += `
                <tr>
                <th>${i+1}</th>
                <th>${dataPro[i].SourceImage}</th>
                <th>${dataPro[i].ProductName}</th>
                <th>${dataPro[i].ProductCode}</th>
                <th>${dataPro[i].Category}</th>
                <th>${dataPro[i].Price}</th>
                <th>${dataPro[i].Discount}</th>
                <th>${dataPro[i].total}</th>
                <th><button onclick="updateData(${i})" id="update">Update</button></th>
                <th><button onclick="deleteData(${i})"  id="delete">Delete</button></th>
            </tr>
                `; 
            }
        }
    }
    document.getElementById('tbody').innerHTML=table;
}


