export default channel => store => next => action => {
	switch (action.type){
		case "SET_USER_INFORMATION": 
			if (action.query){
				channel.push("pg", {
					name: "2312",
					message: "select count(id) from users where trim(mobile)='" + action.userInformation + "'",
					uxui: "pg_validate_phone"
				});
			}
		case "SET_PIN":
			if (action.query){
				channel.push("sms", {
					name: "2312",
					mobile: store.getState().getIn(["user", "phoneNumber"]),
					pin: store.getState().getIn(["user", "pin"]),
					uxui: "sms"
				});
			}
	}
	return next(action);
}