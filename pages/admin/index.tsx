import { NextPage } from "next";
import BoardDisplay from "@/components/boardDisplay";
import Log from "@/components/log";
import { typeRow } from "@/utils/controlPage";

const AdminDashboard: NextPage = () => {
	const groups = [
        {
            name: 'A',
            score: 37,
            card: 3
        },
        {
            name: 'C',
            score: 78,
            card: 777
        },
        {
            name: 'B',
            score: 22,
            card: 5
        }
    ]
  return (
    <div className="p-8 flex gap-8 h-screen bg-[#555555]">
      <BoardDisplay userGroups={groups}/>
	  <Log />
    </div>
  );
};

export default AdminDashboard;
