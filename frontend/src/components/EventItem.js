import classes from './EventItem.module.css';
import { Link } from 'react-router-dom';
import { useSubmit } from 'react-router-dom';


function EventItem({ event }) {
  const submit = useSubmit(); 
  function startDeleteHandler() {
    // ...
    const confirmation = window.confirm('Sure you waanna delete this event');
    if(confirmation)
    {
      //Programatically trigger the action set upon the route of
      //its parent element.
      //But how...
      submit(null , {method : 'delete'});

    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
