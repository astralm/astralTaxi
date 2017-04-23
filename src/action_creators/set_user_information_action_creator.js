export default function (userInformation, query = false){
	return {
		type: 'SET_USER_INFORMATION',
		userInformation: userInformation,
		query
	}
}