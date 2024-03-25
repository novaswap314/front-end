import React, { useMemo } from 'react';
import { createGlobalStyle, css } from 'styled-components'
import { transparentize } from 'polished'

const white = '#FFFFFF'
const black = '#000000'

export function colors(darkMode) {
  return {
    // base
    white,
    black,

    height: '56px',
    height2: '700px',

    // text
    text1: '#ffffff',
    text2: 'hsla(0,0%,100%,.8)',
    text3: 'hsla(0,0%,100%,.6)',
    text4: 'hsla(0,0%,100%,.4)',
    text5: 'hsla(0,0%,100%,.2)',

    // border / greys
    gray1: 'hsla(0,0%,100%,.8)',
    gray2: 'hsla(0,0%,100%,.6)',
    gray3: 'hsla(0,0%,100%,.4)',
    gray4: 'hsla(0,0%,100%,.2)',
    gray5: 'hsla(0,0%,100%,.1)',

    // background
    bg02: '#222',

    //primary colors
    colorPrimary: '#a8ff78',

    // border radius
    primaryRadius: 8,
    secondRadius: 10,

    // slide width
    slideHamWidth: '60px',
    slideWidth: '560px',

  }
}

const device = {
  smw: 640,
  mdw: 768,
  lgw: 1024,
  xlw: 1280,
  xxlw: 1536,
}
function media() {
  return {
    sm: (...args) => css`
      @media (max-width: ${device.smw}px) {
        ${css(...args)};
      }
    `,
    md: (...args) => css`
      @media (max-width: ${device.mdw}px) {
        ${css(...args)};
      }
    `,
    lg: (...args) => css`
      @media (max-width: ${device.lgw}px) {
        ${css(...args)};
      }
    `,
    xl: (...args) => css`
      @media (max-width: ${device.xlw}px) {
        ${css(...args)};
      }
    `,
    xxl: (...args) => css`
      @media (max-width: ${device.xxlw}px) {
        ${css(...args)};
      }
    `,
  }
}

export function theme(darkMode = false) {
  return {
    ...colors(darkMode),
    ...media(),
    ...device,
  }
}

export const FixedGlobalStyle = createGlobalStyle`
:root {
  --font-family: 'Titillium Web',Helvetica,Arial,sans-serif;
}
html,body, button {
  font-weight: 400;
  letter-spacing: -0.018em;
  font-family: var(--font-family) !important;
}
html, 
body,
h1, h2, h3, h4, p {
  margin: 0;
  padding: 0;
}
* {
  box-sizing: border-box;
}

button {
  user-select: none;
  line-height: 1;
}

html {
  font-size: 14px;
  font-variant: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  background-color: #000;
}
`

export const ThemedGlobalStyle = createGlobalStyle`
html {
  color: ${({ theme }) => theme.text1};
  background-color: ${({ theme }) => theme.bg1};

  @media (max-width: 765px) {
    font-size: 12px;
  }
}
`