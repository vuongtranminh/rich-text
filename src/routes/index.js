import Home from '~/pages/Home'
import RichText from '~/pages/rich-text'

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/rich-text', component: RichText },
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes }