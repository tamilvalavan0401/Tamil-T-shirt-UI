// tailwind.config.ts
import type { Config } from "tailwindcss";
const themeColors = require('./theme/dynamiccolorpalette.json');

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  
  theme: {
    extend: {
      colors: {
        primary: themeColors.ColorsPalet.colorPrimary,
        primary_hover: themeColors.ColorsPalet.colorPrimaryHover,
        dash_menu_light: themeColors.ColorsPalet.colorDashMenuLight,

        secondary: themeColors.ColorsPalet.colorSecondary,
        secondary_hover: themeColors.ColorsPalet.colorSecondaryHover,

        rating_text: themeColors.ColorsPalet.colorRating,
        rating_light: themeColors.ColorsPalet.colorRatingLight,

        error: themeColors.ColorsPalet.colorError,
        error_hover: themeColors.ColorsPalet.colorErrorHover,
        success: themeColors.ColorsPalet.colorSuccess,

        category_name: themeColors.ColorsPalet.colorcategory_name,
        pr_eng_name: themeColors.ColorsPalet.colorPrEngName,
        pr_cart_buy3_bg: themeColors.ColorsPalet.colorPrBuy3Bg,
        pr_combo_text: themeColors.ColorsPalet.colorPrComboText,
        pr_combo_bg: themeColors.ColorsPalet.colorPrComboBg,
        pr_section_bg: themeColors.ColorsPalet.colorPrSectionBg,

        gray_text: themeColors.ColorsPalet.colorGrayText,
        hr_line: themeColors.ColorsPalet.colorHr,

        cod_text: themeColors.ColorsPalet.colorCodText,
        cod_bg: themeColors.ColorsPalet.colorCodBg,

        footer_bg: themeColors.ColorsPalet.colorFooterBg,
        footer_btn: themeColors.ColorsPalet.colorFooterBtn,
        footer_light: themeColors.ColorsPalet.colorFooterLight,
        footer_btn_hover: themeColors.ColorsPalet.colorFooterBtnHover,

        marquee_bg: themeColors.ColorsPalet.colorMarqueeBg,
        marquee_border: themeColors.ColorsPalet.colorMarqueeBorder,
        marquee_bg_light: themeColors.ColorsPalet.colorMarqueeBgLight,

        offer_text: themeColors.ColorsPalet.colorOfferText,
        delivery_text: themeColors.ColorsPalet.colorFreeDeliveryText,
        delivery_bg: themeColors.ColorsPalet.colorFreeDeliveryBg,

        coupon_bg: themeColors.ColorsPalet.colorCoupon,
        coupon_text: themeColors.ColorsPalet.colorCouponText,

        border_color: themeColors.ColorsPalet.colorBorder,
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        'dot-wave': {
          '0%, 60%, 100%': { transform: 'translateY(0)' },
          '30%': { transform: 'translateY(-6px)' },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'dot-wave': 'dot-wave 1.2s ease-in-out infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
