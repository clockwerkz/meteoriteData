import soda from 'soda-js';

const consumer = new soda.Consumer('data.nasa.gov');

const fetchInitialData = (page, offset, cb) => {
    consumer.query()
      .withDataset('gh4g-9sfh')
      .order('name ASC')
      .limit(page)
      .offset(offset)
      .getRows()
      .on('success', (data)=> cb(data))
      .on('error', (error)=> console.error(error));
}


const queryDataStartsWith = (page, offset, cb, searchString) => {
  consumer.query()
    .withDataset('gh4g-9sfh')
    .order('name ASC')
    .where(`lower(name) like "${searchString.toLowerCase().trim()}%"`)
    .limit(page)
    .offset(offset)
    .getRows()
    .on('success', (data)=> cb(data))
    .on('error', (error)=> console.error(error));
}

const queryDataContains = (page, offset, cb, searchString) => {
  consumer.query()
    .withDataset('gh4g-9sfh')
    .order('name ASC')
    .where(`lower(name) like "%${searchString.toLowerCase().trim()}%"`)
    .limit(page)
    .offset(offset)
    .getRows()
    .on('success', (data)=> cb(data))
    .on('error', (error)=> console.error(error));
}

export { fetchInitialData , queryDataStartsWith, queryDataContains }
