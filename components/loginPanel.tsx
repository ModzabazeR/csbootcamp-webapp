import { useRouter } from "next/router";

import { useCookies } from "react-cookie";

const LogInPanel: React.FC = () => {
  const router = useRouter();
  const [cookies, setCookie] = useCookies();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const usernamePassword = Buffer.from(
      `${e.target.username.value}:${e.target.password.value}`,
      "utf8"
    ).toString("base64");

    fetch("https://api.cscamp.net/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: usernamePassword,
      },
    })
      .then((data) => data.json())
      .then((dataJson) => {
        if (dataJson.code !== "000") {
          alert(dataJson.message);
          return;
        }

        setCookie("token", dataJson.data.token);
        router.reload();
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col mb-8 gap-y-4 text-white"
    >
      <div className="flex flex-col">
        <label className="font-light" htmlFor="username">
          Username
        </label>
        <input
          className="p-2 text-black rounded-xl focus:outline-purple-500"
          type="text"
          name="username"
          id="username"
          autoComplete="username"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="font-light" htmlFor="password">
          Password
        </label>
        <input
          className="p-2 text-black rounded-xl focus:outline-purple-500"
          type="password"
          name="password"
          id="password"
          autoComplete="current-password"
          required
        />
      </div>

      <button
        className="bg-purple-300 p-2 rounded-xl uppercase mt-2"
        type="submit"
      >
        Login
      </button>
    </form>
  );
};

export default LogInPanel;
