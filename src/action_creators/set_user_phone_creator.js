export default function(phoneNumber = false, query = false){
	return {
		type: "SET_USER_PHONE",
		phoneNumber: phoneNumber,
		query: query
	}
}