const React = require('react');
const Def = require('../Default');

const New = ({ place }) => {
    let sumRatings = place.comments.reduce((tot, c) => {
        return tot + c.stars
      }, 0)
      let averageRating = sumRatings / place.comments.length
      let stars = ''
      for (let i = 0; i < averageRating; i++) {
        stars += '⭐️'
      }
      let rating = (
        <h3>
          {stars} stars
        </h3>
      )      
    return (
        <Def>
            <main>
                <h1>Add a New Comment for: {place.name}</h1>
                <form action={`/places/${place.id}/comments`} method='POST'>
                    <div className='mb-3'>
                        <label htmlFor='author'>Author</label>
                        <input type='text' name='author' id='author' className='form-control' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='rant'>
                            Rant{' '}
                            <input type='checkbox' name='rant' id='rant' className='checkbox' />
                        </label>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='stars'>Star Rating</label>
                        <input
                            type='number'
                            step={0.5}
                            name='stars'
                            id='stars'
                            className='form-control'
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='content'>Content</label>
                        <input
                            type='text'
                            name='content'
                            id='content'
                            className='form-control'
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <button type='submit' className='btn btn-primary'>
                            <i className='bi bi-plus-circle-fill'></i> Add Comment
                        </button>
                    </div>
                </form>
            </main>
        </Def>
    );
};

module.exports = New;