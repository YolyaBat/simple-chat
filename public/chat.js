window.onload = () => {

	const jwt = localStorage.getItem('jwt')

	if(!jwt) {
		location.replace('/login')
	} else {
		const submitButton = document.querySelector('#submit')
		const messageArea = document.querySelector('#message-area')
		const messageList = document.querySelector('#message-list')

		const socket = io.connect('http://192.168.1.72:3000/')
		submitButton.addEventListener('click', ev => {
			socket.emit('submitMessage', { message: messageArea.value, token: jwt })
			messageArea.value = ""
		})
		socket.on('newMessage', payload => {
			const message = document.createElement('li')
			message.innerHTML = `${payload.user}: ${payload.message}`
			messageList.appendChild(message)
		})
	}
}