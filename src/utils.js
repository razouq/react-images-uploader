
export const extensions = (mimes) => {
    const authorized = mimes.split(',').map((el) => {
        return el.trim().split('/')[1].toUpperCase();
    });
    return authorized.join(', ');
}