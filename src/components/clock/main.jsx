import { Fragment, useEffect, useState } from 'react'
import 'components/clock/style.css'

const addZero = (num) => {
    return num < 10 ? `0${num}` : num
}
const Clock = () => {
    let date = new Date()
    let formatDate = new Intl.DateTimeFormat('default', { month: '2-digit', day: '2-digit', year: 'numeric' }).format(date)
    const [time, setTime] = useState(`${addZero(date.getHours())}:${addZero(date.getMinutes())}`)
    const [dateString, setDateString] = useState(`${formatDate}`)

    useEffect(() => {
        const interval = setInterval(() => {
            let date = new Date()
            let formatDate = new Intl.DateTimeFormat('default', { month: '2-digit', day: '2-digit', year: 'numeric' }).format(date)
            setTime(`${addZero(date.getHours())}:${addZero(date.getMinutes())}`)
            setDateString(`${formatDate}`)
        }, 1000)

        return () => clearInterval(interval)
    }, [time])

    return (
        <Fragment>
            <div className="clock">
                <span>{time}</span>
                <span>{dateString}</span>
            </div>
        </Fragment>
    )
}

export default Clock
