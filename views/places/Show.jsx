const React = require("react");
const Def = require("../Default");

function show(data) {
  return (
    <Def>
      <main>
        <h1>{data.place.name}</h1>
      </main>
        <div>
        <img src= {data.place.pic}></img>
        <h3>
          Located in {data.place.city}, {data.place.state}
        </h3>
        </div>
        <div className="col-sm-6">
        <h2>
          Description
        </h2>
        <h3>
          {data.place.showEstablished()}
        </h3>
        <h4>
          Serving {data.place.cuisines}
        </h4>
    </div>
      <a href={`/places/${data.id}/edit`} className="btn btn-warning"> 
  Edit
</a>     
<form method="POST" action={`/places/${data.id}?_method=DELETE`}> 
  <button type="submit" className="btn btn-danger">
    Delete
  </button>
</form> 
    </Def>
  );
}

module.exports = show;
