// import { Kanit } from 'next/font/google'

// const kanit = Kanit({
//   subsets: ['thai'],
//   weight: '400'
// })

import Card from "@/components/card"

export default function Home() {
  return (
    <div className="flex h-screen justify-center items-center bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
        <div className="text-5xl font-bold text-white drop-shadow-lg">CS29 Bootcamp | ยินดีต้อนรับ</div>
        {/* <Card name="สลับ" type="การ์ดโจมตี" description="สลับการ์ดกับกลุ่มอื่นได้" price={999} />
        <Card name="x2" type="การ์ดบัฟ" description="คูณ 2 คะแนนกลุ่มตัวเองในรอบนั้น" price={50} />
        <Card />
        <Card /> */}
    </div>
  )
}
