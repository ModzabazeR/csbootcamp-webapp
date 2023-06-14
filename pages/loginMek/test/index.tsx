import type { ReactElement } from 'react'
import Layout from '../layout'
import type { NextPageWithLayout } from '../../_app'

const Page: NextPageWithLayout = () => {
  return <div className="text-center h-screen justify-center items-center w-full bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
    <div className=" block text-5xl font-bold text-white drop-shadow-lg">CS29 Bootcamp | ยินดีต้อนรับ</div>
    <br></br>
    <div className="flex items-center justify-center">
    <div className="w-6/12 mb-6  items-center">
      <input type="text" id="input" placeholder="name" className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" ></input>
      <input type="text" id="input-2" placeholder="password" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" ></input>
      <div className="m-10">
      <button type="submit" className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
      </div>
    </div>
    </div>
  </div>
  

}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Page