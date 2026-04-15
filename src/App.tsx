import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from '@/contexts/AppContext';
import AppLayout from '@/components/layout/AppLayout';
import HomePage from '@/pages/HomePage';
import ProfilePage from '@/pages/ProfilePage';
import EventsPage from '@/pages/EventsPage';
import EventDetailPage from '@/pages/EventDetailPage';
import DiscoverPage from '@/pages/DiscoverPage';
import PlaylistListPage from '@/pages/PlaylistListPage';
import PlaylistDetailPage from '@/pages/PlaylistDetailPage';
import RankingsPage from '@/pages/RankingsPage';
import HiddenGemsPage from '@/pages/HiddenGemsPage';
import AIPlaylistPage from '@/pages/AIPlaylistPage';
import CultureSpotsPage from '@/pages/CultureSpotsPage';
import ThreadListPage from '@/pages/ThreadListPage';
import ThreadDetailPage from '@/pages/ThreadDetailPage';
import GalleryPage from '@/pages/GalleryPage';
import GamesPage from '@/pages/GamesPage';
import QuizPage from '@/pages/QuizPage';
import TournamentPage from '@/pages/TournamentPage';
import BadgesPage from '@/pages/BadgesPage';
import TimelinePage from '@/pages/TimelinePage';
import DiscographyNotesPage from '@/pages/DiscographyNotesPage';
import MarketplacePage from '@/pages/MarketplacePage';
import ListingDetailPage from '@/pages/ListingDetailPage';
import CollaboratePage from '@/pages/CollaboratePage';

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/profile/timeline" element={<TimelinePage />} />
            <Route path="/profile/notes" element={<DiscographyNotesPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:id" element={<EventDetailPage />} />
            <Route path="/discover" element={<DiscoverPage />} />
            <Route path="/discover/playlists" element={<PlaylistListPage />} />
            <Route path="/discover/playlists/:id" element={<PlaylistDetailPage />} />
            <Route path="/discover/rankings" element={<RankingsPage />} />
            <Route path="/discover/hidden-gems" element={<HiddenGemsPage />} />
            <Route path="/discover/ai-playlist" element={<AIPlaylistPage />} />
            <Route path="/culture/spots" element={<CultureSpotsPage />} />
            <Route path="/culture/threads" element={<ThreadListPage />} />
            <Route path="/culture/threads/:id" element={<ThreadDetailPage />} />
            <Route path="/culture/gallery" element={<GalleryPage />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/games/quiz" element={<QuizPage />} />
            <Route path="/games/tournament" element={<TournamentPage />} />
            <Route path="/games/badges" element={<BadgesPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/marketplace/:id" element={<ListingDetailPage />} />
            <Route path="/collaborate" element={<CollaboratePage />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}
