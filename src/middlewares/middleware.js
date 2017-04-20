export default store => next => action => {
	switch (action.type){
		case "SET_USER_INFORMATION":
			console.log("qwdqw");
	}
	return next(action);
}