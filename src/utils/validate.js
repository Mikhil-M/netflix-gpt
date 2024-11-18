export const checkValidData = (email, password, name, isSignInForm) => {
    const isEmailValid = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/.test(email);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    if (!isEmailValid) return 'Email is not valid';
    if (!isPasswordValid) return 'Password is not valid';
    if (!isSignInForm && !name) return 'Name is required'
    return null
}