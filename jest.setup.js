global.import = undefined;
Object.defineProperty(global, 'import', {
    value: {
        meta: {
            env: {
                BASE_URL: '/'
            }
        }
    },
    writable: true
});