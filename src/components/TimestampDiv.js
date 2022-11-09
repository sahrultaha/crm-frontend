const TimestampDiv = ({ time, ...props }) => {
    const date = new Date(time)
    return <div className="mt-4 -mb-3">{date.toLocaleString()} </div>
}

export default TimestampDiv