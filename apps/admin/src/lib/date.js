/**
 * @param {Date} date
 */
function getDayStr (date) {
  const days = [
    'Minggu',
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jum\'at',
    'Sabtu'
  ]

  return days[date.getDay()]
}

/**
 * @param {Date} date
 */
function getMonthStr (date) {
  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ]

  return months[date.getMonth()]
}

function formatDate (date) {
  date = new Date(date)
  const day = getDayStr(date)
  const month = getMonthStr(date)
  const year = date.getFullYear()
  return `${day}, ${date.getDate()} ${month} ${year}`
}

module.exports = {
  formatDate,
}
