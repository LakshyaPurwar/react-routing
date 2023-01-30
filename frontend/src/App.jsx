// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import EventDetailsPage from './pages/EventDetailsPage';
import NewEventPage from './pages/NewEventPage';
import EditEventPage from './pages/EditEventPage';
import Layout from './pages/Layout'
import ErrorPage from './pages/ErrorPage';
import EventsLayout from './pages/EventsLayout';
import { LoaderFunction as eventsLoader } from './pages/EventsPage';
import { LoaderFunction as eventDetails } from './pages/EventDetailsPage';
import { FormAction as EventManipulationAction } from './components/EventForm';
import { ActionFunction as eventDeleteAction } from './pages/EventDetailsPage';


const router = createBrowserRouter([
  {
    path: '/', element: <Layout />, errorElement: <ErrorPage />, children: [
      { index: true, path: '/', element: <HomePage /> },

      {
        path: 'events/',
         element: <EventsLayout />,
          children: [

          {
             index: true,
              path: '',
               element: <EventsPage />,
              loader : eventsLoader,
         },
         {
          path:':eventId/' ,
          loader : eventDetails,
          id : 'event-loader-route',
          children:
          [
            { index:true , element: <EventDetailsPage />,action : eventDeleteAction },
            { path: 'edit', element: <EditEventPage /> , action:EventManipulationAction }
          ],
          
        },
          

          { path: 'new', element: <NewEventPage />  , action:EventManipulationAction},
          
        ]
      },

    ]
  },

]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;