import type { PageServerLoad } from './$types';
import userList from './users';

function shuffle<T>(list: T[]): T[] {
    const arr = [...list];
    for (let i = arr.length - 1; i > 0; i--) {
        const random = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[random]] = [arr[random], arr[i]];
    }
    return arr;
}

export const load: PageServerLoad = async () => {
    return {
        ubContributors: shuffle(userList.ubContributors),
        contributors: shuffle(userList.contributors),
        addonDevelopers: shuffle(userList.addonDevelopers),
        extensionDevelopers: shuffle(userList.extensionDevelopers)
    };
};
