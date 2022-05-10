// pemanggilan package express
const express = require('express');

const app = express();
const port = 3000;
// import db connection
const db = require('./connection/db');

app.use('/public', express.static(__dirname + '/public'));
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: false }));

const projects = [
  {
    name: 'Dumbways App - 2021',
    startDate: '2020-01-02',
    endDate: '2020-04-02',
    duration: '4 Bulan',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga recusandae itaque animi nam repellendus sapiente.',
    technologies: ['nodeJs.svg', 'reactJs.svg'],
  },
];

app.get('/', (req, res) => {
  let dataProjects = projects.map((data) => {
    return {
      ...data,
      duration: getTime(data.startDate, data.endDate),
      detailDate: getDetailDate(data.startDate, data.endDate),
    };
  });
  console.log(dataProjects);
  res.render('index', { project: dataProjects });
});

app.post('/edit-project', (req, res) => {
  let name = req.body.name;
  let description = req.body.description;
  let startDate = req.body.startDate;
  let endDate = req.body.endDate;
  let technologies = req.body.technologies;

  let id = req.body.id;

  let editedProject = {
    name: name,
    description: description,
    startDate: startDate,
    endDate: endDate,
    duration: getTime(startDate, endDate),
    technologies: technologies,
    detailDate: getDetailDate(startDate, endDate),
  };

  projects.splice(id, 1);
  projects.push(editedProject);

  console.log(projects);

  res.redirect('/');
});

app.get('/delete-project/:id', (req, res) => {
  let id = req.params.id;

  projects.splice(id, 1);

  res.redirect('/');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});
app.get('/add-project', (req, res) => {
  res.render('add-project');
});
app.post('/add-project', (req, res) => {
  let name = req.body.name;
  let description = req.body.description;
  let startDate = req.body.startDate;
  let endDate = req.body.endDate;
  let technologies = req.body.technologies;

  let project = {
    name: name,
    description: description,
    startDate: startDate,
    endDate: endDate,
    duration: getTime(startDate, endDate),
    technologies: technologies,
    detailDate: getDetailDate(startDate, endDate),
  };

  projects.push(project);
  console.log(projects);

  res.redirect('/');
});

app.get('/delete-project/:id', (req, res) => {
  let id = req.params.id;

  projects.splice(id, 1);

  res.redirect('/');
});

app.get('/detail-project/:id', (req, res) => {
  let id = req.params.id;
  let project = projects[id];
  console.log(project);

  res.render('detail-project', { project });
});

app.get('/edit-project/:id', (req, res) => {
  let id = req.params.id;
  let project = projects[id];
  console.log(project);

  res.render('edit-project', { project: project, id: id });
});

app.listen(port, () => {
  console.log(`App Listening to port ${port}`);
});

const month = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

function getDetailDate(d1, d2) {
  const dateOne = new Date(d1);
  const dateTwo = new Date(d2);

  const startDate = dateOne.getDate();
  const startMonthIndex = dateOne.getMonth();
  const startYear = dateOne.getFullYear();

  const endDate = dateTwo.getDate();
  const endMonthIndex = dateTwo.getMonth();
  const endYear = dateTwo.getFullYear();

  return `${startDate} ${month[startMonthIndex]} ${startYear} - ${endDate} ${month[endMonthIndex]} ${endYear}`;
}

function getTime(d1, d2) {
  const dateOne = new Date(d1);
  const dateTwo = new Date(d2);

  const time = Math.abs(dateTwo - dateOne);
  console.log(time);
  const month = Math.ceil(time / (1000 * 60 * 60 * 24 * 30));
  const year = Math.floor(time / (1000 * 60 * 60 * 24 * 30 * 12));

  if (month < 12) {
    return `${month} Bulan`;
  } else {
    return `${year} tahun`;
  }
}
