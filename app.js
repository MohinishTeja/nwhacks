console.log("Connected");  
  
  var firebaseConfig = {
    apiKey: "AIzaSyB9h_zSWNsHQg1A7WRmx3cQADcVTJz3lyg",
    authDomain: "project-j-38ca8.firebaseapp.com",
    databaseURL: "https://project-j-38ca8-default-rtdb.firebaseio.com",
    projectId: "project-j-38ca8",
    storageBucket: "project-j-38ca8.appspot.com",
    messagingSenderId: "43143293522",
    appId: "1:43143293522:web:c32422e43859fe9e900d8b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);




// Lets read data

var title_je,category_je,note_je,amount_je,time_je;

var title_ji,category_ji,note_ji,amount_ji,time_ji;

function ready(){
    title_je=document.getElementById("titlebox_e").value;
    category_je=document.getElementById("category_e").value;
    note_je=document.getElementById("note_e").value;
    amount_je=document.getElementById("amount_e").value;
    time_je=new Date().toLocaleString();
} 



function ready_i(){
  title_ji=document.getElementById("titlebox_i").value;
  category_ji=document.getElementById("category_i").value;
  note_ji=document.getElementById("note_i").value;
  amount_ji=document.getElementById("amount_i").value;
  time_ji=new Date().toLocaleString();
} 


//Lets submit data

document.getElementById("insert").onclick=function(){

    ready();
    firebase.database().ref("expenditure/"+Math.random().toString(36).substr(2, 9)).set({

        Entry: title_je,
        Category:category_je,
        Note:note_je,
        Amount:amount_je,
        Time:time_je


    });
}



document.getElementById("insert_1").onclick=function(){

  ready_i();
  firebase.database().ref("income/"+ Math.random().toString(36).substr(2, 9)).set({

      Entry: title_ji,
      Category:category_ji,
      Note:note_ji,
      Amount:amount_ji,
      Time:time_ji


  });
}



// Retrieve Expenditure Data
  
  let reference = firebase.database().ref("expenditure");
  reference.on("value",gotData);




function gotData(data){
  let expens = data.val();
  let keys = Object.keys(expens);
console.log(keys.length);
  for( let i=0;i<keys.length;i++){

    let a =keys[i];

    let title_a = expens[a].Entry;
    let category_a=expens[a].Category;
    let note_a=expens[a].Note;
    let amount_a=expens[a].Amount;
    let time_a=expens[a].Time;


    console.log(title_a,category_a,note_a,amount_a,time_a);
  

    let expense=document.querySelector(".expen");

    expense.innerHTML+= `
    
      <article class="card">
      <header class="card-header">

      <p> ${time_a}</p>
      <p>${title_a} </p>
      </header>

      </article>
    
    
    `
  
  }

}



function changeTab(ref){
  try {
  if(ref.getAttribute("data-tab") == "Income"){
    document.getElementById("form-body").classList.remove('active');
    ref.parentNode.classList.remove('Expenditure');
  } else {
    document.getElementById("form-body").classList.add('active');
    ref.parentNode.classList.add('Expenditure');
  }
  } catch(msg){
    console.log(msg);
  }
}