import { typeRow } from "@/utils/controlPage";

const BoardDisplay: React.FC<{ userGroups: typeRow[] }> = ({ userGroups }) => {
  return (
      <table className="table-auto border border-red-500 text-center w-4/6 text-xl text-white">
        <thead>
          <tr>
            <th className="border border-red-600 p-4">ชื่อกลุ่ม</th>
            <th className="border border-red-600 p-4">คะแนน</th>
            <th className="border border-red-600 p-4">จำนวนการ์ดที่มี</th>
          </tr>
        </thead>
        <tbody>
          {userGroups.map((userGroup) => {
            return (
              <tr>
                <td className="border border-red-600">{userGroup.name}</td>
                <td className="border border-red-600">{userGroup.score}</td>
                <td className="border border-red-600">{userGroup.card}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
  );
};

export default BoardDisplay;
