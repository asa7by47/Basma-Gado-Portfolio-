import { createBrowserRouter, Navigate } from 'react-router-dom'
import {
  PageTemplate,
  WorkTemplate,
  FullscreenTemplate,
} from '@/components/templates'
import {
  HomePage,
  ReelPage,
  VideosPage,
  ImagesPage,
  InteractivePage,
  AboutPage,
  ContactPage,
  CVPage,
} from '@/components/pages'
import { Text } from '@/components/atoms/Text'
import { Link } from '@/components/atoms/Link'

const NotFound = () => (
  <div className="flex flex-col items-center justify-center py-24 text-center gap-6">
    <Text variant="display-lg" font="display" color="accent">404</Text>
    <Text variant="heading" color="text">Page Not Found</Text>
    <Text variant="body" color="muted">The page you are looking for doesn't exist.</Text>
    <Link to="/" underline="always">Return Home</Link>
  </div>
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PageTemplate />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'resume',
        element: <CVPage />,
      },
      {
        path: 'videos',
        element: <Navigate to="/work/videos" replace />,
      },
      {
        path: 'images',
        element: <Navigate to="/work/images" replace />,
      },
      {
        path: 'work',
        element: <WorkTemplate />,
        children: [
          {
            index: true,
            element: <Navigate to="videos" replace />,
          },
          {
            path: 'videos',
            element: <VideosPage />,
          },
          {
            path: 'images',
            element: <ImagesPage />,
          },
          {
            path: 'interactive',
            element: <InteractivePage />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },

  {
    path: '/reel',
    element: <FullscreenTemplate />,
    children: [
      {
        index: true,
        element: <ReelPage />,
      },
    ],
  },
])
