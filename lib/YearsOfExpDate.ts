function YearsOfExpDate() {
    const start = new Date(2021, 0, 1);
    const now = new Date();
    const years = now.getFullYear() - start.getFullYear();
    const months = now.getMonth() - start.getMonth();
    const totalMonths = years * 12 + months;
    const displayYears = Math.floor(totalMonths / 12);
    const displayMonths = totalMonths % 12;
    return `${displayYears}.${displayMonths}+`;
}

export { YearsOfExpDate };
