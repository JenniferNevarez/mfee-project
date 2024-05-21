export const corsOptions = {
  origin: (origin, callback) => {
    if (!process.env.TRUSTED_ORIGINS.includes(origin) || origin.includes("localhost")) {
      callback(new Error("Not Allowed By Cors"))
    }

    callback(null, true)
  },
  OptionsSuccessStatus: 200
}
