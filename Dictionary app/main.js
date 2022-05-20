let input=document.querySelector('#input');
let searchBtn=document.querySelector('#search');
let apikey='254894a5-2725-439f-8172-b26ac9e1764a';
let notFound=document.querySelector('.not__found');
let defBox=document.querySelector('.def');
let audioBox=document.querySelector('.audio');
let loading=document.querySelector('.loading');


// preventDefault uses =>
// when we want checkbox not selected by user,then we use!
// Clicking on a "Submit" button, prevent it from submitting a form
// Clicking on a link, prevent the link from following the URL

searchBtn.addEventListener('click',function(e){
    e.preventDefault();

    //clear data 
    audioBox.innerHTML='';
    notFound.innerHTML='';
    defBox.innerHTML=''; 


    //get input data 
    let word=input.value;
    //call API get data
    if(word===''){
        alert('Word is required!');
        return;

    }
    getData(word);
})

async function getData(word){
    loading.style.display = 'block';
    //Ajax call
    const response=await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apikey}`);
//.json=>It is commonly used for transmitting data in web applications (e.g., sending some data from the server to the client, so it can be displayed on a web page, or vice versa).
 
    const data=await response.json();
   

    //if Empty result
    if(!data.length){
        notFound.innerText='No result found';
        return;
    }

    if(typeof data[0]==='string'){
        loading.style.display = 'none';
        let heading=document.createElement('h3');
        heading.innerText='Did you mean?'
        notFound.appendChild(heading);
        data.forEach(element =>{
            let suggestion=document.createElement('span');
            //this concept come from "HTML DOMTokenList" 
            suggestion.classList.add('suggested');
            suggestion.innerText=element;
            notFound.appendChild(suggestion);
        })
        return;
    } 

    //Result found
    loading.style.display = 'none';
    let defination=data[0].shortdef[0];
    defBox.innerHTML=defination;

    //sound
    const soundname=data[0].hwi.prs[0].sound.audio;
    if(soundname){
        renderSound(soundname);
    }
    console.log(data);
}

function renderSound(soundname){
    let subfolder=soundname.charAt(0);
    let soundSrc=`https://media.merriam-webster.com/soundc11/${subfolder}/${soundname}.wav?key=${apikey}`;
    let aud=document.createElement('audio');
    aud.src=soundSrc;
    aud.controls=true;
    audioBox.appendChild(aud);

}


