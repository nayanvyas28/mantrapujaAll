# Admin Panel: Music Management Blueprint

This document outlines the architecture, data flow, and UI logic required to build a fully dynamic Music Management system in your Admin Panel.

## 1. Database Schema (Supabase)

We will use the existing tables but ensure they are optimized for the Admin CRUD (Create, Read, Update, Delete) operations.

### Table: `music_gods`
Used to manage the deities appearing in the top scroll bar.
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `name` | Text | Name of the God (e.g., "Hanuman") |
| `image_url`| Text | Link to the deity's circular profile image in storage. |

### Table: `music_songs`
Used to manage the actual tracks.
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `title` | Text | Name of the song/mantra. |
| `artist` | Text | Singer or source. |
| `category`| Text | Grouping (Aarti, Chalisa, Bhajan, Mantra, etc.). |
| `god_id` | UUID | Foreign Key linking to `music_gods.id`. |
| `audio_url`| Text | Public URL of the .mp3/.mp4 file from storage. |
| `image_url`| Text | Public URL of the song cover image from storage. |
| `lyrics` | Text | Full text for the lyrics modal. |

---

## 2. File Storage Structure (Supabase Bucket: `music_assets`)

To keep assets organized when uploading from the Admin Panel, use this folder structure:
- `music_assets/god_images/` -> Circular profiles for the top bar.
- `music_assets/song_covers/` -> Square thumbnails for individual songs.
- `music_assets/audio_files/` -> Actual audio data.

---

## 3. UI Flow & Functionality

### View A: Deity Management
1. **List View**: Display all current Gods with their images.
2. **Add New God Modal**: 
   - Input: **Name** (Text).
   - Input: **Image Upload** (Triggers upload to `god_images/` folder).
   - Action: `INSERT INTO music_gods`.

### View B: Music Content Manager (The Main Dashboard)
This view allows you to add specific songs under a God.

**Flow 1: Adding a Song to an EXISTING God**
1. **Search/Select God**: A dropdown menu showing all names from `music_gods`.
2. **Select Category**: A dropdown showing (Aarti, Chalisa, Bhajan, Mantra, Other).
3. **Upload Assets**:
   - Select Image (Square Cover) -> Upload to `song_covers/`.
   - Select Audio File -> Upload to `audio_files/`.
4. **Metadata**: Enter Title, Artist, and Lyrics.
5. **Save**: `INSERT INTO music_songs`.

**Flow 2: Dynamic Categorization**
- When a user selects "Hanuman" in the Admin Panel, the panel should show a summary of how many Chalisa, Bhajans, and Mantras are currently assigned to him.
- This ensures the "God Click" logic in the mobile app works perfectly because every song has a fixed `god_id`.

---

## 4. Integration Logic (Data Flow)

1. **Upload Phase**: The Admin Panel uses the Supabase JavaScript Client to upload files.
   ```javascript
   const { data, error } = await supabase.storage
     .from('music_assets')
     .upload(`audio_files/${fileName}`, file)
   ```
2. **Public Link Generation**: After upload, get the public URL.
   ```javascript
   const { data } = supabase.storage.from('music_assets').getPublicUrl(path)
   ```
3. **Database Phase**: Save the metadata + URLs into the table.
   ```javascript
   await supabase.from('music_songs').insert({
     title: "Hanuman Chalisa",
     god_id: selectedGodId,
     audio_url: publicUrl,
     ...
   })
   ```
4. **Instant Sync**: Because the Mobile App has `.on('postgres_changes', ...)` enabled, the new song will appear on the user's phone **the exact millisecond** you click "Save" in the Admin Panel.

---

## 5. Summary of UI Screens to Build
1. **`GodListScreen`**: Simple grid of deities.
2. **`SongListScreen`**: Table of all songs with a filter by God.
3. **`AddSongForm`**: A multi-step form (Info -> Media -> Confirm).
