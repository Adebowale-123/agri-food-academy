import { Calendar, MapPin, Video, ExternalLink } from 'lucide-react';
import { Event } from '../../types';
import Badge from '../ui/Badge';

const TYPE_CONFIG = {
  webinar: { label: 'Webinar', variant: 'blue' as const, icon: Video },
  physical: { label: 'In Person', variant: 'green' as const, icon: MapPin },
  hybrid: { label: 'Hybrid', variant: 'orange' as const, icon: MapPin },
};

export default function EventCard({ event }: { event: Event }) {
  const config = TYPE_CONFIG[event.type] || TYPE_CONFIG.physical;
  const date = new Date(event.date);

  return (
    <div className="card p-6 flex gap-5">
      <div className="flex-shrink-0 text-center bg-primary-50 rounded-xl p-4 w-20">
        <div className="text-3xl font-bold text-primary leading-none">{date.getDate()}</div>
        <div className="text-xs font-medium text-primary-light uppercase mt-1">
          {date.toLocaleString('default', { month: 'short' })}
        </div>
        <div className="text-xs text-gray-400">{date.getFullYear()}</div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant={config.variant}>{config.label}</Badge>
        </div>
        <h3 className="font-bold text-gray-900 text-lg leading-snug mb-1">{event.title}</h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-3">{event.description}</p>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          {event.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />{event.location}
            </span>
          )}
          {event.registrationUrl && (
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-primary font-medium hover:underline"
            >
              Register <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
