import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
        fontFamily: {
            'montserrat': ['Montserrat'],
            'lato': ['Lato'],
            'garamond': ['Garamond']
        }
    }
},
  plugins: [],
} satisfies Config;