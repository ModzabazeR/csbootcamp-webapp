import { useState } from "react";

async function loginPerform(credentials:{username:string,password:string}) {
  const dataBody = {
    username: Buffer.from(credentials.username, 'utf8').toString('base64'),
    password:Buffer.from(credentials.password, 'utf8').toString('base64')
  }
  console.log(dataBody);
  return fetch('https://api.cscamp.net/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataBody)
  })
    .then(data => data.json())
    .then(dataJson => console.log(dataJson))
 }

const  LogInPanel: React.FC = () => {
  const [token, setToken] = useState();
  const  handleSubmit = async (e: any) => {
    e.preventDefault();

	const data = {
		username: e.target.username.value,
		password: e.target.password.value,
	}
  
  // redirects to /dashboard if is user
  // redirects to /admin if is admin
  console.log(await loginPerform(data))
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex flex-col mb-8 gap-y-4 text-white">
      <div className="flex flex-col">
        <label className="font-light" htmlFor="username">Username</label>
        <input className="p-2 text-black rounded-xl focus:outline-purple-500" type="text" name="username" id="username" required />
      </div>

      <div className="flex flex-col">
        <label className="font-light"  htmlFor="password">Password</label>
        <input className="p-2 text-black rounded-xl focus:outline-purple-500" type="password" name="password" id="password" autoComplete="current-password" required />
      </div>

      <button className="bg-purple-300 p-2 rounded-xl uppercase mt-2" type="submit">Login</button>
    </form>
  );
};

export default LogInPanel;
