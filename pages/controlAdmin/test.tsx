import { useState } from "react";

export default function AdminDashboard() {
    // ลองไปดูเรื่อง useState
    const [isShowAll, setIsShowAll] = useState(false);

    // ข้อมูลจำลอง
    const exampleData = [];
    for (let i = 0; i < 10; i++) {
        exampleData.push({
            name: "John Doe",
            score: 50,
            card: 2,
            index: i,
        });
    }

    // สามารถสร้างฟังก์ชั่นใน component/page แล้วเอาไปใช้ในตัวมันได้
    function toggleShowAll() {
        setIsShowAll(!isShowAll);
    }

    return (
        <>
            <button className="bg-red-200 p-4" onClick={toggleShowAll}>
                Show All
            </button>
            {isShowAll // ลองไปดูเรื่อง ternary operator
                ? exampleData.map((e) => {
                    return (
                        <li>
                            {e.name}, {e.score}, {e.card} from index {e.index}
                        </li>
                    );
                })
                : exampleData.slice(0, 5).map((e) => {
                    return (
                        <li>
                            {e.name}, {e.score}, {e.card} from index {e.index}
                        </li>
                    );
                })}
        </>
    );
}