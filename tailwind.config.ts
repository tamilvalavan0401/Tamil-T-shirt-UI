import type { Config } from "tailwindcss";

// all in fixtures is set to tailwind v3 as interims solutions

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
  	extend: {

		colors: {
				primary: 'var(--color-primary)',
				primary_hover:"var(--color-primary-hover)",
				dash_menu_light:"var(--color-dash-menu-light)",
				border_bg:"var(--color-border)",
				rating_text:"var(--color-rating)",
				rating_light:"var(--color-rating-light)",
				error:"var(--color-error)",
				blog_primary:"var(--color-blog-primary)",
				error_hover:"var(--color-error-hover)",
				delivery_text:"var(--color-free-delivery-text)",
				delivery_bg:"var(--color-free-delivery-bg)",
				gray_text:"var(--color-gray-text)",
				hr_line:"var(--color-hr)",
				cod_text:"var(--color-cod-text)",
				cod_bg:"var(--color-cod-bg)",
				offer_text:"var(--color-offer-text)",
				pr_name:"var(--color-pr-name)",
				pr_eng_name:"var(--color-pr-eng-name)",
				pr_cart_buy3_bg:"var(--color-pr-buy3-bg)",
				pr_combo_text:"var(--color-pr-combo-text)",
				pr_combo_bg:"var(--color-pr-combo-bg)",
				pr_section_bg:"var(--color-pr-section-bg)",
				footer_bg:"var(--color-footer-bg)",
				footer_btn:"var(--color-footer-btn)",
				footer_light:"var(--color-footer-light)",
				footer_btn_hover:"var(--color-footer-btn_hover)",
				marquee_bg:"var(--color-marquee-bg)",
				marquee_border:"var(--color-marquee-border)",
				marquee_bg_light:"var(--color-marquee-bg-light)",
				coupon_bg:"var(--color-coupon)",
				coupon_text:"var( --color-coupon-text)",
				
			},

  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
