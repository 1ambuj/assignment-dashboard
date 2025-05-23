import { useEffect, useState } from "react"
import { columns } from "./Column"
import { DataTable } from "./DataTable"
import {datas} from "@/data/tableDummyData"
import { useLocation } from "react-router-dom"

function Dashboard() {
  const [data, setData] = useState(datas)
  const [loading, setLoading] = useState(false)
  const location = useLocation()

  useEffect(() => {
    async function getData() {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      setLoading(false)
      setData(data)
    }

    getData()
  }, [location.pathname])

  return (
    <div className="w-full h-full flex flex-col">
      <h1 className="text-2xl font-bold mx-6">{location.pathname}</h1>
      <DataTable columns={columns} data={data} loading={loading} />
    </div>
  )
}

export default Dashboard


