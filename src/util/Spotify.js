const clientId = '5875795b367747bf801d98ef9b5ffeb2';
const redirect_uri = 'https://hear-the-rainbow.vercel.app';
let accessToken;

const Spotify = {
	getAccessToken() {
		if (accessToken) {
			return accessToken;
		}

		const newAccessToken = window.location.href.match(/access_token=([^&]*)/);
		const newExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
		if (newAccessToken && newExpiresIn) {
			accessToken = newAccessToken[1];
			const expiresIn = Number(newExpiresIn[1]);
			window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
			window.history.pushState('Access Token', null, '/');
			return accessToken;
		} else {
			const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&show_dialog=true&redirect_uri=${redirect_uri}`;
			window.location = accessUrl;
		}
	},

	getGenres() {
		const accessToken = Spotify.getAccessToken();
		const headers = {
			Authorization: `Bearer ${accessToken}`
		};
		return fetch(`https://api.spotify.com/v1/recommendations/available-genre-seeds`, { headers: headers })
			.then(
				(response) => {
					if (response.ok) {
						return response.json();
					}
					throw new Error('Request failed!');
				},
				(networkError) => {
					console.log(networkError.message);
				}
			)
			.then((jsonResponse) => {
				if (!jsonResponse.genres) {
					return [];
				}
				return jsonResponse.genres;
			});
	},

	search(searchTerm, values) {
		const energy = values.energy;
		const danceability = values.danceability;
		const valence = values.valence;
		const loudness = values.loudness;
		const accessToken = Spotify.getAccessToken();
		const headers = {
			Authorization: `Bearer ${accessToken}`
		};
		return fetch(`https://api.spotify.com/v1/recommendations?limit=30&market=US&seed_genres=${searchTerm}&target_energy=${energy}&target_danceability=${danceability}&target_valence=${valence}&target_loudness=${loudness}`, { headers: headers })
			.then(
				(response) => {
					if (response.ok) {
						return response.json();
					}
					throw new Error('Request failed!');
				},
				(networkError) => {
					console.log(networkError.message);
				}
			)
			.then((jsonResponse) => {
				if (!jsonResponse.tracks) {
					return [];
				}
				return jsonResponse.tracks.map((track) => ({
					id: track.id,
					name: track.name,
					artist: track.artists[0].name,
					uri: track.uri,
					cover: track.album.images[0].url
				}));
			});
	},

	savePlaylist(playlistName, trackURIs) {
		if (playlistName && trackURIs.length) {
			const accessToken = Spotify.getAccessToken();
			const headers = {
				Authorization: `Bearer ${accessToken}`
			};
			let userID;
			let playlistID;
			return fetch('https://api.spotify.com/v1/me', { headers: headers })
				.then(
					(response) => {
						if (response.ok) {
							return response.json();
						}
						throw new Error('Request failed!');
					},
					(networkError) => {
						console.log(networkError.message);
					}
				)
				.then((jsonResponse) => {
					userID = jsonResponse.id;
					return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
						method: 'POST',
						headers: headers,
						body: JSON.stringify({ name: playlistName })
					})
						.then(
							(response) => {
								if (response.ok) {
									return response.json();
								}
								throw new Error('Request failed!');
							},
							(networkError) => {
								console.log(networkError.message);
							}
						)
						.then((jsonResponse) => {
							playlistID = jsonResponse.id;
							return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
								method: 'POST',
								headers: headers,
								body: JSON.stringify({ uris: trackURIs })
							})
								.then(
									(response) => {
										if (response.ok) {
											return response.json();
										}
										throw new Error('Request failed!');
									},
									(networkError) => {
										console.log(networkError.message);
									}
								)
								.then((jsonResponse) => jsonResponse);
						});
				});
		} else {
			return;
		}
	}
};

export default Spotify;
