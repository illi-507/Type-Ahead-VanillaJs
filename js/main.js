const search = document.getElementById('search');
const matchList = document.getElementById('match-list');
const button1 = document.getElementById('button1');
// Search states.json and filter it

const searchStates = async searchText =>{
       const res = await fetch('../data/state_capitals.json');
      // console.log(res);
       const states = await res.json();
       //console.log(states);

       //Get matches to current text input
       let matches = states.filter(state =>{
           const regex = new RegExp(`^${searchText}`, 'gi');
           return state.name.match(regex) || state.abbr.match(regex);
       });
       
       

       if(searchText.length === 0 ){
           matches = [];
           matchList.innerHTML='';
       }
       
    console.log("called--->");
       outputHtml(matches, searchText);
}



//Show results in HTML
const outputHtml = (matches, searchText) =>{
     if(matches.length > 0 ){
         const html = matches.map(match => 
          {    const part1 =  match.name.substring(0,searchText.length);
               const part2 = match.name.substring(searchText.length, match.name.length);
               console.log(part1, part2);               
               const highlightText = `<h4><span style="color: yellow">${part1}</span>${part2}</h4>`;
                
           return `<div class = "card card-body">
                 <h4>${highlightText} (${match.abbr})
                          <span class="text-primary">
                           ${match.capital}
                           </span>
                 </h4>
                 <small>Lat : ${match.lat} / Long: ${match.long}</small>
            </div>
            `
         })
            .join('');
        matchList.innerHTML = html;
     }
     else{
        matchList.innerHTML = '';
     }
  
}

function debounce(func, delay){         
        let currentTime  ;
        return function(...args){
            if(currentTime){
                clearTimeout(currentTime);
            }
            currentTime = setTimeout(()=>{func(...args)}, delay);
        }  
}



search.addEventListener('input',
    debounce( ()=>{searchStates(search.value)}, 200)
);


function  alertFunc(){
   console.log("Clicked.");
}

button1.addEventListener('click', debounce(e=>{
    alertFunc();
    }, 1000));



