import { createGlobalStyle } from "styled-components";
const GlobalStyles = createGlobalStyle`
:root {
  &, &.light-mode {
  /* Warm stone */
  --color-grey-0: #fffdf9;
  --color-grey-50: #f7f5ef;
  --color-grey-100: #eeece4;
  --color-grey-200: #e0ddd2;
  --color-grey-300: #c8c3b6;
  --color-grey-400: #a19b8d;
  --color-grey-500: #777166;
  --color-grey-600: #5c574d;
  --color-grey-700: #39372f;
  --color-grey-800: #282820;
  --color-grey-900: #1c211c;

  --color-blue-100: #dcebe8;
  --color-blue-700: #326459;
  --color-green-100: #e3ecdf;
  --color-green-700: #46673d;
  --color-yellow-100: #f4ebd3;
  --color-yellow-700: #866829;
  --color-silver-100: #e8e6df;
  --color-silver-700: #514e45;
  --color-indigo-100: #e9e4ef;
  --color-indigo-700: #665477;

  --color-red-100: #fce7e3;
  --color-red-700: #a44739;
  --color-red-800: #82372d;

  --backdrop-color: rgba(32, 42, 35, 0.35);

  --shadow-sm: 0 1px 2px rgba(48, 43, 32, 0.05);
  --shadow-md: 0px 0.6rem 2.4rem rgba(48, 43, 32, 0.07);
  --shadow-lg: 0 2.4rem 3.2rem rgba(38, 42, 34, 0.14);
  

  --image-grayscale: 0;
  --image-opacity: 100%;
  }
  
  &.dark-mode {
    --color-grey-0: #252c27;
    --color-grey-50: #1c221e;
    --color-grey-100: #272f29;
    --color-grey-200: #3a453d;
    --color-grey-300: #536057;
    --color-grey-400: #78847a;
    --color-grey-500: #a2aca3;
    --color-grey-600: #c4cbc5;
    --color-grey-700: #dce1dc;
    --color-grey-800: #edf0ed;
    --color-grey-900: #f7f8f6;

    --color-blue-100: #294744;
    --color-blue-700: #b5ddd4;
    --color-green-100: #354536;
    --color-green-700: #c6ddba;
    --color-yellow-100: #4a402a;
    --color-yellow-700: #ebd89c;
    --color-silver-100: #3a403c;
    --color-silver-700: #d4d9d3;
    --color-indigo-100: #3c384a;
    --color-indigo-700: #d4c9e9;

    --color-red-100: #502f2a;
    --color-red-700: #ffd0c5;
    --color-red-800: #eea99b;

    --backdrop-color: rgba(0, 0, 0, 0.48);

    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.35);
    --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.28);
    --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

--image-grayscale: 10%;
--image-opacity: 90%;
  }
  
  /* Evergreen */
  --color-brand-50: #edf4ef;
  --color-brand-100: #d8e7dc;
  --color-brand-200: #b8d1c1;
  --color-brand-500: #47725c;
  --color-brand-600: #315c4c;
  --color-brand-700: #264a3d;
  --color-brand-800: #1d3a30;
  --color-brand-900: #152c24;
  
  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;


}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Creating animations for dark mode */
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Poppins", sans-serif;
  color: var(--color-grey-700);
  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
}

/* Parent selector, finally 😃 */
button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;

  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}

`;

export default GlobalStyles;


















































/*
FOR DARK MODE

--color-grey-0: #18212f;
--color-grey-50: #111827;
--color-grey-100: #1f2937;
--color-grey-200: #374151;
--color-grey-300: #4b5563;
--color-grey-400: #6b7280;
--color-grey-500: #9ca3af;
--color-grey-600: #d1d5db;
--color-grey-700: #e5e7eb;
--color-grey-800: #f3f4f6;
--color-grey-900: #f9fafb;

--color-blue-100: #075985;
--color-blue-700: #e0f2fe;
--color-green-100: #166534;
--color-green-700: #dcfce7;
--color-yellow-100: #854d0e;
--color-yellow-700: #fef9c3;
--color-silver-100: #374151;
--color-silver-700: #f3f4f6;
--color-indigo-100: #3730a3;
--color-indigo-700: #e0e7ff;

--color-red-100: #fee2e2;
--color-red-700: #b91c1c;
--color-red-800: #991b1b;

--backdrop-color: rgba(0, 0, 0, 0.3);

--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
--shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
--shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

--image-grayscale: 10%;
--image-opacity: 90%;
*/
