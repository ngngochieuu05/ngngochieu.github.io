export type Lang = 'vi' | 'en';

export const githubUrl = 'https://github.com/ngngochieuu05';
export const facebookUrl = 'https://www.facebook.com/ng.ngoc.hieu.37427/';
export const linkedinUrl = 'https://www.linkedin.com/in/ng-ngoc-hieu-406263423/';
export const email = 'ngngochieu125@gmail.com';

// Phone is stored encoded and only decoded on click, so plain-text scrapers cannot read it.
export const phoneMasked = '0932******';
export const phoneDecode = () => atob('cmVtb3ZlZA==');
