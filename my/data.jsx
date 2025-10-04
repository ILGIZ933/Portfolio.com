import { HomePage } from "./src/components/HomePage/HomePage";
import { Welcome } from "./src/components/WelcomeWindow/welcome";
import {
    BeginningContent,
    AchievementsContent,
    CreationsContent,
    LogsContent,
    GamesContent
} from './src/components/contentTabs'

export const data = [
    {
        route: '/',
        name: 'WelcomeWindow',
        exact: true,
        element: <Welcome />
    },
    {
        route: '/HomePage',
        name: 'HomePage',
        exact: true,
        element: <HomePage />
    },
    {
        route: './BeginningContent',
        name: 'BeginningContent',
        exact: true,
        element: <BeginningContent />
    },
    {
        route: './Logs',
        name: 'Logs',
        exact: true,
        element: <LogsContent />
    },
    {
        route: './AchievementsContent',
        name: 'AchievementsContent',
        exact: true,
        element: <AchievementsContent />
    },
    {
        route: './CreationsContent',
        name: 'CreationsContent',
        exact: true,
        element: <CreationsContent />
    },
    {
        route: './GamesContent',
        name: 'GamesContent',
        exact: true,
        element: < GamesContent />
    },
]