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




    let reference = firebase.database().ref("expenditure");
    let reference1=firebase.database().ref("income");
    reference.on("value",gotData);
    reference1.on("value",gotData1);
/*
    reference.on("value",amount);
    reference1.on("value",amount1);
*/



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
    
    function getImageByCategory(category_a) {
        if (category_a == 'Shopping') {
          return '<img id="x" src="img/online-shopping.png" />';
        } else if (category_a == 'Food') {
          return '<img id="x" src="img/diet.png" />'
        } else if (category_a == 'Learn') {
          return '<img id="x" src="img/knowledge.png" />'
        } else if (category_a == 'Others') {
            return '<img id="x" src="img/layers.png" />'
        } else if (category_a == 'Bills') {
            return '<img id="x" src="img/bill.png" />'
        } else if (category_a == 'Health') {
            return '<img id="x" src="img/heart.png" />'
        } else if (category_a == 'Transport') {
            return '<img id="x" src="img/travel.png" />'
        }
      }
      

    let expense=document.querySelector(".card-list");
    
    expense.innerHTML+= `

        <article class="card">
        <header class="card-header">

        <p> ${time_a}</p>
        <h2>${title_a} </h2>
        </header>

        <p class="am"> ${amount_a}</p>
        <div class="card-author">
            <a class="author-avatar" href="#">
            ${getImageByCategory(category_a)}
            </a>

            <svg class="half-circle" viewBox="0 0 106 57">
                <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
            </svg>

            <div class="author-name">
                <div class="author-name-prefix">Type</div>
                ${category_a}
            </div>

        
        </article>
        
    `
    }
    
//document.getElementById("po").innerHTML=q;
    
}



function gotData1(data){
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

    function getImageByCategory(category_a){
    if (category_a == 'Gift') {
        return '<img id="x" src="img/open-box.png" />';
      } else if (category_a == 'Prize') {
        return '<img id="x" src="img/cheque.png" />'
      }else if(category_a=="Stipend"){
          return '<img id="x" src="img/cash.png"/>'
      }
    }
    let expense=document.querySelector(".card-list_1");
        
    expense.innerHTML+= `

        <article class="card">
        <header class="card-header">

        <p> ${time_a}</p>
        <h2>${title_a} </h2>
        </header>

        <p class="am1"> ${amount_a}</p>
        <div class="card-author">
            <a class="author-avatar" href="#">
            
            ${getImageByCategory(category_a)}
            </a>

            <svg class="half-circle" viewBox="0 0 106 57">
                <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
            </svg>

            <div class="author-name">
                <div class="author-name-prefix">Type</div>
                ${category_a}
            </div>

        
        </article>
        
    `
    }
    
}


var income=0;

var expenditures=0;


reference.on("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        expenditures += parseInt(childSnapshot.val().Amount);
    })
    
console.log(expenditures);
});

reference1.on("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        income += parseInt(childSnapshot.val().Amount);
    })
    
var endPercent =((income-expenditures)/income);
console.log(income);
console.log(expenditures);
document.getElementById("po").innerHTML=income;
document.getElementById("po1").innerHTML=expenditures;
document.getElementById("po2").innerHTML=income-expenditures;

var colors = {
    'green': '#47e495',
    'pink': '#FA1212',
    'red':'#FA3912'
};

var radius = 100;
var border = 5;
var padding = 30;
var startPercent = 0;

var endPercent=((income-expenditures)/expenditures);
var endPercent=1;


if(endPercent>0.75){
    var color=colors.pink;
}else if(endPercent<0.75 && endPercent>0.50){
    var color=colors.red;
}else{
    var color=colors.green;
}

var twoPi = Math.PI * 2;
var formatPercent = d3.format('.0%');
var boxSize = (radius + padding) * 2;


var count = Math.abs((endPercent - startPercent) / 0.01);
var step = endPercent < startPercent ? -0.01 : 0.01;

var arc = d3.svg.arc()
    .startAngle(0)
    .innerRadius(radius)
    .outerRadius(radius - border);

var parent = d3.select('div#content');

var svg = parent.append('svg')
    .attr('width', boxSize)
    .attr('height', boxSize);

var defs = svg.append('defs');

var filter = defs.append('filter')
    .attr('id', 'blur');

filter.append('feGaussianBlur')
    .attr('in', 'SourceGraphic')
    .attr('stdDeviation', '7');

var g = svg.append('g')
    .attr('transform', 'translate(' + boxSize / 2 + ',' + boxSize / 2 + ')');

var meter = g.append('g')
    .attr('class', 'progress-meter');

meter.append('path')
    .attr('class', 'background')
    .attr('fill', '#ccc')
    .attr('fill-opacity', 0.5)
    .attr('d', arc.endAngle(twoPi));

var foreground = meter.append('path')
    .attr('class', 'foreground')
    .attr('fill', color)
    .attr('fill-opacity', 1)
    .attr('stroke', color)
    .attr('stroke-width', 5)
    .attr('stroke-opacity', 1)
    .attr('filter', 'url(#blur)');

var front = meter.append('path')
    .attr('class', 'foreground')
    .attr('fill', color)
    .attr('fill-opacity', 1);

var numberText = meter.append('text')
    .attr('fill', '#fff')
    .attr('text-anchor', 'middle')
    .attr('dy', '.35em');

function updateProgress(progress) {
    foreground.attr('d', arc.endAngle(twoPi * progress));
    front.attr('d', arc.endAngle(twoPi * progress));
    numberText.text(formatPercent(progress));
}

var progress = startPercent;

(function loops() {
    updateProgress(progress);

    if (count > 0) {
        count--;
        progress += step;
        setTimeout(loops, 10);
    }
})();
});
