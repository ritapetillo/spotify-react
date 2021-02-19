export const authEndpoint = "https://accounts.spotify.com/authorize";
export const redirectUri = "http%3A%2F%2Flocalhost%3A3000%2F";
const clientID = "e54184c2056e4fceba268bad7ae4175f";
const secret = '90bf6fe6367b4d92b75aa2bca47478f0'
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-modify-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];

export const loginUrl = `${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=code&show_dialog=true`;

export const fetchToken = async (code) => {
  const auth__ecripted = 'Basic ' + btoa(`${clientID}:${secret}`);
  let body = {
    grant_type: "authorization_code",
    code,
    redirect_uri: "http%3A%2F%2Flocalhost%3A3000%2F"
  };
  body = JSON.stringify(body)
  const headers = new Headers({
    
  });
  try {
      const res = await fetch(`https://accounts.spotify.com/api/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: auth__ecripted,
        },
        body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`,
      });
    return res.json()
  } catch (err) {
    console.log(err)
  }

}
