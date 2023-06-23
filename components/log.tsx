const Log: React.FC<{ messages: string[] }> = ({ messages }) => {
  return (
    <div className="rounded-lg w-full md:w-2/6 h-1/2 md:h-full bg-slate-100 overflow-auto p-2">
		{
			messages.map((m) => {
				return <div>{m}</div>
			})
		}
	</div>
  );
};

export default Log;
