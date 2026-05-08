const inputlists = document.getElementById("inputlists")
const displaypage = document.getElementById("displaypage")
const appendPages = document.querySelectorAll("section")
const AllSec = document.getElementById("displaypage");
let userText = []
let headSection = document.getElementById("headSection")
var i = 0;
//-----Describing Inputs and Comments for Resume Page----
const personalDetails = [{
        title: "Personal Details Form"
    },{
    type: "text",
    isinput: true,
    inputs:[{
        fieldName:"Full Name",
        type:"text"
    },{
        fieldName:"Email",
        type:"email"
    },{
        fieldName:"Phone Number",
        type:"number"
    }]
},{
    isComment:true,
    inputs:[{
        fieldName:"Address",
    },{
        fieldName:"Profile Summary",
    }]
}]
const educationDetails = [{
    title:" Education Details Form "
},{
    isinput:true,
    inputs:[{
        fieldName:"Degree",
        type:"text"
    },{
        fieldName:"College/University",
        type:"text"
    },{
        fieldName:"Year",
        type:"number"
    },{
        fieldName:"Percentage/CGPA",
        type:"number"
    }]
}];
const experienceDetails = [{
    title:" Experience Details Form "
},{
    isinput:true,
    inputs:[{
        fieldName:"Company Name",
        type:"text"
    },{
        fieldName:"Role",
        type:"text"
    },{
        fieldName:"Duration",
        type:"text"
    }]
},{
    isComment:true,
    inputs:[{ fieldName:"Description"}]
}];
const Skills = [{
    title:" Skills Form "
},{
    isinput:true,
    inputs:[{
        fieldName:"your Skills",
        type:"input"
    }]
}];
const Projects = [{
    title:" Projects Form "
},{
    isinput: true,
    inputs:[{
        fieldName:"Project Title",
        type:"text"
    },{
        fieldName:"Technologies used",
        type:"text"
    }]
},{
    isComment:true,
    inputs:[{fieldName:"Description" }]
}];
const resumePage = [personalDetails,educationDetails,experienceDetails,Skills,Projects];

function inputSystem(type,Name,id,Index){
const input = document.createElement("input")
const label = document.createElement("label") 
const box = document.createElement("span")
label.innerText = Name

input.setAttribute("type",type)
input.setAttribute("id", Name.replace(/\s/g, '-').toLowerCase())

input.placeholder = Name

label.setAttribute("for","in"+id)
box.appendChild(label)
box.appendChild(input)
inputlists.appendChild(box)

}
function displaytext(data){

}
document.getElementById("prev").addEventListener('click',()=>{
    if(i<=0){
        alert("Cannot Go!")
    }else{
        i--;
    }
let values = document.querySelectorAll("input")
userText.forEach((input)=>{
//    let newVal = values.find(val => val.id === input.at.replace(/\s/g).toLowerCase())
// console.log(newVal)
})

        loadPage(i);
})
document.getElementById("next").addEventListener('click',(e)=>{
    e.preventDefault();
    if( i < resumePage.length - 1 ) {
    i++; 
    loadPage(i);
}else{
    alert("Form is completed!!");
    loadPage(0)
    i = 1;

}
})

function checkFilled(){
    const allInp = inputlists.querySelectorAll("input, textarea");
    let filled_ = true;
// console.log()
    allInp.forEach(ins => {
        if (ins.value.trim() === "") {
            filled_ = false;
        } 
    });
    if (!filled_) {
        alert("Fill them 👜");
        return; 
    }

appendPages[i].innerHTML = "";
allInp.forEach((ins) => {
const labelName = ins.placeholder;
let valueToPass = ins.value;

    addElements(valueToPass, labelName, i);
});

if( i < resumePage.length - 1 ) {
    i++; 
    loadPage(i);
}else{
    alert("Form is completed!!");
    loadPage(0)
    i = 1;

}
}

document.getElementById("ok").addEventListener('click', (e) => {
    e.preventDefault(); 
    checkFilled()
});

loadPage(0)

function loadPage(index) {
    inputlists.innerHTML = ""; 
    const currentSection = resumePage[index];
    currentSection.forEach(item => {
        if (item.title) {
            headSection.innerText = item.title;
        }
        if (item.isinput) {
            item.inputs.forEach(ele => {
            inputSystem(ele.type, ele.fieldName,index);   
            });
        }
if (item.isComment) {
    item.inputs.forEach(ele => {
    const area = document.createElement("textarea");
    area.placeholder = ele.fieldName;
    area.setAttribute("id", ele.fieldName.replace(/\s/g, '-').toLowerCase())
    inputlists.appendChild(area);
    area.addEventListener('keypress',(keyCatch)=>{
    if(keyCatch.key == "Enter"){

    let newCatch = area.value.trim()
    if(newCatch != ""){
    addElements(area.value,ele.fieldName,index)
    // area.value = ""
    area.defaultValue = area.value
    }
}
                })
         });
        }
    });
}

//---------DisplayPage in Resume-------
function addElements(textFromUser, Name, INDEX) {
    let isHere = userText.findIndex(val => val.at === Name);
    let elementId = Name.replace(/\s/g, '');

    if (isHere !== -1) {
        userText[isHere].value = textFromUser;
        let existingRow = document.getElementById(elementId);
        if (existingRow) {
            existingRow.innerHTML = `<strong>${Name}</strong> ${textFromUser}`;
        }
    } else {
        userText.push({ at: Name, value: textFromUser });
        let row = document.createElement("div");
        row.className = "resume-item";
        row.id = elementId;
        row.innerHTML = `<strong>${Name}</strong> ${textFromUser}`;
        appendPages[INDEX].appendChild(row);
    }
}



