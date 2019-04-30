const btnName = document.querySelector(".btn-sort-name");
const btnCapital = document.querySelector(".btn-sort-capital");
const btnPopulation = document.querySelector(".btn-sort-population");
const textSubmit = document.querySelector(".text-submit");
const buttons = document.querySelectorAll('.button');
let searchText = '';
let isNameAZ = true;
let isCapitalAZ = false;
let isPopulationDescending = false;


function showCountries(arr) {
    document.querySelector('.box-container').innerHTML = '';
    arr.forEach(function(country, index) {
    let box = document.createElement('div');
    box.className = "box";
    box.innerHTML = createContent(country);
    document.querySelector('.box-container').appendChild(box);
})
};
showCountries(countriesObject);

function createContent(arr) {
    const {name, capital, languages, population, flag, currency} = arr;
    return `<p>${name}</p>
    <img src="${flag}" />
    <p>${capital}</p>
    <p>${languages.join(', ')}</p>
    <p>${population.toLocaleString()}</p>`;
}

function filterCountries(arr, searchText) {
    const filteredCountries = arr.filter(country => {
        let {name, capital, languages} = country;
        let isName = name.toLowerCase().includes(searchText);
        let isCapital = capital.toLowerCase().includes(searchText);
        let isLanguages = languages.join().toLowerCase().includes(searchText);
        return isName || isCapital || isLanguages;
    });
        if (searchText == '') {
            result = arr;
        } else {
            result = filteredCountries;
        }
        return result; 
        }
    
textSubmit.addEventListener('input', e => {
    searchText = e.target.value.toLowerCase();
    showCountries(filterCountries(countriesObject, searchText));
})

document.addEventListener ('click', e => {
    if (e.target == btnName) showCountries(sortByName(filterCountries(countriesObject,searchText)));
    if (e.target == btnCapital) showCountries(sortByCapital(filterCountries(countriesObject, searchText)));
    if (e.target == btnPopulation) showCountries(sortByPopulation(filterCountries(countriesObject, searchText)));
},false);

function sortByName(arr) {
    btnCapital.classList.remove('selected');
    btnName.classList.add('selected');
    btnPopulation.classList.remove('selected');
    if (isNameAZ) {
        btnName.innerHTML = 'Sort by name<i class="fas fa-sort-alpha-up"></i>';
        isNameAZ = false;
        return arr.sort().reverse();
    } else {
        btnName.innerHTML = 'Sort by name<i class="fas fa-sort-alpha-down"></i>';
        isNameAZ = true;
        return arr.sort();
    }
}

function sortByCapital(arr) {
    btnCapital.classList.add('selected');
    btnName.classList.remove('selected');
    btnPopulation.classList.remove('selected');
const copyCountriesObject = [...arr];
const sortByCapital = copyCountriesObject.sort(function(a, b) {
    if (a.capital > b.capital) {
    return 1;
    }
    if (a.capital < b.capital) {
    return -1;
    }
    return 0;
});
if (isCapitalAZ) {
    isCapitalAZ = false;
    btnCapital.innerHTML = 'Sort by capital<i class="fas fa-sort-alpha-down"></i>';
return sortByCapital;
} else {
    isCapitalAZ = true;
    btnCapital.innerHTML = 'Sort by capital<i class="fas fa-sort-alpha-up"></i>';
    return sortByCapital.reverse();
}
}

function sortByPopulation(arr) {
    btnCapital.classList.remove('selected');
    btnName.classList.remove('selected');
    btnPopulation.classList.add('selected');
    const copyCountriesObject = [...arr];
    const sortByPopulation = copyCountriesObject.sort(function(a, b) {
    if (a.population > b.population) {
        return 1;
    }
    if (a.population < b.population) {
        return -1;
    }
        return 0;
    });
    if (isPopulationDescending) {
        isPopulationDescending = false;
        btnPopulation.innerHTML = 'Sort by population <i class="fas fa-sort-amount-up"></i>';
    return sortByPopulation;
    } else {
        isPopulationDescending = true;
        btnPopulation.innerHTML = 'Sort by population <i class="fas fa-sort-amount-down"></i>';
        return sortByPopulation.reverse();
    }
}   

