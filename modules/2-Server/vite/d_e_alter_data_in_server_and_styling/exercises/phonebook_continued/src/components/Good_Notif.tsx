const Good_Notification = ({message}: {message: string | null}) => {
    if(message === null)
        return null;
    return (
        <div className='success'>
            {message}
        </div>
    )
}
export default Good_Notification;
