const express = require('express');
const router = require('express').Router();
const db = require('../models');

router.get('/', (req, res) => {
    db.Place.find()
    .then((places) => {
      res.render('places/index', { places })
    })
    .catch(err => {
      console.log(err) 
      res.render('Error404')
    })
})

router.post('/', (req, res) => {
  if (!req.body.pic) {
    // Default image if one is not provided
    req.body.pic = 'http://placekitten.com/400/400'
  }

  db.Place.create(req.body)
  .then(() => {
      res.redirect('/places')
  })
  .catch(err => {
      console.log('err', err)
      res.render('Error404')
  })
})


router.get('/new', (req, res) => {
  res.render('places/New')
})

router.get('/:id', (req, res) => {
  db.Place.findById(req.params.id)
  .populate('comments')
  .then(place => {
      console.log(place.comments)
      res.render('places/Show', { place })
  })
  .catch(err => {
      console.log('err', err)
      res.render('Error404')
  })
})


router.delete('/:id', (req, res) => {
  db.Place.findByIdAndDelete(req.params.id)
      .then(() => {
          res.redirect('/places');
      })
      .catch((err) => {
          console.log(err);
          res.status(404).render('Error404');
      });
});

//Update Place
router.get('/:id/Edit', (req, res) => {
  db.Place.findById(req.params.id)
      .then((place) => {
          res.render('places/Edit', { place });
          // res.send(render('places/Edit', { place }));
      })
      .catch((err) => {
          console.log(err);
          res.status(404).render('Error404');
          // res.status(404).send(render('Error404'));
      });
});

router.put('/:id', (req, res) => {
  db.Place.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((updatedPlace) => {
          res.redirect(`/places/${updatedPlace.id}`);
      })
      .catch((err) => {
          console.log(err);
          res.status(404).render('Error404');
          // res.status(404).send(render('Error404'));
      });
});

router.post('/:id/rant', (req, res) => {
  res.send('GET /places/:id/rant stub')
})

router.delete('/:id', (req, res) => {
  db.Place.findByIdAndDelete(req.params.id)
      .then(() => {
          res.redirect('/places');
      })
      .catch((err) => {
          console.log(err);
          res.status(404).render('Error404');
          // res.status(404).send(render('Error404'));
      });
});

router.put("/:id", (req, res) => {
  let id = Number(req.params.id);
  if (isNaN(id)) {
    res.render("Error404");
  } else if (!places[id]) {
    res.render("Error404");
  } else {
    // Dig into req.body and make sure data is valid
    if (!req.body.pic) {
      // Default image if one is not provided
      req.body.pic = "http://placekitten.com/400/400";
    }
    if (!req.body.city) {
      req.body.city = "Anytown";
    }
    if (!req.body.state) {
      req.body.state = "USA";
    }

    // Save the new data into places[id]
    places[id] = req.body;
    res.redirect(`/places/${id}`);
  }
});

// COMMENTS
router.get('/:id/comments/new', (req, res) => {
  db.Place.findById(req.params.id)
      .then((place) => {
          res.render('comments/New', { place });
      })
      .catch((err) => {
          console.log(err);
          res.status(404).send('Not Found');
      });
});

router.post('/:id/comments', (req, res) => {
  let commentData = req.body;
  commentData.rant = commentData.rant === 'on';
  commentData.stars = parseFloat(commentData.stars);
  db.Comment.create(commentData)
      .then((comment) => {
          db.Place.findById(req.params.id)
              .then((place) => {
                  place.comments.push(comment);
                  place.save();
                  res.redirect(`/places/${place._id}`);
              })
              .catch((err) => {
                  console.log(err);
                  res.status(404).send('Not Found');
              });
      })
      .catch((err) => {
          console.log(err);
          res.status(400).send('Bad Request');
      });
});

module.exports = router;
