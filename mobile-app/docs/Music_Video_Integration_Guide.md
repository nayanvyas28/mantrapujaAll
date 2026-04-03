# Music Video Integration Guide

This document outlines the technical flow and requirements for adding a "Video Toggle" feature to the Music Player.

## 1. System Overview
The feature allows users to switch between listening to audio and watching a video (YouTube) for the same song. This toggle only appears if a video URL is configured by the Admin.

---

## 2. Database Schema Changes (Supabase)

To support this, a new `video_url` column must be added to the `music_songs` table.

**SQL Command to run in Supabase Editor:**
```sql
ALTER TABLE music_songs ADD COLUMN video_url TEXT;
```

---

## 3. Data Flow

### A. Admin Panel (Input)
- When adding or editing a song in the Admin Panel, a new **"Video URL (YouTube)"** text field should be provided.
- This URL will be saved to the `video_url` column in the `music_songs` table.
- **Example URL format:** `https://www.youtube.com/watch?v=dQw4w9WgXcQ`

### B. Mobile App (Output)
1. **Fetching**: The app fetches `video_url` along with other song metadata from Supabase.
2. **Detection**: If `currentSong.video_url` is not null, a **"Toggle View"** button (Audio/Video) appears in the Player screen.
3. **State Management**: 
   - Switching to **Video Mode**: Pauses the `expo-av` audio player and starts the YouTube video player.
   - Switching to **Audio Mode**: Pauses the YouTube video and resumes (or allows playing) the `expo-av` audio.

---

## 4. UI Flow

### Step 1: Song List
No visible change in the song list.

### Step 2: Player Details (Audio Mode - Default)
- Standard view with Album Art, Progress Bar, and Play/Pause controls.
- If `video_url` exists, a **Toggle Button** (Switch or Segmented Control) is visible at the top or near the album art.

### Step 3: Player Details (Video Mode)
- The Album Art is replaced by a **Video Player Container**.
- The Video starts playing automatically.
- Audio from `expo-av` is paused to avoid duplicate sound.

---

## 5. Developer Implementation Details (Frontend)

- **Library**: `react-native-youtube-iframe` is recommended for YouTube playback.
- **Dependencies**: 
  - `npm install react-native-youtube-iframe react-native-webview`
- **Component Changes (`music.tsx`)**:
  - Add `const [isVideoMode, setIsVideoMode] = useState(false);`
  - Update `handlePlaySong` to reset `isVideoMode` to `false`.
  - Conditional rendering in the `Modal` based on `isVideoMode`.

---

## 6. Admin Panel Checklist
- [ ] Add `Video URL` field to the Song Creation form.
- [ ] Add `Video URL` field to the Song Edition form.
- [ ] Ensure the field is optional (can be left blank).
- [ ] Implement YouTube URL validation (optional but recommended).
