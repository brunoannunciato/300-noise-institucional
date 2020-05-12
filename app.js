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

		console.log(document.querySelector('.publi__cards'))
		document.querySelector('.publi__cards').insertAdjacentHTML('beforeend', html);
	},
	setup: function() {
		this.fetchData()
	}
}

medium.setup()