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
    searchString = searchString[0].toUpperCase() + searchString.slice(1).toLowerCase();
      consumer.query()
        .withDataset('gh4g-9sfh')
        .order('name ASC')
        .where("name like '"+searchString+"%'")
        .limit(page)
        .offset(offset)
        .getRows()
        .on('success', (data)=> cb(data))
        .on('error', (error)=> console.error(error));
}

const queryDataContains = (page, offset, cb, searchString) => {
    const searchStringUpper = searchString[0].toUpperCase() + searchString.slice(1).toLowerCase();
    searchString = searchString.toLowerCase();
      consumer.query()
        .withDataset('gh4g-9sfh')
        .order('name ASC')
        .where("name like '%"+searchString+"%' OR name like '%"+searchStringUpper+"%'")
        .limit(page)
        .offset(offset)
        .getRows()
        .on('success', (data)=> cb(data))
        .on('error', (error)=> console.error(error));
}

export { fetchInitialData , queryDataStartsWith, queryDataContains }
