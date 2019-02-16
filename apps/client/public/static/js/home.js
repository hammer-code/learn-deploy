function getEvents () {
  return fetch(ENDPOINT_BASE_URL+'/api/events')
    .then(response => response.json());
}

/**
 * Membuat card element
 * @param {object} data 
 * @param {string} data.title 
 * @param {string} data._id 
 * @param {string} data.date 
 * @param {string} data.creator
 * @param {Array} data.roles
 */
function Card (data) {
  this.title = data.title;
  this.date = data.date;
  this.creator = data.creator;
  this.el = null;

  this._build();
}

/**
 * Membuat html element
 */
Card.prototype._build = function () {
  const card = document.createElement('div');

  const title = this._createTitle(this.title);
  const date = this._createDate(this.date);
  const creator = this._createCreator(this.creator);

  card.append(title);
  card.append(date);
  card.append(creator);
  
  this.el = card;
}

Card.prototype._createTitle = function createTitle (title) {
  const h3 = document.createElement('h3');
  h3.innerText = title;
  return h3;
}

Card.prototype._createDate = function createDate (date) {
  const span = document.createElement('span');
  span.innerText = formatDate(new Date(date));  
  return span;
}

Card.prototype._createCreator = function createCreator (creator) {
  const span = document.createElement('div');
  span.innerText = 'Dibuat oleh: ' + creator.username
  return span;
}

/**
 * @param {string|HTMLElement} target
 */
Card.prototype.mount = function (target) {
  let parent = null;
  if (typeof target === 'string') {
    parent = document.querySelector(target);
  } else if (target instanceof HTMLElement) {
    parent = target;
  }

  parent.append(this.el);
}

getEvents()
  .then((data) => {
    const { events } = data;
    const target = document.querySelector('#event-list');

    events.forEach((event) => {
      const card = new Card(event);

      card.mount(target);
    });
  });

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

  return days[date.getDay()]
}

function formatDate (date) {
  const day = getDayStr(date)
  const month = getMonthStr(date)
  const year = date.getFullYear()
  return `${day}, ${date.getDate()} ${month} ${year}`
}