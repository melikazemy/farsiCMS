import Products from './components/products/Products';
import Users from './components/users/Users';
import Discounts from './components/discounts/Discounts';
import Comments from './components/comments/Comments';
import Orders from './components/orders/Orders';
 
const routesArray= [
    {path:'/products' , element: <Products/>},
    {path:'/users' , element: <Users/>},
    {path:'/comments' , element: <Comments/>},
    {path:'/orders' , element: <Orders/>},
    {path:'/discounts' , element: <Discounts/>},
]

export default routesArray