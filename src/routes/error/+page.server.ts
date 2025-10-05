import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const type = url.searchParams.get('type');

  if (type) {
    error(type, 'Error');
  }

  error(404, 'Not Found');
};