
function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
}

function formatHeure (dateString: string) {
    const date = new Date(dateString);
    return date.toTimeString().slice(0, 5); // HH:mm
}

export { formatDate, formatHeure }