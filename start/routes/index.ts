import Route from '@ioc:Adonis/Core/Route'
import './auth'
import './users'
import './forgotPassword'
import './uploads'
import './posts'
import './comments'
import './reactions'
import './follows'
import './messages'
import './conversations'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('/user-register', async ({ view }) => {
  return view.render('emails/register')
})

Route.get('/user-forgotpassword', async ({ view }) => {
  return view.render('emails/forgotPassword')
})

Route.get('/users', 'Users/Main.show').middleware('auth')
Route.put('/users', 'Users/Main.update').middleware('auth')

Route.get('/profiles', 'Profiles/Main.show').middleware('auth')

Route.on('/test').render('test')
Route.on('/chat').render('chat')

/*Link user2
esse render feito com vue via link puxa os parametros da url

http://127.0.0.1:3333/chat?conversationId=1&userId=18&receiverId=13&token=MTY.4cq73jYqKYQ5K9rwFci3aDkqS0RaNrgiaOd5d-ys9n1jCmnsJ2_ANcVdGVnf

link user 1

http://127.0.0.1:3333/chat?conversationId=1&userId=13&receiverId=18&token=MTA.WRgSr13rtQV_p8J_yG2WbHFmPuTj42kWaaTOOEWgVgPOZrc9pLi5O1IMLsqZ
*/
