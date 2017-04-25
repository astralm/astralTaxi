export default function(lat, lng){
	return {
		type: "SET_START_POINT_COORDINATES",
		lng: lng,
		lat: lat
	}
}