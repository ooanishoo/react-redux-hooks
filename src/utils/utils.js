export default function login({ email, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "test@gmail.com" && password === "test") {
        resolve();
      } else {
        reject();
      }
    }, 1000);
  });
}
