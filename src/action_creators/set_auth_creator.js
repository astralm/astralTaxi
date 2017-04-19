export default function(auth = false){
	return {
		type: 'SET_AUTH',
		auth: auth 
	}
}