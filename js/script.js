"use strict"

// scroll function
const scrollLinks = (e) => {
	const header = document.querySelector('.header'),
			searchBlock = document.querySelector(`.${e.target.dataset.goto}`),
			positionBlock = searchBlock.getBoundingClientRect().top + window.scrollY - header.offsetHeight
		
	window.scrollTo({
		top: positionBlock,
		behavior: 'smooth'
	})

	e.preventDefault()
}



// observer links
let sectionItems = document.querySelectorAll('.main>*')

if (sectionItems) {
	const observerActiveSection = (e) => {
		e.forEach(event => {
			if (event.isIntersecting) {
				document.querySelectorAll('[data-goto]').forEach(dataLink => {
					dataLink.dataset.goto == event.target.id
					? dataLink.classList.add('active') : dataLink.classList.remove('active')
				})
			}
		})
	}

	const observerOption = {
		threshold: [0.7],
	}

	let observerSerction = new IntersectionObserver(observerActiveSection, observerOption)

	for (let sectionItem of sectionItems) {
		observerSerction.observe(sectionItem)
	}
}



// filter function
const filter = (e) => {
	const filterItems = document.querySelectorAll('.row-works__column')
		
	for (let filterItem of filterItems) {
		!filterItem.classList.contains(e.target.dataset.filter) && e.target.dataset.filter !== 'all' 
		? filterItem.classList.add('hide') : filterItem.classList.remove('hide')
	}


	// active button
	const searchFilterActive = e.target.closest('.menu-works__list').querySelector('.active')

	searchFilterActive ? searchFilterActive.classList.remove('active') : null

	e.target.classList.add('active')
}



// click event
document.onclick = (e) => {
	e.target.closest('[data-goto]') ? scrollLinks(e) : null

	e.target.closest('[data-filter]') ? filter(e) : null
}