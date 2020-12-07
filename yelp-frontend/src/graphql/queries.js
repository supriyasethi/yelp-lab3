import { gql } from 'apollo-boost';

const fetchProfile = gql`
	query fetchBiz($restaurantId: String) {
		User(restaurantId: $restaurantId) {
			name
		}
	}
`;



export { fetchProfile };