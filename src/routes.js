import AddBlog from './components/AddBlog'
import ShowBlog from './components/ShowBlog'
import SingleBlog from './components/SingleBlog'
import EditBlog from './components/EditBlog'

export default [
  {path:"/",component:ShowBlog},
  {path:"/add",component:AddBlog},
  {path:"/blog/:objectId",component:SingleBlog},
  {path:"/edit/:objectId",component:EditBlog}
]
