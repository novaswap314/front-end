// uno.config.ts
import { defineConfig, presetAttributify, presetUno, presetWebFonts, presetIcons } from 'unocss'

export default defineConfig({
    // ...UnoCSS options
    presets: [
        presetWebFonts({
            provider: 'google',
            fonts: {
                mono: ['Titillium Web:200,300,400,600,700,900', 'Staatliches'],
            },
        }),
        presetUno(),
        presetAttributify(),
        presetIcons(),
    ]
})