import ICard from "@/typings"

export default function Card({name, type, description, price}: ICard) {
	return (
		<div className="bg-gray-200 mx-4 p-4">
			<p>ชื่อการ์ด: {name}</p>
			<p>ประเภท: {type}</p>
			<p>ความสามารถ: {description}</p>
			<p>ราคา: {price}</p>
		</div>
	)
}