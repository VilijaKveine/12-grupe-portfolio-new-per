"use strict";
// gallery

function renderGallery( target, data ) {
    let HTML = '';
    const targetDOM = document.querySelector(target);

    // target vietos validavimas
    if ( typeof(target) !== 'string' ) {
        return console.error('ERROR: vietos selectorius turi buti tekstinio tipo.');
    }
    if ( target.length === 0 ) {
        return console.error('ERROR: vietos selectorius negali buti tuscias tekstas.');
    }
    if ( targetDOM === null ) {
        return console.error('ERROR: pagal pateikta selectoriu norima vieta/elementas nerastas.');
    }

    // pradinis duomenu validavimas
    if ( !Array.isArray(data) ) {
        return console.error('ERROR: negaliu sugeneruoti "Gallery" sekcijos, del blogo formato duomenu.');
    }
    if ( data.length === 0 ) {
        return console.error('ERROR: negaliu sugeneruoti "Gallery" sekcijos, del tuscio saraso.');
    }

    // viska apjungiame i galutine galerija
    HTML = `<div class="gallery">
                <div class="gallery-filter">
                    ${ generateGalleryFilter( data ) }
                </div>
                <div class="gallery-list">
                    ${ generateGalleryList( data ) }
                </div>
            </div>`;
    
    targetDOM.innerHTML = HTML;

    // sudeti eventListener ant filtravimo elementu
    const filterItems = targetDOM.querySelectorAll('.filter-item');
    const galleryItems = targetDOM.querySelectorAll('.gallery-item');
    
    for ( let i=0; i<filterItems.length; i++ ) {
        // pridedam event listenerius
        filterItems[i].addEventListener('click', (event) => {
            // suzinome kas buvo paspaustas
            const findWhat = event.target.textContent;

            if ( findWhat === 'All categories' ) {
                // ieskome kuriuose gallery-item elementuose yra paminetas findWhat
                for ( let w=0; w<galleryItems.length; w++ ) {
                    const work = galleryItems[w];
                    work.classList.remove('hide');
                }
            } else {
                // ieskome kuriuose gallery-item elementuose yra paminetas findWhat
                for ( let w=0; w<galleryItems.length; w++ ) {
                    const work = galleryItems[w];
                    const categories = work.dataset.categories;
    
                    if ( categories.indexOf(findWhat) >= 0 ) {
                        work.classList.remove('hide');
                    } else {
                        work.classList.add('hide');
                    }
                }
            }
        })
    }

    return;
}

function generateGalleryFilter( data ) {
    let HTML = '<div class="filter-item active">All categories</div>';
    let list = [];
    let uniqueList = [];

    // surenkame visas kategorijas i viena sarasa
    for ( let i=0; i<data.length; i++ ) {
        const subList = data[i].category;

        // atrenkame ir paliekame tik unikalias kategorijas is surinkto saraso
        for ( let i=0; i<subList.length; i++ ) {
            const category = subList[i].toLowerCase();

            if ( uniqueList.indexOf(category) === -1 ) {
                uniqueList.push(category);
            }
        }
    }

    // for ( let i=0; i<data.length; i++ ) {
    //     list = list.concat(data[i].category);
    // }
    
    // uniqueList = list.filter( (cat, i) => list.indexOf(cat) === i );

    // sukonstruojame HTML
    for ( let i=0; i<uniqueList.length; i++ ) {
        HTML += `<div class="filter-item">${uniqueList[i]}</div>`;
    }
    
    return HTML;
}

function generateGalleryList( data ) {
    let HTML = '';

    for ( let i=0; i<data.length; i++ ) {
        const work = data[i];

        let catHTML = '';
        for ( let c=0; c<work.category.length; c++ ) {
            catHTML += `<span class="cat">${work.category[c]}</span>`;
        }
        
        HTML += `<div class="gallery-item"
                    data-categories="${(''+work.category).toLowerCase()}"
                    data-lightbox="img">
                    <img src="./img/portfolio/${work.img}">
                    <div class="texts">
                        <span class="title">${work.title}</span>
                        <div class="categories">
                            ${catHTML}
                        </div>
                    </div>
                </div>`;
    }

    return HTML;
}



//achievement

function renderAchievements( data ) {
    const maxBlocks = 4;
    let createdBlocks = 0;
    let HTML = '';

    if ( !Array.isArray(data) ) {
        return console.error('ERROR: negaliu sugeneruoti "Achievements" sekcijos, del blogo formato duomenu.');
    }
    if ( data.length === 0 ) {
        return console.error('ERROR: negaliu sugeneruoti "Achievements" sekcijos, del tuscio saraso.');
    }

    // sugeneruojame HTML
    for ( let i=0; i<data.length; i++ ) {
        if ( createdBlocks === maxBlocks ) {
            break;
        }
        const block = data[i];

        // tikrinu, ar tai objektas
        if ( typeof(block) !== 'object' ||
             block === null ||
             Array.isArray(block) ) {
            continue;
        }

        if ( (block.icon || (typeof(block.icon) === 'string' && block.icon.length > 0)) &&
             (block.number || block.number > 0) &&
             (block.title || (typeof(block.title) === 'string' && block.title.length > 0)) ) {
            HTML += `<div class="col-3 col-sm-6 col-xs-12 block">
                        <i class="fa fa-${block.icon}"></i>
                        <span>${block.number}</span>
                        <h4>${block.title}</h4>
                    </div>`;
            
            createdBlocks++;
        }
    }
    
    // istatome HTML i reikiama vieta
    if ( createdBlocks === 0 ) {
        document.querySelector('#achievements').remove();
    } else {
        document.querySelector('#achievements > .row').innerHTML = HTML;
    }

    return;
}

// Lightbox

function lightbox () {
    const elements = document.querySelectorAll('[data-lightbox]');
    
    elements.forEach( elem => {
        elem.addEventListener('click', updateLightbox) 
    })
}

function updateLightbox() {    
    const lightboxDOM = document.querySelector('.lightbox');
    console.log(lightboxDOM);  

    // Jei lightbox'o dar nera - sukuriame
    
    if ( !lightboxDOM) {
        const HTML = `
            <div class="lightbox">
                <div class="background"></div>
                <div class="content">
                    <img src="#">
                    <i class="fa fa-times"></i>
                </div>
            </div>`;
            document.querySelector('body')
                .insertAdjacentHTML('beforeend', HTML);
    }
}