export default function(registered = false, query = false){
	return {
		type: "SET_USER_REGISTERED",
		registered: registered,
		query: query
	}
}