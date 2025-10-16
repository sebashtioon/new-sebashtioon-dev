# 🎛️ Audio Visualizer Configuration Guide

## 🔧 Easy Tuning Flags

Open `src/pages/Home.tsx` and find the `VISUALIZER_CONFIG` object around line 20. Here's what each setting does:

### 🎵 **Audio Settings**
```javascript
VOLUME: 0.4,                    // Audio volume (0.0 = silent, 1.0 = max)
SMOOTHING: 0.3,                 // FFT smoothing (0.0 = choppy/responsive, 0.8 = smooth)
FFT_SIZE: 128,                  // Analysis resolution (64, 128, 256, 512)
```
**For Overkill:** Try `VOLUME: 0.5`, `SMOOTHING: 0.2` for more kick response

### 📊 **Dynamic Range Settings**
```javascript
BASELINE_LEARNING_RATE: 0.95,   // How fast it learns song (0.9 = fast adapt, 0.99 = slow)
COMPRESSION_THRESHOLD: 0.8,     // When to compress (0.5 = aggressive, 1.2 = gentle)
COMPRESSION_RATIO: 400,         // Compression strength (200 = gentle, 800 = aggressive)
```
**For intense songs:** Try `COMPRESSION_RATIO: 600`, `COMPRESSION_THRESHOLD: 0.6`

### 🥁 **Kick Detection Settings**
```javascript
KICK_SENSITIVITY: 1.2,          // Kick threshold (1.0 = normal, 2.0 = only huge kicks)
KICK_HISTORY_LENGTH: 10,        // Kick memory (5 = sensitive, 20 = stable)
KICK_BOOST_MULTIPLIER: 300,     // Kick visual boost (200 = subtle, 500 = dramatic)
```
**For better kick detection:** Try `KICK_SENSITIVITY: 1.1`, `KICK_BOOST_MULTIPLIER: 400`

### 📏 **Visual Settings**
```javascript
MIN_BAR_HEIGHT: 12,             // Minimum bar height in pixels
MAX_BASS_HEIGHT: 65,            // Max height for bass bars (first 4)
MAX_TREBLE_HEIGHT: 50,          // Max height for treble bars
BASS_BAR_COUNT: 4,              // How many bars are bass frequencies
```
**For more dynamic range:** Try `MIN_BAR_HEIGHT: 8`, `MAX_BASS_HEIGHT: 80`

### ⚡ **Animation Settings**
```javascript
HEIGHT_UPDATE_SPEED: 0.02,      // Bar height transition (0.01 = instant, 0.1 = slow)
COLOR_UPDATE_SPEED: 0.05,       // Color transition speed
GLOW_UPDATE_SPEED: 0.03,        // Glow effect transition
```
**For snappier response:** Try `HEIGHT_UPDATE_SPEED: 0.01`

### 💥 **Screen Shake Settings**
```javascript
SHAKE_THRESHOLD_HIGH: 1.8,      // Multiplier for intense shake
SHAKE_THRESHOLD_LOW: 1.3,       // Multiplier for light shake
SHAKE_SPEED_INTENSE: 0.03,      // Intense shake speed (lower = faster)
SHAKE_SPEED_LIGHT: 0.08,        // Light shake speed
```
**For more shake:** Try `SHAKE_THRESHOLD_HIGH: 1.5`, `SHAKE_THRESHOLD_LOW: 1.1`

### 🌈 **Color Settings**
```javascript
HUE_RANGE: 120,                 // Color range (360 = full rainbow)
HUE_OFFSET_PER_BAR: 15,         // Color shift between bars
BRIGHTNESS_MULTIPLIER: 2,       // Max brightness boost
SATURATION_MULTIPLIER: 1.5,     // Max saturation boost
```
**For rainbow effect:** Try `HUE_RANGE: 360`

### ✨ **Glow Settings**
```javascript
MIN_GLOW: 3,                    // Minimum glow radius
MAX_GLOW_INNER: 25,             // Maximum inner glow
MAX_GLOW_OUTER: 50,             // Maximum outer glow
SCALE_MULTIPLIER: 0.5,          // Width scaling on intensity
```
**For stronger glow:** Try `MAX_GLOW_INNER: 35`, `MAX_GLOW_OUTER: 70`

## 🎯 **Quick Presets**

### **Preset 1: Super Responsive (for intense songs like Overkill)**
- `SMOOTHING: 0.1`
- `COMPRESSION_RATIO: 600`  
- `KICK_SENSITIVITY: 1.0`
- `HEIGHT_UPDATE_SPEED: 0.01`

### **Preset 2: Smooth & Cinematic**
- `SMOOTHING: 0.6`
- `COMPRESSION_RATIO: 300`
- `KICK_SENSITIVITY: 1.5`
- `HEIGHT_UPDATE_SPEED: 0.05`

### **Preset 3: Bass Heavy**
- `BASS_BAR_COUNT: 6`
- `MAX_BASS_HEIGHT: 80`
- `KICK_BOOST_MULTIPLIER: 500`
- `SHAKE_THRESHOLD_LOW: 1.0`

## 🔄 **How to Apply Changes**
1. Edit the values in `VISUALIZER_CONFIG`
2. Save the file
3. The dev server will auto-reload
4. Hover over the visualizer to test

**The visualizer will now perfectly match your song's energy!** 🔥