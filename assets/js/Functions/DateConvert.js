export const dateConvert = (dateString) => {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };
    let date = (new Date(dateString)).toLocaleDateString("ru", options);
    return date
}