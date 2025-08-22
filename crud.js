let submitButton = document.querySelector("#bt");
let resetButton=document.getElementById("reset");
let updateButton=document.getElementById("updat");
let skillDropdown = document.getElementById("Skill");
let msg= document.querySelector(".msg");
let data = document.querySelector("#b1");
let firstName = document.querySelector("#FS");
let lastName = document.querySelector("#LS");
let email = document.querySelector("#EM");
let i = 0;
let previousSkill = skillDropdown.value;
let hiddenRowId=document.querySelector("#rowId");



submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    const fName=firstName.value.trim();
    const lName=lastName.value.trim();
    const em=email.value.trim();
    const drop=skillDropdown.value;
    const rdbut= document.querySelector('input[name="gender"]:checked');
 
  if( Validation(fName, lName, em,rdbut))
  {
   const gender=rdbut.value;
   
    
    if(saveTable(fName, lName, em,gender,drop))
    {
      msg.innerHTML=`<h4 >${"Student Registration Succesfully"}</h4>`;
      clearForm();
    }
  }  
    
});


const saveTable = (fName, lName, em, gend,drop) => {
    
        i++;
        const row=document.createElement("tr");
         row.setAttribute("data-id", i);
        row.innerHTML = `
        <td>${i}</td>
        <td>${fName}</td>
        <td>${lName}</td>
        <td>${em}</td>
        <td>${gend}</td>
        <td>${drop}</td>
        <td><button class="edit-btn"  >EDIT</button> <button class="del-btn">DELETE</button></td> `;
        data.append(row);
         return true;
};

resetButton.addEventListener( "click" , () =>
{
    clearForm();
    hiddenRowId.value="";
    updateButton.style.display="none";
    submitButton.style.display="inline-block";
});



//To handel dynamiacally created buttons we have to handle by using event delegation to its parent by using e.target
//for event delegation we have to give both button class
//1st way
 data.addEventListener( "click", (e) => 
 {
   const btn=e.target;
    if(btn.classList.contains("edit-btn"))
    {
      console.log("hello1");
      const row=btn.closest("tr");
      const rowId=row.dataset.id;
      const cell=row.querySelectorAll("td");

      firstName.value=cell[1].textContent;
      lastName.value=cell[2].textContent;
      email.value=cell[3].textContent;
      skillDropdown.value=cell[5].textContent;

      const genderVal=cell[4].textContent.toLowerCase();
      
      document.querySelectorAll('input[name="gender"]').forEach(rb =>
      {
         rb.checked = rb.value.toLowerCase() === genderVal;
      }
      );
      msg.style.display="none";
      hiddenRowId.value=rowId;
      updateButton.style.display="inline-block";
      submitButton.style.display="none";
    }
   else if(btn.classList.contains("del-btn"))
    {
      const row=btn.closest("tr");
      if(row.dataset.id === hiddenRowId.value)
      {
         hiddenRowId.value="";
         updateButton.style.display="none";
         submitButton.style.display="inline-block";
      }
      row.remove();
      msg.innerHTML = `<h4>Student Deleted Successfully</h4>`;
   }
   
 });

 updateButton.addEventListener("click" , () =>
{
console.log("hello");
 const rowId=hiddenRowId.value;
   if(!rowId) return;

 const row=document.querySelector(`tr[data-id="${rowId}"] `);
 const cell=row.querySelectorAll("td");

 const fName=firstName.value.trim();
 const lName=lastName.value.trim();
 const em=email.value.trim();
 const drop=skillDropdown.value;
 const rdbut=document.querySelector('input[name="gender"]:checked');

 if(Validation(fName,lName,em,rdbut))
 {
   const gender=rdbut.value;
   cell[1].textContent=fName;
   cell[2].textContent=lName;
   cell[3].textContent=em;
   cell[4].textContent=gender;
   cell[5].textContent = drop;
   msg.style.display="block";
   msg.innerHTML = `<h4>Student Updated Successfully</h4>`;
   clearForm();
   hiddenRowId.value="";
   updateButton.style.display="none";
   submitButton.style.display="inline-block";
   
 }
});

function clearForm()
{
   firstName.value="";
      lastName.value="";
      email.value="";
      //UNCHECKED RADIO BUTTON
    const genderRadios = document.querySelectorAll('input[name="gender"]');
      if (genderRadios.length > 0) {
       genderRadios.forEach(rb => rb.checked = false);
      }

   

      //Reset Dropdown value to previous one
      skillDropdown.value = previousSkill;
}

const Validation = (firstName, lastName, email,rdbut) =>
{
   if(firstName === "")
   {
      msg.innerHTML=`<h4 >${"Please Enter FirstName"}</h4>`;
      return false;
   }
   else if(lastName === "")
   {
      msg.innerHTML=`<h4 >${"Please Enter LastName"}</h4>`;
      return false;
   }
   else if(email === "")
   {
      msg.innerHTML=`<h4 >${"Please Enter Email"}</h4>`;
      return false;
   }
   else if(!rdbut )
   {
      msg.innerHTML=`<h4 >${"Please Select Gender"}</h4>`;
      return false;
   }

   msg.innerHTML="";
   return true;
}