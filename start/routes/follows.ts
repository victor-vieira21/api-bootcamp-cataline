/* eslint-disable prettier/prettier */
import Route from '@ioc:Adonis/Core/Route'

Route.post('/follow', 'Follows/Follow.store').middleware('auth')
Route.delete('/unfollow', 'Follows/Unfollow.store').middleware('auth')