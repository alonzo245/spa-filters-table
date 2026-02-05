import { Brewery } from '../../../types/brewery';
import { getFullAddress, parseCoordinates } from '../utils/breweryUtils';
import { BreweryMap } from '../../BreweryMap/BreweryMap';

interface BreweryDetailsProps {
  brewery: Brewery;
}

export function BreweryDetails({ brewery }: BreweryDetailsProps) {
  const coordinates = parseCoordinates(brewery);
  
  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <dt className="text-xs sm:text-sm font-medium text-gray-400 dark:text-gray-400">
            Name
          </dt>
          <dd className="mt-1 text-sm sm:text-base text-gray-100 dark:text-gray-100 break-words">
            {brewery.name}
          </dd>
        </div>
        <div>
          <dt className="text-xs sm:text-sm font-medium text-gray-400 dark:text-gray-400">
            Type
          </dt>
          <dd className="mt-1 text-sm sm:text-base text-gray-100 dark:text-gray-100 break-words">
            {brewery.brewery_type}
          </dd>
        </div>
        <div>
          <dt className="text-xs sm:text-sm font-medium text-gray-400 dark:text-gray-400">
            City
          </dt>
          <dd className="mt-1 text-sm sm:text-base text-gray-100 dark:text-gray-100 break-words">
            {brewery.city}
          </dd>
        </div>
        <div>
          <dt className="text-xs sm:text-sm font-medium text-gray-400 dark:text-gray-400">
            State
          </dt>
          <dd className="mt-1 text-sm sm:text-base text-gray-100 dark:text-gray-100 break-words">
            {brewery.state}
          </dd>
        </div>
      </div>

      <div>
        <dt className="text-xs sm:text-sm font-medium text-gray-400 dark:text-gray-400">
          Full Address
        </dt>
        <dd className="mt-1 text-sm sm:text-base text-gray-100 dark:text-gray-100 break-words">
          {getFullAddress(brewery)}
        </dd>
      </div>

      <div>
        <dt className="text-xs sm:text-sm font-medium text-gray-400 dark:text-gray-400">
          Phone
        </dt>
        <dd className="mt-1 text-sm sm:text-base text-gray-100 dark:text-gray-100 break-words">
          {brewery.phone || 'N/A'}
        </dd>
      </div>

      <div>
        <dt className="text-xs sm:text-sm font-medium text-gray-400 dark:text-gray-400">
          Website
        </dt>
        <dd className="mt-1 text-sm sm:text-base break-words">
          {brewery.website_url ? (
            <a
              href={brewery.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 dark:text-blue-400 dark:hover:text-blue-300 underline break-all"
            >
              {brewery.website_url}
            </a>
          ) : (
            <span className="text-gray-400 dark:text-gray-400">N/A</span>
          )}
        </dd>
      </div>

      {coordinates && (
        <div className="mt-4 sm:mt-6">
          <dt className="text-xs sm:text-sm font-medium text-gray-400 dark:text-gray-400 mb-2">
            Location
          </dt>
          <dd className="mt-1">
            <BreweryMap
              latitude={coordinates.latitude}
              longitude={coordinates.longitude}
              name={brewery.name}
            />
          </dd>
        </div>
      )}
    </div>
  );
}
