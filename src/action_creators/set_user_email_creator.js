export default function(email = false, query = false){
	return {
		type: "SET_USER_EMAIL",
		email: email,
		query: query
	}
}