// a wrapper function that will catch errors, so that try catch not needed to be defined in every route
export const errorWrapper = func => (req, res, next, ...args) => func(req, res, next, ...args).catch(next);
