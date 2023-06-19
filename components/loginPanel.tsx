const LogInPanel: React.FC = () => {
  const handleSubmit = async (e: any) => {
    e.preventDefault();

	const data = {
		username: e.target.username.value,
		password: e.target.password.value,
	}
    console.log("User pressed login")
	console.log(data)
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col mb-8 gap-y-4 text-white">
      <div className="flex flex-col">
        <label className="font-light" htmlFor="username">Username</label>
        <input className="p-2 text-black rounded-xl focus:outline-purple-500" type="text" name="username" id="username" required />
      </div>

      <div className="flex flex-col">
        <label className="font-light"  htmlFor="password">Password</label>
        <input className="p-2 text-black rounded-xl focus:outline-purple-500" type="password" name="password" id="password" required />
      </div>

      <button className="bg-purple-300 p-2 rounded-xl uppercase mt-2" type="submit">Login</button>
    </form>
  );
};

export default LogInPanel;
