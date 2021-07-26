const validUsername = (_: any, value: string ) => {
    if (!value) return Promise.reject(new Error('Username is requered!'))
    if (value.length < 5) return Promise.reject(new Error('Username too short!'))
    return Promise.resolve();
};



export {
    validUsername
}
