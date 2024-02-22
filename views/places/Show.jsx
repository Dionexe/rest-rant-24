const React = require("react");
const Def = require("../Default");

const Show = ({ place }) => {
    // cuisines is comma separated string, E.g. "Italian, Chinese, Mexican"
    const cuisinesBadges = place.cuisines.split(',').map((cuisine) => {
        return (
            <span key={cuisine} className='badge rounded-pill text-bg-info me-2'>
                {cuisine}
            </span>
        );
    });

    // comments
    let comments = <h5 className='inactive'>No comments yet. Be the first to comment!</h5>;

    if (place.comments.length > 0) {
        comments = place.comments.map((comment) => {
            return (
                <div key={comment.id} className='card mb-3'>
                    <div className='card-body'>
                        <h5 className='card-title'>{comment.author}</h5>
                        <h6 className='card-subtitle mb-2 text-muted'>
                            {comment.rant ? 'Rant 😡' : 'Rave 🤩'}
                        </h6>
                        <h6 className='card-subtitle mb-2 text-muted'>
                            Rating: {comment.stars} stars
                        </h6>
                        <p className='card-text'>{comment.content}</p>
                    </div>
                </div>
            );
        });
    }

    return (
        <Def>
            <main className='container'>
                <div className='row align-items-start'>
                    <div className='col'>
                        <img src={place.pic} alt={place.name} />
                    </div>
                    <div className='col'>
                        <h1>{place.name}</h1>
                        <h5>{place.showEstablished()}</h5>
                        <p>{cuisinesBadges}</p>
                        <hr />
                        <h3>Comments</h3>
                        {comments}
                        <a href={`/places/${place.id}/comments/new`} className='btn btn-primary'>
                            <i className='bi bi-plus-circle-fill'></i> Add Comment
                        </a>
                    </div>
                </div>
                <div className='row align-items-center'>
                    <div className='col'>
                        <a href={`/places/${place.id}/edit`} className='btn btn-warning'>
                            <i className='bi bi-pencil'></i> Edit
                        </a>
                        <form action={`/places/${place.id}?_method=DELETE`} method='POST'>
                            <button type='submit' className='btn btn-danger'>
                                <i className='bi bi-trash'></i> Delete
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </Def>
    );
};

module.exports = Show;