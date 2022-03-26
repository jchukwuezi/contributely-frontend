const formatDate = (date) =>{
    const dt = new Date(date)
    return dt.toLocaleDateString(
        'en-gb',
        {
            year: 'numeric',
            month: 'long',
            day:'numeric'
        }
    )
}

export default formatDate;