import { defineConfig } from 'vite'
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";
import react from '@vitejs/plugin-react-swc'

const manifestForPlugin: Partial<VitePWAOptions> = {
	//registerType: "prompt",
	registerType: "autoUpdate",
	includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
	workbox: {
    skipWaiting: true,
    clientsClaim: true,
		sourcemap: true,
  },
	manifest: {
		name: "Refuelr",
		short_name: "Rfuelr",
		description: "An app that tracks mileage and fuel consumption",
		icons: [
			{
				src: "/icon-192x192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/icon-512x512.png",
				sizes: "512x512",
				type: "image/png",
			},
			{
				src: "/icon-180x180.png",
				sizes: "180x180",
				type: "image/png",
				purpose: "apple touch icon",
			},
			{
				src: "/icon-225x225.png",
				sizes: "225x225",
				type: "image/png",
				purpose: "any maskable",
			},
		],
		theme_color: "#171717",
		background_color: "#e8ebf2",
		display: "standalone",
		scope: "/",
		start_url: "/",
		orientation: "portrait",
	},
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
	resolve: {
    alias: {
      '@components': '/src/components',
      '@hooks': '/src/hooks',
      '@utils': '/src/utils',
      '@pages': '/src/pages',
      '@contexts': '/src/contexts',
    }
  }
})
