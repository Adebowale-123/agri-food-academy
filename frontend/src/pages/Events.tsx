import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import EventCard from '../components/events/EventCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { Event } from '../types';

export default function Events() {
  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ['events'],
    queryFn: () => api.get('/events').then((r) => r.data),
  });

  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-primary to-primary-light py-16 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Events & Webinars</h1>
          <p className="text-primary-100 text-lg">Stay connected through our events — workshops, webinars, and summits across Nigeria and the UK.</p>
        </div>
      </section>

      <section className="py-16 bg-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {isLoading ? (
            <LoadingSpinner />
          ) : !events || events.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-xl mb-2">No upcoming events</p>
              <p className="text-sm">Check back soon for new events and webinars</p>
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
