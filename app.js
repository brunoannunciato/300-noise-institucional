const gallery = {
	buttons: document.querySelectorAll('.gallery__button'),
	sections: document.querySelectorAll('.gallery__section'),
	handleSector: function() {
		this.buttons.forEach(button => {
			
			button.addEventListener("click", event => {
				const selectedbutton = event.target

				gallery.buttons.forEach(button => button.classList.remove('is-actived'))

				selectedbutton.classList.add('is-actived')

				this.sections.forEach(section => {
					section.classList.remove('is-actived')
					
					if (section.getAttribute('data-section') === selectedbutton.getAttribute('data-button')) {
						section.classList.add('is-actived')
					}
				})
			})
		})
	},
	setup: function() {
		this.handleSector()
	}
}

const events = {
	buttons: document.querySelectorAll('.events__card'),
	modals: document.querySelectorAll('.modal'),
	showOverlay: function() {
		document.querySelector('.overlay').classList.add('is-actived')
	},
	hideOverlay: function() {
		document.querySelector('.overlay').classList.remove('is-actived')
	},
	closeModals: function () {
		const close = document.querySelectorAll('.modal__close')

		close.forEach(button => {
			button.addEventListener('click', event => {
				event.target.parentNode.classList.remove('is-actived')
				events.hideOverlay()
			})
		})
	},
	handleSector: function() {
		this.buttons.forEach(button => {
			button.addEventListener("click", event => {
				const selectedbutton = event.target
				this.modals.forEach(modal => {
					modal.classList.remove('is-actived')
					if (modal.getAttribute('event-modal') === selectedbutton.parentNode.getAttribute('event-button')) {
						events.showOverlay()
						modal.classList.add('is-actived')
					}
				})
			})
		})
	},
	setup: function() {
		this.closeModals()
		this.handleSector()
	}
}

const medium = {
	data: {},
	fetchData: function() {
		fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/300-noise')
		.then((res) => res.json())
		.then((data) => {
			for (var i = 0; i < 4; i++) {
				medium.mountCard(data.items[i])
			}
		})
	},
	mountCard: function(data) {
		let html = `
			<div class="publi__card">
				<div class="publi__image-wrapper">
					<a href="${data.link}" target="_blank">	
						<img src="${data.thumbnail}" alt="${data.title}">
					</a>
				</div>

				<a href="${data.link}" target="_blank" class="publi__card-title">
					${data.title}
				</a>

				<a href="${data.link}" target="_blank" class="publi__card-author">
					Por ${data.author}
				</a>
			</div>
		`

		document.querySelector('.publi__cards').insertAdjacentHTML('beforeend', html);
	},
	setup: function() {
		this.fetchData()
	}
}

gallery.setup()
medium.setup()
events.setup()