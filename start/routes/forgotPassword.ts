/* eslint-disable prettier/prettier */
import Route from '@ioc:Adonis/Core/Route'

Route.post('/users/newpass', 'Users/ForgotPassword.store')
Route.get('/users/newpass/:key', 'Users/ForgotPassword.show')
Route.put('/users/newpass', 'Users/ForgotPassword.update')