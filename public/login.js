window.onload = () => {

	const loginButton = document.querySelector('#loginBtn')
	const loginField = document.querySelector('#login-field')
	const pwField = document.querySelector('#pw-field')

	loginButton.addEventListener('click', ev => {
		fetch('/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				login: loginField.value,
				password: pwField.value
			})
		})
		.then(res => {
			res.json().then(body => {
				console.log(body)
				if(body.auth) {
					localStorage.setItem('jwt', body.token)
					location.replace('/chat')
				} else {
					console.log('auth failed')
				}
			})
		}).catch(err => {
			console.log('request went wrong')
		})
	})
}