function getHighestPopulation(arr) {
    const copyCountriesObject = [...arr];
    const sortByPopulation = copyCountriesObject.sort(function(a, b) {
    if (a.population > b.population) {
        return -1;
    }
    if (a.population < b.population) {
        return 1;
    }
    
})
return sortByPopulation.slice(0,10);
}
getHighestPopulation(countriesObject);

function drawPopulationGraph(arr) {
    let graphBox = document.createElement('div');
    graphBox.className = 'graph-box';
    document.body.appendChild(graphBox);
    let heading = document.createElement('h2');
    heading.innerHTML = "Top 10 Most Populated Countries in the World";
    heading.className = 'heading';
    graphBox.appendChild(heading);
    arr.forEach(function (country) {
    let width = country.population / arr[0].population * 100;
    console.log(width);
    let graph = document.createElement('div');
    graph.className = 'graph';
    graph.style.width = width + '%';
    if (country.population >= 1000000000) {
    graph.innerHTML = country.name + " - " + country.population.toString().slice(0, 1) + "," + country.population.toString().slice(1, 3) + "B";
    } else {
        graph.innerHTML = country.name + " - " + country.population.toString().slice(0, 3) + "M";
    }
    graphBox.appendChild(graph);
    })
}
drawPopulationGraph(getHighestPopulation(countriesObject));

function findMostSpokenLanguages(arr) {
    let allLanguages = [];
    arr.forEach(function (country) {
        country.languages.forEach( function (language) {
            allLanguages.push(language);
        })
    })
    console.log(allLanguages);

    let counter = [];
    allLanguages.forEach(function(i) {
        counter[i] = (counter[i] || 0) + 1;
    });
    console.log(counter);
    console.log(counter.length);
    

    // console.log( Object.values(counter));
    console.log(Object.keys(counter));


    const makeObject= (i) => {
        log('=>', i)
        return { lang: i }
    }

    const loop = (arr) => {
        return arr.map((i) => makeObject(i))
    }

    
}

 
 
 
function sumTopLanguages(listCountries) {
    const mapTop = new Map();

        listCountries.forEach(country => {
            country.languages.forEach(language => {
                if (mapTop.has(language)) {
                    mapTop.set(language, mapTop.get(language) + 1);
                } else {
                    mapTop.set(language, 1);
            }
            });
        });
        return Array.from(mapTop);
    }


function sortLanguages(arr) {
arr.sort(function (a,b) {
return a[1] - b[1];
}
 )
 return arr.reverse();
 };
 
 drawLanguagesGraph(sortLanguages(sumTopLanguages(countriesObject)));
 
 
 function drawLanguagesGraph(arr) {
    arr = arr.slice(0, 10);
    let graphBoxContainer = document.createElement('div');
    let graphBox = document.createElement('div');
    graphBox.className = 'graph-box-lang';
    graphBoxContainer.className = 'graph-box-container';
    document.body.appendChild(graphBoxContainer);
    let heading = document.createElement('h2');
    heading.innerHTML = "Top 10 Most Spoken Languages in the World";
    heading.className = 'heading';
    graphBoxContainer.appendChild(heading);
    graphBoxContainer.appendChild(graphBox);
    arr.forEach(function (languages) {
    let height = languages[1];
    let graphLangContainer = document.createElement('div');
    graphLangContainer.className = 'graph-lang-container';
    graphBox.appendChild(graphLangContainer);
    let graph = document.createElement('div');
    graph.className = 'graph-lang';
    graph.style.height = height + '%';
    graphLangContainer.textContent = languages[0] + ' - ' + languages[1];
    graphLangContainer.appendChild(graph);
    });
}


const url = 'https://restcountries.eu/rest/v2/all';
fetch(url)
.then(response => response.json())
.then(data => {
    console.log(data);
})
.catch(error => console.log(error));



// Sorting function

// const sortItem = (arr, type) => {
//     const copiedItem = [...arr];
//     const sortedItem = copiedItem.sort((a,b) => {
//         if (a.type > b.type) return 1;
//         if (a.type < b.type) return -1;
//         return 0;
//     })
// }



