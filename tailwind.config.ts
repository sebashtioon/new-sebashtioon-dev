import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
					glow: 'hsl(var(--accent-glow))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
					hover: 'hsl(var(--card-hover))'
				},
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-accent': 'var(--gradient-accent)',
				'gradient-dark': 'var(--gradient-dark)',
			},
			boxShadow: {
				'glow': 'var(--shadow-glow)',
				'card': 'var(--shadow-card)',
				'accent': 'var(--shadow-accent)',
			},
			transitionTimingFunction: {
				'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
				'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
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
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-in-delay': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'60%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-in': {
					'0%': {
						transform: 'translateX(-30px)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateX(0)',
						opacity: '1'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-5px)'
					}
				},
				'pulse-glow': {
					'0%, 100%': {
						boxShadow: '0 0 15px hsl(var(--primary-glow) / 0.2)'
					},
					'50%': {
						boxShadow: '0 0 25px hsl(var(--primary-glow) / 0.4)'
					}
				},
				'scale-in': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.95)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				'spin-slow': {
					'0%': {
						transform: 'rotate(0deg)'
					},
					'100%': {
						transform: 'rotate(360deg)'
					}
				},
				'bounce-glow': {
					'0%, 100%': {
						transform: 'translateY(0px)',
						boxShadow: '0 0 10px hsl(var(--accent-glow) / 0.3)'
					},
					'50%': {
						transform: 'translateY(-10px)',
						boxShadow: '0 0 25px hsl(var(--accent-glow) / 0.6)'
					}
				},
				'matrix-rain': {
					'0%': {
						transform: 'translateY(-100%)',
						opacity: '0'
					},
					'10%': {
						opacity: '1'
					},
					'90%': {
						opacity: '1'
					},
					'100%': {
						transform: 'translateY(100vh)',
						opacity: '0'
					}
				},
				'cube-float': {
					'0%, 100%': {
						transform: 'translateY(0px) rotateX(0deg)'
					},
					'33%': {
						transform: 'translateY(-15px) rotateX(5deg)'
					},
					'66%': {
						transform: 'translateY(-8px) rotateX(-3deg)'
					}
				},
				'cube-spin-3d': {
					'0%': {
						transform: 'rotateY(0deg) rotateX(0deg)'
					},
					'25%': {
						transform: 'rotateY(90deg) rotateX(15deg)'
					},
					'50%': {
						transform: 'rotateY(180deg) rotateX(0deg)'
					},
					'75%': {
						transform: 'rotateY(270deg) rotateX(-15deg)'
					},
					'100%': {
						transform: 'rotateY(360deg) rotateX(0deg)'
					}
				},
				'physics-bounce': {
					'0%, 20%, 50%, 80%, 100%': {
						transform: 'translateY(0) rotateZ(0deg) scale(1)'
					},
					'40%': {
						transform: 'translateY(-30px) rotateZ(15deg) scale(1.05)'
					},
					'60%': {
						transform: 'translateY(-15px) rotateZ(-8deg) scale(0.98)'
					}
				},
				'audio-reactive': {
					'0%': { height: '20px', opacity: '0.6' },
					'25%': { height: '45px', opacity: '1' },
					'50%': { height: '30px', opacity: '0.8' },
					'75%': { height: '55px', opacity: '1' },
					'100%': { height: '20px', opacity: '0.6' }
				},
				'neon-pulse': {
					'0%, 100%': {
						boxShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor'
					},
					'50%': {
						boxShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor, 0 0 40px currentColor'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
				'fade-in-delay': 'fade-in-delay 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
				'slide-in': 'slide-in 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
				'float': 'float 4s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
				'scale-in': 'scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
				'spin-slow': 'spin-slow 8s linear infinite',
				'bounce-glow': 'bounce-glow 2s ease-in-out infinite',
				'matrix-rain': 'matrix-rain 4s linear infinite',
				'cube-float': 'cube-float 6s ease-in-out infinite',
				'cube-spin-3d': 'cube-spin-3d 12s linear infinite',
				'physics-bounce': 'physics-bounce 3s ease-in-out infinite',
				'audio-reactive': 'audio-reactive 2s ease-in-out infinite',
				'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
				'gravity-bounce': 'gravity-bounce 4s ease-in-out infinite',
				'ground-bounce': 'ground-bounce 4s ease-in-out infinite',
				'bass-shake': 'bass-shake 0.1s ease-in-out infinite',
				'tron-floor-glow': 'tron-floor-glow 3s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
