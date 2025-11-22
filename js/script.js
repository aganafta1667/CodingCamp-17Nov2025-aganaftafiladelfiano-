(function(){
	function qs(sel){return document.querySelector(sel)}
	function qsa(sel){return document.querySelectorAll(sel)}

	document.addEventListener('DOMContentLoaded', function(){
		const navToggle = qs('.nav-toggle');
		const nav = qs('.nav');
		const nameInput = qs('#name');
		const greetEl = qs('#greetName');
		const form = qs('#contactForm');
		const formError = qs('#formError');
		const displayBox = qs('#submittedValues');
		const currentTime = qs('#currentTime');

		// nav toggle for mobile
		navToggle.addEventListener('click', function(){
			nav.classList.toggle('open');
		});

		// live update greeting while typing
		if(nameInput){
			nameInput.addEventListener('input', function(e){
				const v = e.target.value.trim();
				greetEl.textContent = v || 'Harti';
			});
		}

		// simple validators
		function isEmail(v){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)}
		function isPhone(v){return /^\+?[0-9\s\-]{6,20}$/.test(v)}

		function updateTime(){
			const d = new Date();
			currentTime.textContent = 'Current time: ' + d.toString();
		}
		updateTime();

		if(form){
			form.addEventListener('submit', function(e){
				e.preventDefault();
				formError.textContent = '';
				const name = qs('#name').value.trim();
				const email = qs('#email').value.trim();
				const phone = qs('#phone').value.trim();
				const message = qs('#message').value.trim();
				const errors = [];

				if(!name) errors.push('Name is required.');
				if(!email) errors.push('Email is required.');
				else if(!isEmail(email)) errors.push('Email is invalid.');
				if(!phone) errors.push('Phone number is required.');
				else if(!isPhone(phone)) errors.push('Phone number is invalid (digits and + only).');
				if(!message) errors.push('Message is required.');

				if(errors.length){
					formError.textContent = errors.join(' ');
					return;
				}

				// show submitted values
				const html = [
					'<strong>Name:</strong> ' + escapeHtml(name),
					'<strong>Email:</strong> ' + escapeHtml(email),
					'<strong>Phone:</strong> ' + escapeHtml(phone),
					'<strong>Message:</strong> ' + escapeHtml(message)
				].join('<br>');
				displayBox.innerHTML = html;
				greetEl.textContent = name;
				updateTime();
			});
		}

		// small helper to avoid injection in the display box
		function escapeHtml(str){
			return (str+'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
		}
	});
})();

