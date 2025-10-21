# Starship Dashboard Feature

## Overview
The Starship Dashboard provides real-time information about SpaceX's Starship program, including vehicle status, updates, live streams, road closures, notices, and upcoming launches.

## API Endpoint
- **Base URL**: `https://ll.thespacedevs.com/2.3.0/dashboard/starship/`
- **Documentation**: [The Space Devs API Docs](https://ll.thespacedevs.com/docs)

## Route
- **URL**: `/dashboard/starship`
- **Page Location**: `src/app/dashboard/starship/page.tsx`

## Features

### 1. Recent Updates
- Displays the latest updates about Starship activities
- Shows author information with profile images
- Includes timestamps and links to more information

### 2. Live Streams
- Grid of active live streams related to Starship
- Clickable cards that open streams in new tabs
- Shows stream thumbnails and descriptions

### 3. Road Closures
- Lists scheduled road closures for SpaceX operations
- Displays closure windows (start/end times)
- Shows closure status

### 4. Notices
- Official notices and announcements
- Links to external sources for detailed information
- Organized by notice type

### 5. Super Heavy Boosters
- Information about Super Heavy booster vehicles
- Vehicle images, serial numbers, and status
- Flight statistics (total flights, landing success rate)
- Flight proven badges

### 6. Starship Vehicles
- Starship spacecraft (orbiters) information
- Current status (in space, on ground, etc.)
- Time in space and docked duration
- Flight count and mission statistics

### 7. Upcoming Launches
- Grid of upcoming Starship launches
- Launch images and mission names
- Launch dates and status
- Links to detailed launch pages

## Data Revalidation
- Dashboard data is revalidated every **5 minutes** (300 seconds)
- Ensures users see fresh information without overwhelming the API

## Styling
- Consistent with the application's white theme
- Responsive design for all screen sizes
- Hover effects and smooth transitions
- Card-based layout for easy scanning

## Multi-language Support
- Navigation label supports English and Portuguese
- English: "Dashboard"
- Portuguese: "Painel"

## SEO Optimization
- Included in sitemap.xml with high priority (0.85)
- Proper metadata for search engines
- Hourly change frequency for SEO crawlers

## Components Structure

```
src/app/dashboard/starship/
├── page.tsx           # Main dashboard page
├── page.module.css    # Dashboard styles
└── loading.tsx        # Loading state component

src/interfaces/
└── dashboard.ts       # TypeScript interfaces for dashboard data
```

## Usage
Users can access the dashboard by:
1. Clicking "Dashboard" in the main navigation
2. Navigating directly to `/dashboard/starship`

## Future Enhancements
- Add filtering options (active vehicles only, etc.)
- Historical data visualization
- Notification system for new updates
- Real-time WebSocket updates
- Additional dashboard views (Dragon, Crew, etc.)

