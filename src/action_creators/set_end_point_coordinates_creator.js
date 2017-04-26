export default function(lat, lng){
	return {
		type: "SET_END_POINT_COORDINATES",
		lat: lat,
		lng: lng
	}
}