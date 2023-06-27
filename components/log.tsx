import { Courier_Prime } from "next/font/google";

const courier = Courier_Prime({
	weight: "400",
	display: "swap",
	subsets: ["latin"]
})

const Log: React.FC<{ messages: string[] }> = ({ messages }) => {
  return (
    <div className={`${courier.className} rounded-lg w-full md:w-10/12 h-1/2 md:h-full bg-slate-100 overflow-auto p-2`}>
  {
    messages.map((m, index) => {
    return <div key={index}>{
      m.split('\n').map((item, i) => <div key={i}>{item}</div>)
    }
	<br /></div>
    })
  }
</div>
  );
};

export default Log;
