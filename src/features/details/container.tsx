import type { FC } from 'react';
import { useParams } from 'react-router';

const DetailsPage: FC = () => {
  const { pair } = useParams();

  return `Details Page ${pair}`;
};

export { DetailsPage };
