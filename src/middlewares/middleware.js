export default channel => store => next => action => {
	switch (action.type){
		case "SET_PIN":
			action.pin = Math.floor(Math.random() * 9000) + 1000;
			if (action.query){
				channel.push("sms", {
					name: "2312",
					mobile: store.getState().getIn(["user", "phoneNumber"]),
					pin: action.pin.toString(),
					uxui: "sms"
				});
			}
			break;
		case "SET_USER_EMAIL":
			if(action.query){
				channel.push("pg", {
					name: "2312",
					message: "select count(id) from users where trim(email)='" + action.email + "'",
					uxui: "pg_validate_mail"
				})
			}
			break;
		case "SET_USER_REGISTERED":
			if(action.query){
				channel.push("pg", {
					name: "2312",
					message: "INSERT INTO users (mobile,email,pinok) VALUES ( '"+store.getState().getIn(['user', 'phoneNumber'])+"','"+store.getState().getIn(['user', 'email'])+"','1')",
					uxui: "pg"
				})
			}
			break;
		case "SET_USER_PHONE":
			if(action.query){
				channel.push("pg", {
					name: "2312",
					message: "select count(id) from users where trim(mobile)='" + action.phoneNumber + "'",
					uxui: "pg_validate_phone"
				});
			}
			break;
	}
	return next(action);
}